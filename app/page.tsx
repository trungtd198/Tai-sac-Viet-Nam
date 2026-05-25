import type { Metadata } from "next";
import { PublicShell } from "@/components/layout/public-shell";
import { PageBlockRenderer } from "@/components/page-blocks/page-block-renderer";
import { getActivePageBlocks } from "@/lib/queries/page-blocks";
import { programBrand } from "@/lib/program-copy";
import { createMetadata } from "@/lib/seo";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: programBrand.name,
  description: "Tài Sắc Việt Nam 2026 - hành trình tìm kiếm hình ảnh người phụ nữ Việt Nam thế hệ mới: bản lĩnh, trí tuệ và lan tỏa giá trị văn hóa Việt.",
  path: "/",
  image: "/assets/banners/banner.jpg"
});

export default async function HomePage() {
  const blocks = await getActivePageBlocks("home");

  return (
    <PublicShell>
      {blocks.length > 0 ? (
        <PageBlockRenderer blocks={blocks} />
      ) : (
        <section className="section-padding">
          <div className="container">
            <p className="text-sm text-muted-foreground">Chưa có khối trang chủ đang hiển thị.</p>
          </div>
        </section>
      )}
    </PublicShell>
  );
}
