import { PublishStatus } from "@prisma/client";
import { unstable_noStore as noStore } from "next/cache";
import { db } from "@/lib/db";
import { parseBlocks } from "@/lib/blocks";
import type { ContentBlock } from "@/lib/blocks";
import { programBrand } from "@/lib/program-copy";
import { sitePageSeeds } from "../scripts/seed-content";

const fallbackNavigation = [
  { id: "home", label: "Trang chủ", href: "/", order: 0, isActive: true },
  { id: "register", label: "Đăng ký dự thi", href: "/dang-ky-du-thi", order: 1, isActive: true },
  { id: "schedule", label: "Lịch trình", href: "/lich-trinh", order: 2, isActive: true },
  { id: "program", label: programBrand.name, href: "/tai-sac-viet-nam-2026", order: 3, isActive: true },
  { id: "contestants", label: "Ứng viên", href: "/ung-vien", order: 4, isActive: true },
  { id: "news", label: "Tin tức", href: "/tin-tuc", order: 5, isActive: true },
  { id: "tickets", label: "Đặt vé", href: "/dat-ve", order: 6, isActive: true },
  { id: "partners", label: "Đối tác", href: "/doi-tac", order: 7, isActive: true }
];

function getFallbackPage(slug: string) {
  const page = sitePageSeeds.find((item) => item.slug === slug);

  if (!page) return null;

  return {
    id: `fallback-${page.slug}`,
    title: page.title,
    slug: page.slug,
    seoTitle: page.seoTitle,
    seoDescription: page.seoDescription,
    blocks: page.blocks as ContentBlock[]
  };
}

function logCmsError(scope: string, error: unknown) {
  console.error(`[cms] ${scope} failed`, error);
}

export async function getBrand() {
  noStore();
  try {
    const setting = await db.siteSetting.findUnique({
      where: { key: "brand" }
    });

    const value = setting?.value;
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      "name" in value &&
      typeof value.name === "string"
    ) {
      return {
        name: value.name,
        tagline: "tagline" in value && typeof value.tagline === "string" ? value.tagline : undefined,
        logoUrl: "logoUrl" in value && typeof value.logoUrl === "string" ? value.logoUrl : undefined
      };
    }
  } catch (error) {
    logCmsError("getBrand", error);
  }

  return { name: programBrand.name, tagline: programBrand.tagline, logoUrl: undefined };
}

export async function getNavigation() {
  noStore();
  try {
    return await db.navigationItem.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" }
    });
  } catch (error) {
    logCmsError("getNavigation", error);
    return fallbackNavigation;
  }
}

export async function getPublishedPage(slug: string) {
  noStore();
  try {
    const page = await db.page.findFirst({
      where: { slug, status: PublishStatus.PUBLISHED }
    });

    if (!page) return getFallbackPage(slug);

    return {
      ...page,
      blocks: parseBlocks(page.blocks)
    };
  } catch (error) {
    logCmsError("getPublishedPage", error);
    return getFallbackPage(slug);
  }
}

export async function getPublishedPosts(limit?: number) {
  noStore();
  try {
    return await db.post.findMany({
      where: { status: PublishStatus.PUBLISHED },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      take: limit
    });
  } catch (error) {
    logCmsError("getPublishedPosts", error);
    return [];
  }
}

export async function getPublishedPost(slug: string) {
  noStore();
  try {
    const post = await db.post.findFirst({
      where: { slug, status: PublishStatus.PUBLISHED }
    });

    if (!post) return null;

    return {
      ...post,
      blocks: parseBlocks(post.blocks)
    };
  } catch (error) {
    logCmsError("getPublishedPost", error);
    return null;
  }
}
