"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

type GalleryGridProps = {
  images: string[];
  title?: string;
};

export function GalleryGrid({ images, title }: GalleryGridProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open = (index: number) => setLightboxIndex(index);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() => {
    setLightboxIndex((i) =>
      i !== null ? (i - 1 + images.length) % images.length : null,
    );
  }, [images.length]);

  const next = useCallback(() => {
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null));
  }, [images.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [lightboxIndex, prev, next]);

  // Lock body scroll when lightbox open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [lightboxIndex]);

  const getBentoClasses = (idx: number) => {
    if (images.length === 2) {
      return idx === 0
        ? "md:col-span-2 h-[300px] md:h-[430px]"
        : "md:col-span-1 h-[300px] md:h-[430px]";
    }

    const mod = idx % 6;
    if (mod === 0) return "md:col-span-2 h-[300px] md:h-[430px]";
    if (mod === 1) return "md:col-span-1 h-[300px] md:h-[430px]";
    if (mod === 2) return "md:col-span-1 h-[240px]";
    if (mod === 3) return "md:col-span-2 h-[240px]";
    if (mod === 4) return "md:col-span-1 h-[240px]";
    return "md:col-span-2 h-[240px]";
  };

  const galleryCaptions = [
    "Tà áo dài di sản cách tân",
    "Không gian nghệ thuật ánh sáng",
    "Hành trình văn hóa di sản",
    "Đêm Gala vinh danh Tài Sắc Việt",
    "Tinh hoa cổ phục Việt Nam",
    "Trải nghiệm bản lĩnh & trí tuệ",
  ];

  return (
    <>
      {/* ── Bento Grid ── */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {images.map((image, index) => {
          const caption = galleryCaptions[index % galleryCaptions.length];
          const isLogoImage =
            image.includes("/Logo_TSVN/") ||
            image.includes("/logo/") ||
            image.includes("/partners/");
          const isPartnerLogo = image.includes("/partners/");
          return (
            <div
              key={image}
              className={`group relative cursor-pointer overflow-hidden rounded-2xl border border-white/5 shadow-[0_12px_40px_rgba(0,0,0,0.65)] transition-all duration-700 ease-out hover:border-[#D4AF37]/30 hover:shadow-[0_20px_50px_rgba(212,175,55,0.15)] ${getBentoClasses(
                index,
              )}`}
              onClick={() => open(index)}
              role="button"
              aria-label={`Xem ảnh ${index + 1}`}
            >
              {/* Image */}
              <Image
                src={image}
                alt={title ? `${title} — ảnh ${index + 1}` : `Ảnh ${index + 1}`}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 100vw"
                className={`transition-transform duration-700 ease-out group-hover:scale-105 ${
                  isLogoImage ? "object-contain p-8" : "object-cover"
                }`}
              />

              {/* Dark filter overlay on hover */}
              <div className="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Gold gradient sweep */}
              <div
                className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, rgba(13,13,13,0.92) 0%, rgba(13,13,13,0.3) 60%, transparent 100%)",
                }}
              />

              {/* Gold border ring on hover */}
              <div className="absolute inset-0 rounded-2xl ring-1 ring-transparent transition-all duration-500 group-hover:ring-[#D4AF37]/35" />

              {/* Zoom icon (top right) */}
              <div className="absolute right-4 top-4 opacity-0 transition-all duration-500 translate-y-[-10px] group-hover:translate-y-0 group-hover:opacity-100">
                <div
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D4AF37]/45 backdrop-blur-sm"
                  style={{ background: "rgba(13,13,13,0.65)" }}
                >
                  <ZoomIn className="h-4 w-4 text-[#D4AF37] drop-shadow-[0_0_6px_rgba(212,175,55,0.5)]" />
                </div>
              </div>

              {/* Text overlay & captions (bottom left) */}
              <div className="absolute inset-x-0 bottom-0 translate-y-3 px-6 pb-6 opacity-0 transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 flex flex-col justify-end h-full">
                <span className="font-cinzel text-xs font-semibold uppercase tracking-[0.25em] text-[#D4AF37]">
                  {String(index + 1).padStart(2, "0")} /{" "}
                  {String(images.length).padStart(2, "0")}
                </span>
                <h4 className="mt-2 font-cinzel text-lg font-bold uppercase tracking-wider text-white">
                  {caption}
                </h4>
                <p className="mt-1 font-sans text-xs text-zinc-400">
                  Hành trình di sản văn hóa
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center"
          style={{
            background: "rgba(4,3,1,0.96)",
            backdropFilter: "blur(16px)",
          }}
          onClick={close}
        >
          {/* Top gold accent line */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#c49b41]/40 to-transparent" />

          {/* Close */}
          <button
            id="gallery-lightbox-close"
            className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 transition-all duration-300 hover:border-[#c49b41]/50 hover:text-[#c49b41]"
            onClick={close}
            aria-label="Đóng"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Prev */}
          {images.length > 1 && (
            <button
              id="gallery-lightbox-prev"
              className="absolute left-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 transition-all duration-300 hover:border-[#c49b41]/50 hover:text-[#c49b41]"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Ảnh trước"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}

          {/* Image container */}
          <div
            className="relative flex h-full w-full items-center justify-center p-16"
            onClick={(e) => e.stopPropagation()}
          >
            <div
              className="relative h-full w-full"
              style={{ maxWidth: "min(90vw, 1280px)", maxHeight: "80vh" }}
            >
              <Image
                src={images[lightboxIndex]}
                alt={
                  title
                    ? `${title} — ảnh ${lightboxIndex + 1}`
                    : `Ảnh ${lightboxIndex + 1}`
                }
                fill
                sizes="90vw"
                className="object-contain drop-shadow-[0_24px_80px_rgba(0,0,0,0.8)]"
                priority
              />
            </div>
          </div>

          {/* Next */}
          {images.length > 1 && (
            <button
              id="gallery-lightbox-next"
              className="absolute right-3 top-1/2 z-10 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/70 transition-all duration-300 hover:border-[#c49b41]/50 hover:text-[#c49b41]"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Ảnh tiếp theo"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex items-center gap-3">
            <div className="h-px w-6 bg-[#c49b41]/40" />
            <p className="font-cinzel text-[11px] uppercase tracking-[0.3em] text-white/45">
              {lightboxIndex + 1} / {images.length}
            </p>
            <div className="h-px w-6 bg-[#c49b41]/40" />
          </div>

          {/* Bottom gold accent line */}
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c49b41]/30 to-transparent" />
        </div>
      )}
    </>
  );
}
