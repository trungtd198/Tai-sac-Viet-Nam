import type { MetadataRoute } from "next";
import { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl("/"),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: siteUrl("/news"),
      changeFrequency: "daily",
      priority: 0.8
    },
    {
      url: siteUrl("/schedule"),
      changeFrequency: "weekly",
      priority: 0.7
    },
    {
      url: siteUrl("/register"),
      changeFrequency: "monthly",
      priority: 0.7
    }
  ];

  try {
    const [posts, pages] = await Promise.all([
      prisma.post.findMany({
        where: { status: PublishStatus.PUBLISHED },
        select: {
          slug: true,
          updatedAt: true
        }
      }),
      prisma.page.findMany({
        where: { status: PublishStatus.PUBLISHED },
        select: {
          slug: true,
          updatedAt: true
        }
      })
    ]);

    const postRoutes = posts.map((post) => ({
      url: siteUrl(`/news/${post.slug}`),
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6
    }));

    const pageRoutes = pages
      .filter((page) => !["home", "register", "schedule"].includes(page.slug))
      .map((page) => ({
        url: siteUrl(`/${page.slug}`),
        lastModified: page.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6
      }));

    return [...staticRoutes, ...postRoutes, ...pageRoutes];
  } catch (error) {
    console.error("Failed to build sitemap from database", error);
    return staticRoutes;
  }
}
