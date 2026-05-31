import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar } from "lucide-react";
import { getPostBySlug } from "@/lib/queries/posts";
import { createMetadata } from "@/lib/seo";
import { PublicShell } from "@/components/layout/public-shell";

type PageProps = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";

function formatDate(value: Date | null) {
  if (!value) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(value);
}

function getContentHtml(content: unknown) {
  if (
    content &&
    typeof content === "object" &&
    !Array.isArray(content) &&
    "html" in content &&
    typeof content.html === "string"
  ) {
    return content.html;
  }

  return "";
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return createMetadata({
    title: post?.seoTitle || post?.title || "Tin tức",
    description: post?.seoDescription || post?.excerpt,
    path: `/news/${params.slug}`,
    image: post?.thumbnail || post?.coverImage,
  });
}

export default async function NewsDetailPage({ params }: PageProps) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const thumbnail = post.thumbnail || post.coverImage;
  const contentHtml = getContentHtml(post.content);

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

      <main className="relative z-10">
        <article>
          {/* ── Header ── */}
          <header className="px-4 pb-10 pt-14 md:px-0 md:pt-20">
            <div className="container max-w-4xl">

              {/* Breadcrumb */}
              <nav className="mb-8 flex items-center gap-2" aria-label="Breadcrumb">
                <Link
                  href="/tin-tuc"
                  className="group inline-flex items-center gap-1.5 font-cinzel text-xs font-semibold uppercase tracking-[0.22em] text-white/50 transition-colors duration-300 hover:text-[#c49b41]"
                >
                  <ChevronLeft className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-x-0.5" />
                  Tin tức
                </Link>
                <span className="text-white/25" aria-hidden>/</span>
                <span className="truncate max-w-[200px] font-cinzel text-xs font-semibold uppercase tracking-[0.18em] text-[#c49b41]/70">
                  {post.title}
                </span>
              </nav>

              {/* Date */}
              <div className="flex items-center gap-2 mb-5">
                <Calendar className="h-3.5 w-3.5" style={{ color: "#c49b41" }} />
                <p
                  className="font-cinzel text-xs font-semibold uppercase tracking-[0.28em]"
                  style={{ color: "#c49b41" }}
                >
                  {formatDate(post.publishedAt || post.createdAt)}
                </p>
              </div>

              {/* Gold rule */}
              <div
                className="mb-6 h-px w-16 opacity-60"
                style={{ background: "linear-gradient(90deg, #c49b41, transparent)" }}
              />

              {/* Title */}
              <h1
                className="font-cinzel text-3xl font-black uppercase leading-tight tracking-wide text-white md:text-5xl lg:text-6xl"
                style={{ textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
              >
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p
                  className="mt-6 max-w-2xl font-playfair text-lg leading-8 italic"
                  style={{ color: "rgba(255,255,255,0.65)" }}
                >
                  {post.excerpt}
                </p>
              )}
            </div>
          </header>

          {/* ── Thumbnail ── */}
          {thumbnail ? (
            <div className="container max-w-5xl px-4 md:px-0">
              <div
                className="relative aspect-[16/9] overflow-hidden"
                style={{
                  borderRadius: "2px",
                  boxShadow: "0 8px 60px rgba(0,0,0,0.7), 0 0 0 1px rgba(196,155,65,0.15)",
                }}
              >
                <Image
                  src={thumbnail}
                  alt={post.title}
                  fill
                  sizes="(min-width: 1024px) 80vw, 100vw"
                  className="object-cover object-center"
                  priority
                />
                {/* Gold overlay tint on edges */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to bottom, transparent 60%, rgba(8,6,3,0.55) 100%)",
                  }}
                />
              </div>
            </div>
          ) : null}

          {/* ── Body content ── */}
          <div className="container max-w-3xl px-4 py-14 md:px-0">
            {/* Decorative separator before content */}
            <div className="mb-10 flex items-center gap-4 opacity-40">
              <div className="h-px flex-1 bg-[#c49b41]" />
              <svg width="10" height="10" viewBox="0 0 8 8" fill="#c49b41">
                <path d="M4 0l.8 2.4H8l-2 1.6.8 2.4L4 4.8l-2.8 1.6.8-2.4-2-1.6h3.2z" />
              </svg>
              <div className="h-px flex-1 bg-[#c49b41]" />
            </div>

            {contentHtml ? (
              <div
                className="news-prose font-playfair text-lg leading-9"
                style={{ color: "rgba(255,255,255,0.78)" }}
                dangerouslySetInnerHTML={{ __html: contentHtml }}
              />
            ) : (
              <p
                className="font-playfair text-lg italic leading-9"
                style={{ color: "rgba(255,255,255,0.65)" }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Bottom gold ornament */}
            <div className="mt-14 flex items-center gap-4 opacity-30">
              <div className="h-px flex-1 bg-[#c49b41]" />
              <svg width="8" height="8" viewBox="0 0 8 8" fill="#c49b41">
                <path d="M4 0l.8 2.4H8l-2 1.6.8 2.4L4 4.8l-2.8 1.6.8-2.4-2-1.6h3.2z" />
              </svg>
              <div className="h-px flex-1 bg-[#c49b41]" />
            </div>

            {/* Back link */}
            <div className="mt-10">
              <Link
                href="/news"
                className="group inline-flex items-center gap-2 font-cinzel text-xs font-bold uppercase tracking-[0.28em] text-white/50 transition-colors duration-300 hover:text-[#c49b41]"
              >
                <ChevronLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Quay lại Tin tức
              </Link>
            </div>
          </div>
        </article>
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
