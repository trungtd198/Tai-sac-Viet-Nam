import type { Metadata } from "next";

import { programBrand } from "@/lib/program-copy";

const siteName = programBrand.name;
const defaultDescription =
  "Website chính thức của Tài Sắc Việt Nam 2026: hành trình truyền hình thực tế tôn vinh bản lĩnh, trí tuệ và giá trị văn hóa Việt.";
const defaultImage =
  "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80";

export function siteUrl(path = "/") {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
}

export function createMetadata({
  title,
  description = defaultDescription,
  path = "/",
  image = defaultImage,
  noIndex = false
}: {
  title: string;
  description?: string | null;
  path?: string;
  image?: string | null;
  noIndex?: boolean;
}): Metadata {
  const resolvedDescription = description || defaultDescription;
  const url = siteUrl(path);
  const images = image ? [{ url: image, width: 1600, height: 900, alt: title }] : undefined;

  return {
    title,
    description: resolvedDescription,
    alternates: {
      canonical: url
    },
    openGraph: {
      type: "website",
      siteName,
      title,
      description: resolvedDescription,
      url,
      images
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: resolvedDescription,
      images: image ? [image] : undefined
    },
    robots: noIndex
      ? {
          index: false,
          follow: false
        }
      : undefined
  };
}

export const defaultSeo = {
  siteName,
  description: defaultDescription,
  image: defaultImage
};
