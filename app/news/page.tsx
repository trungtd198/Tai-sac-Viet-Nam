import type { Metadata } from "next";
import { createMetadata } from "@/lib/seo";
import { PublicShell } from "@/components/layout/public-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = createMetadata({
  title: "Tin tức",
  description: "Tin tức, thông báo và bài viết mới nhất của sự kiện.",
  path: "/tin-tuc",
});

export default async function NewsPage() {
  return (
    <PublicShell>
    <div
      className="relative min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(160deg, #0b0904 0%, #110c02 60%, #080603 100%)" }}
    >
      {/* Ambient top glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full opacity-[0.07]"
        style={{ background: "radial-gradient(ellipse, rgba(196,155,65,0.7) 0%, transparent 70%)" }}
      />

      {/* Top gold separator */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c49b41]/30 to-transparent" />

      <main className="relative z-10 px-4 py-16 md:py-24 md:px-0">
        <div className="container">

          {/* ── Page heading ── */}
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <p
              className="font-cinzel text-xs font-semibold uppercase tracking-[0.35em]"
              style={{ color: "#c49b41" }}
            >
              Tin tức
            </p>

            {/* Gold rule */}
            <div
              className="mt-3 mb-5 h-px w-12 opacity-60"
              style={{ background: "linear-gradient(90deg, #c49b41, transparent)" }}
            />

            <h1
              className="font-cinzel text-4xl font-black uppercase leading-tight tracking-wide text-white md:text-6xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.5)" }}
            >
              Cập nhật mới nhất
            </h1>

            <p
              className="mt-5 font-playfair text-base italic leading-7 md:text-lg"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Thông báo tuyển sinh, hành trình truyền hình thực tế và thông tin Gala Chung kết.
            </p>
          </div>

          {/* Decorative separator */}
          <div className="mt-10 mb-12 flex items-center gap-4 opacity-25">
            <div className="h-px flex-1 bg-[#c49b41]" />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="#c49b41">
              <path d="M4 0l.8 2.4H8l-2 1.6.8 2.4L4 4.8l-2.8 1.6.8-2.4-2-1.6h3.2z" />
            </svg>
            <div className="h-px flex-1 bg-[#c49b41]" />
          </div>

          {/* ── Content ── */}
          <div
            className="rounded-none border p-8 text-center font-sans text-base font-semibold md:text-lg"
            style={{
              borderColor: "rgba(196,155,65,0.2)",
              color: "rgba(255,255,255,0.72)",
              background: "rgba(196,155,65,0.04)",
            }}
          >
            Nội dung đang cập nhật
          </div>
        </div>
      </main>

      {/* Bottom ambient glow */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.06]"
        style={{ background: "radial-gradient(ellipse, rgba(196,155,65,0.6) 0%, transparent 70%)" }}
      />
    </div>
    </PublicShell>
  );
}
