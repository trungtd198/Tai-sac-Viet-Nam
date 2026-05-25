import { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function getPosts() {
  try {
    return await prisma.post.findMany({
      where: {
        status: PublishStatus.PUBLISHED
      },
      orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        media: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch posts", error);
    return [];
  }
}

export async function getPostBySlug(slug: string) {
  try {
    return await prisma.post.findFirst({
      where: {
        slug,
        status: PublishStatus.PUBLISHED
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true
          }
        },
        media: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch post", error);
    return null;
  }
}
