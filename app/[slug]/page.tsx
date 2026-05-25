import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlocksRenderer } from "@/components/blocks/block-renderer";
import { PublicShell } from "@/components/layout/public-shell";
import { getPublishedPage } from "@/lib/cms";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

type PageProps = {
  params: { slug: string };
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const page = await getPublishedPage(params.slug);

  return createMetadata({
    title: page?.seoTitle || page?.title || "Trang",
    description: page?.seoDescription,
    path: `/${params.slug}`
  });
}

export default async function CmsPage({ params }: PageProps) {
  if (params.slug === "home") {
    notFound();
  }

  const page = await getPublishedPage(params.slug);

  if (!page) {
    notFound();
  }

  return (
    <PublicShell>
      <BlocksRenderer blocks={page.blocks} />
    </PublicShell>
  );
}
