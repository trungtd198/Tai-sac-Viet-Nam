import type { MetadataRoute } from "next";
import { PublishStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { siteUrl } from "@/lib/seo";

export const dynamic = "force-dynamic";

const canonicalStaticRoutes = [
  { path: "/", changeFrequency: "weekly" as const, priority: 1 },
  { path: "/dang-ky-du-thi", changeFrequency: "weekly" as const, priority: 0.9 },
  { path: "/lich-trinh", changeFrequency: "weekly" as const, priority: 0.8 },
  { path: "/lich-thi", changeFrequency: "weekly" as const, priority: 0.75 },
  { path: "/tin-tuc", changeFrequency: "daily" as const, priority: 0.8 },
  { path: "/tai-sac-viet-nam-2026", changeFrequency: "monthly" as const, priority: 0.8 },
  { path: "/ung-vien", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/doi-tac", changeFrequency: "monthly" as const, priority: 0.6 },
  { path: "/lien-he", changeFrequency: "monthly" as const, priority: 0.5 }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = canonicalStaticRoutes.map((route) => ({
    url: siteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));

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

    const existingUrls = new Set(staticRoutes.map((route) => route.url));

    const pageRoutes = pages
      .filter((page) => page.slug !== "home")
      .map((page) => ({
        url: siteUrl(`/${page.slug}`),
        lastModified: page.updatedAt,
        changeFrequency: "monthly" as const,
        priority: 0.6
      }))
      .filter((route) => {
        if (existingUrls.has(route.url)) return false;
        existingUrls.add(route.url);
        return true;
      });

    return [...staticRoutes, ...postRoutes, ...pageRoutes];
  } catch (error) {
    console.error("Failed to build sitemap from database", error);
    return staticRoutes;
  }
}
