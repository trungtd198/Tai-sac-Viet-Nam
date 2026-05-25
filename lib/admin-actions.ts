"use server";

import { MediaType, PublishStatus, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { clearAdminSession, requireAdmin, setAdminSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { verifyPassword } from "@/lib/password";
import { hasUploadFile, uploadImage } from "@/lib/supabase-storage";
import { toSlug } from "@/lib/utils";

const statusSchema = z.nativeEnum(PublishStatus);

function readString(formData: FormData, key: string) {
  return String(formData.get(key) || "").trim();
}

function readJson(formData: FormData, key: string) {
  const raw = readString(formData, key);
  if (!raw) return [];
  return JSON.parse(raw);
}

function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function sanitizeEditorHtml(value: string) {
  return value
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
    .replace(/\son\w+="[^"]*"/gi, "")
    .replace(/\son\w+='[^']*'/gi, "");
}

export async function loginAction(formData: FormData) {
  const email = readString(formData, "email").toLowerCase();
  const password = readString(formData, "password");

  const admin = await db.user
    .findFirst({
      where: {
        email,
        role: UserRole.ADMIN
      },
      select: {
        id: true,
        passwordHash: true
      }
    })
    .catch((error) => {
      console.error("Failed to login admin", error);
      return null;
    });

  if (!admin || !verifyPassword(password, admin.passwordHash)) {
    redirect("/admin/login?error=1");
  }

  setAdminSession(admin.id);
  redirect("/admin");
}

export async function logoutAction() {
  clearAdminSession();
  redirect("/admin/login");
}

export async function savePageAction(formData: FormData) {
  await requireAdmin();

  const id = readString(formData, "id");
  const title = readString(formData, "title");
  const slug = toSlug(readString(formData, "slug") || title);
  const status = statusSchema.parse(readString(formData, "status"));
  const blocks = readJson(formData, "blocks");

  const data = {
    title,
    slug,
    seoTitle: readString(formData, "seoTitle") || null,
    seoDescription: readString(formData, "seoDescription") || null,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null,
    blocks
  };

  if (id) {
    await db.page.update({ where: { id }, data });
  } else {
    await db.page.create({ data });
  }

  revalidatePath("/");
  revalidatePath(`/${slug}`);
  redirect("/admin/pages");
}

export async function deletePageAction(formData: FormData) {
  await requireAdmin();
  await db.page.delete({ where: { id: readString(formData, "id") } });
  revalidatePath("/");
  redirect("/admin/pages");
}

export async function savePostAction(formData: FormData) {
  await requireAdmin();

  const id = readString(formData, "id");
  const title = readString(formData, "title");
  const slug = toSlug(readString(formData, "slug") || title);
  const contentHtml = sanitizeEditorHtml(readString(formData, "content"));
  const thumbnailFile = formData.get("thumbnailFile");
  const uploadedThumbnail = hasUploadFile(thumbnailFile)
    ? await uploadImage(thumbnailFile, "posts")
    : null;
  const thumbnail = uploadedThumbnail || readString(formData, "thumbnail") || null;
  const isPublished = formData.get("published") === "on";
  const status = isPublished ? PublishStatus.PUBLISHED : PublishStatus.DRAFT;
  const excerpt = stripHtml(contentHtml).slice(0, 180) || title;

  const data = {
    title,
    slug,
    excerpt,
    thumbnail,
    coverImage: thumbnail,
    content: {
      html: contentHtml
    },
    seoTitle: title,
    seoDescription: excerpt,
    status,
    publishedAt: status === "PUBLISHED" ? new Date() : null,
    blocks: [
      {
        id: "post-content",
        type: "richText",
        title,
        body: excerpt
      }
    ]
  };

  if (id) {
    await db.post.update({ where: { id }, data });
  } else {
    await db.post.create({ data });
  }

  revalidatePath("/news");
  revalidatePath(`/news/${slug}`);
  redirect("/admin/posts");
}

export async function deletePostAction(formData: FormData) {
  await requireAdmin();
  await db.post.delete({ where: { id: readString(formData, "id") } });
  revalidatePath("/news");
  redirect("/admin/posts");
}

export async function saveNavigationAction(formData: FormData) {
  await requireAdmin();
  const items = z
    .array(
      z.object({
        label: z.string().min(1),
        href: z.string().min(1),
        isActive: z.boolean().default(true)
      })
    )
    .parse(readJson(formData, "items"));

  await db.navigationItem.deleteMany({});
  await db.navigationItem.createMany({
    data: items.map((item, order) => ({
      ...item,
      order
    }))
  });

  revalidatePath("/");
  redirect("/admin/navigation");
}

export async function saveBrandAction(formData: FormData) {
  await requireAdmin();

  await db.siteSetting.upsert({
    where: { key: "brand" },
    update: {
      value: {
        name: readString(formData, "name"),
        tagline: readString(formData, "tagline")
      }
    },
    create: {
      key: "brand",
      value: {
        name: readString(formData, "name"),
        tagline: readString(formData, "tagline")
      }
    }
  });

  revalidatePath("/");
  redirect("/admin/navigation");
}

export async function savePageBlocksAction(formData: FormData) {
  await requireAdmin();

  const ids = z.array(z.string()).parse(readJson(formData, "ids"));
  const existingBlocks = await db.pageBlock.findMany({
    where: {
      id: {
        in: ids
      }
    },
    select: {
      id: true,
      type: true
    }
  });
  const blockTypeById = new Map(existingBlocks.map((block) => [block.id, block.type]));

  await Promise.all(
    ids.map(async (id) => {
      const contentRaw = readString(formData, `content_${id}`);
      const content = contentRaw ? JSON.parse(contentRaw) : {};
      const imageFile = formData.get(`image_${id}`);
      const uploadedUrl = hasUploadFile(imageFile) ? await uploadImage(imageFile, "blocks") : null;
      const blockType = blockTypeById.get(id);
      let mediaId: string | undefined;

      if (uploadedUrl) {
        const media = await db.media.create({
          data: {
            title: readString(formData, `title_${id}`) || `Ảnh ${blockType || "khối"}`,
            url: uploadedUrl,
            type: MediaType.IMAGE,
            altText: readString(formData, `title_${id}`) || null
          }
        });

        mediaId = media.id;

        if (blockType === "GALLERY") {
          const images = Array.isArray(content.images) ? content.images : [];
          content.images = [...images, uploadedUrl];
        } else {
          content.image = uploadedUrl;
        }
      }

      return db.pageBlock.update({
        where: { id },
        data: {
          title: readString(formData, `title_${id}`) || null,
          order: Number(readString(formData, `order_${id}`) || 0),
          isActive: formData.get(`isActive_${id}`) === "on",
          content,
          ...(mediaId ? { mediaId } : {})
        }
      });
    })
  );

  revalidatePath("/");
  redirect("/admin/blocks");
}

export async function registerAction(formData: FormData) {
  await db.application.create({
    data: {
      fullName: readString(formData, "fullName"),
      email: readString(formData, "email"),
      phone: readString(formData, "phone"),
      city: readString(formData, "city"),
      portfolio: readString(formData, "portfolio") || null,
      message: readString(formData, "message") || null,
      consent: formData.get("consent") === "on"
    }
  });

  redirect("/register?submitted=1");
}
