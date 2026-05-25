import type { Metadata } from "next";

import { programBrand } from "@/lib/program-copy";

const siteName = programBrand.name;
const defaultDescription =
  "Tài Sắc Việt Nam 2026 - hành trình tìm kiếm hình ảnh người phụ nữ Việt Nam thế hệ mới: bản lĩnh, trí tuệ và lan tỏa giá trị văn hóa Việt.";
const defaultImage = "/assets/banners/banner.jpg";

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
  const resolvedImage =
    image && image.startsWith("http") ? image : image ? siteUrl(image) : null;
  const images = resolvedImage
    ? [{ url: resolvedImage, width: 1672, height: 941, alt: title }]
    : undefined;

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
      images: resolvedImage ? [resolvedImage] : undefined
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
  image: siteUrl(defaultImage)
};
