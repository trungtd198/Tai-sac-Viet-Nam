import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Sparkles } from "lucide-react";
import { ContentBlock } from "@/lib/blocks";
import { defaultAssets } from "@/lib/default-assets";
import { programHero } from "@/lib/program-copy";
import { ButtonLink } from "@/components/ui/button";
import { RegistrationForm } from "@/components/blocks/registration-form";
import { GalleryGrid } from "@/components/blocks/gallery-grid";

type BlocksRendererProps = {
  blocks: ContentBlock[];
};

export async function BlocksRenderer({ blocks }: BlocksRendererProps) {
  const rendered = await Promise.all(blocks.map((block) => Block({ block })));

  return (
    <>
      {rendered.map((node, index) => (
        <div key={blocks[index]?.id}>{node}</div>
      ))}
    </>
  );
}

type RichTextRow =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] };

function readRichTextRows(value: string): RichTextRow[] {
  return value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((group) => group.trim())
    .filter(Boolean)
    .flatMap((group) => {
      const lines = group
        .split("\n")
        .map((line) => line.trim())
        .filter(Boolean);
      const bulletLines = lines.filter((line) => line.startsWith("•"));

      if (!bulletLines.length && group.startsWith("•")) {
        const items = group
          .split("•")
          .map((item) => item.trim())
          .filter(Boolean);

        return items.length ? [{ type: "list", items }] : [];
      }

      if (!bulletLines.length) {
        return [{ type: "paragraph", text: group }];
      }

      const rows: RichTextRow[] = [];
      const paragraphText = lines
        .filter((line) => !line.startsWith("•"))
        .join("\n");
      const items = bulletLines
        .map((line) => line.replace(/^•\s*/, "").trim())
        .filter(Boolean);

      if (paragraphText) {
        rows.push({ type: "paragraph", text: paragraphText });
      }

      if (items.length) {
        rows.push({ type: "list", items });
      }

      return rows;
    });
}

async function Block({ block }: { block: ContentBlock }) {
  switch (block.type) {
    case "hero": {
      const heroImage = block.image || defaultAssets.heroBanner;
      const eyebrow = block.eyebrow || programHero.eyebrow;
      const subtitle = block.subtitle || programHero.subtitle;

      return (
        <section className="relative min-h-[78svh] overflow-hidden bg-[#0b0904] text-white">
          <Image
            src={heroImage}
            alt={block.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          {/* Cinematic overlay */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.65) 0%, rgba(5,3,0,0.5) 40%, rgba(8,5,0,0.82) 100%)",
            }}
          />
          {/* Gold vignette bottom */}
          <div
            className="absolute inset-x-0 bottom-0 h-64 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 100%, rgba(196,155,65,0.4) 0%, transparent 70%)",
            }}
          />
          <div className="container relative z-10 flex min-h-[78svh] items-center py-20">
            <div className="max-w-3xl">
              {eyebrow ? (
                <p
                  className="mb-4 font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em] animate-hero-fade-up"
                  style={{ color: "#c49b41" }}
                >
                  {eyebrow}
                </p>
              ) : null}
              <h1
                className="font-cinzel text-5xl font-black uppercase leading-tight tracking-wide text-white md:text-7xl animate-hero-fade-up"
                style={{
                  textShadow: "0 4px 32px rgba(0,0,0,0.5)",
                  animationDelay: "100ms",
                }}
              >
                {block.title}
              </h1>
              {subtitle ? (
                <p
                  className="mt-5 max-w-2xl font-playfair text-lg leading-8 animate-hero-fade-up"
                  style={{
                    color: "rgba(255,255,255,0.72)",
                    animationDelay: "200ms",
                  }}
                >
                  {subtitle}
                </p>
              ) : null}
              <div
                className="mt-8 flex flex-col gap-3 sm:flex-row animate-hero-fade-up"
                style={{ animationDelay: "300ms" }}
              >
                {block.primaryCta ? (
                  <a
                    href={block.primaryCta.href}
                    className="group relative inline-flex items-center overflow-hidden rounded-none px-10 py-3.5 font-cinzel text-xs font-bold uppercase tracking-[0.22em] text-black transition-all duration-300 hover:scale-105 hover:shadow-[0_0_32px_rgba(196,155,65,0.5)]"
                    style={{
                      background:
                        "linear-gradient(135deg, #d4a843 0%, #c49b41 50%, #a07820 100%)",
                    }}
                  >
                    <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/15 transition-transform duration-500 group-hover:translate-x-full" />
                    <span className="relative">{block.primaryCta.label}</span>
                  </a>
                ) : null}
                {block.secondaryCta ? (
                  <a
                    href={block.secondaryCta.href}
                    className="inline-flex items-center rounded-none px-10 py-3.5 font-cinzel text-xs font-bold uppercase tracking-[0.22em] text-[#c49b41] transition-all duration-300 hover:bg-[#c49b41]/10"
                    style={{ border: "1px solid rgba(196,155,65,0.5)" }}
                  >
                    {block.secondaryCta.label}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      );
    }
    case "stats":
      return (
        <div
          className="relative overflow-hidden border-y"
          style={{
            background:
              "linear-gradient(90deg, #0c0901 0%, #150f02 50%, #0c0901 100%)",
            borderColor: "rgba(196,155,65,0.15)",
          }}
        >
          <div
            className="container grid py-0 sm:grid-cols-3 divide-y sm:divide-y-0"
            style={{ borderColor: "rgba(196,155,65,0.1)" }}
          >
            {block.items.map((item) => (
              <div
                key={item.label}
                className="flex flex-col items-center justify-center px-8 py-8 text-center"
              >
                <p
                  className="font-cinzel text-4xl font-black md:text-5xl"
                  style={{
                    color: "#c49b41",
                    textShadow: "0 0 24px rgba(196,155,65,0.3)",
                  }}
                >
                  {item.value}
                </p>
                <p className="mt-2 font-cinzel text-xs uppercase tracking-[0.3em] text-white/45">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div
            className="absolute inset-x-0 bottom-0 h-px opacity-20"
            style={{
              background:
                "linear-gradient(90deg, transparent, #c49b41 30%, #c49b41 70%, transparent)",
            }}
          />
        </div>
      );
    case "richText": {
      const rows = readRichTextRows(block.body);

      return (
        <section
          className="relative overflow-hidden section-padding text-white"
          style={{
            background:
              "linear-gradient(160deg, #0b0904 0%, #110c02 55%, #080603 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-48 -top-48 h-[500px] w-[500px] rounded-full opacity-[0.1]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.3) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-30">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
          <div className="container relative z-10 max-w-3xl">
            {block.eyebrow ? (
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[#c49b41] opacity-60" />
                <p
                  className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                  style={{ color: "#c49b41" }}
                >
                  {block.eyebrow}
                </p>
              </div>
            ) : null}
            {block.title ? (
              <h2
                className="font-cinzel text-3xl font-black uppercase leading-tight tracking-wide text-white md:text-5xl"
                style={{ textShadow: "0 4px 28px rgba(0,0,0,0.5)" }}
              >
                {block.title}
              </h2>
            ) : null}
            {block.title ? (
              <div
                className="mt-5 mb-8 h-[1.5px] w-16"
                style={{
                  background: "linear-gradient(90deg, #c49b41, transparent)",
                }}
              />
            ) : null}
            <div className="space-y-5">
              {rows.map((row, index) =>
                row.type === "list" ? (
                  <ul
                    key={`list-${index}`}
                    className="space-y-3 font-playfair text-base leading-[1.8] md:text-[1.05rem]"
                    style={{
                      color: "rgba(255,255,255,0.68)",
                      letterSpacing: "0.015em",
                    }}
                  >
                    {row.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-[0.72em] h-1.5 w-1.5 shrink-0 rounded-full bg-white/70" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p
                    key={`paragraph-${index}`}
                    className="whitespace-pre-line font-playfair text-base leading-[2] md:text-[1.05rem]"
                    style={{
                      color: "rgba(255,255,255,0.68)",
                      letterSpacing: "0.015em",
                    }}
                  >
                    {row.text}
                  </p>
                ),
              )}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
        </section>
      );
    }
    case "featureGrid":
      return (
        <section
          className="relative overflow-hidden section-padding text-white"
          style={{
            background:
              "linear-gradient(160deg, #0b0904 0%, #110c02 50%, #080603 100%)",
          }}
        >
          {/* Ambient gold glow — top-left */}
          <div
            className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.18]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.32) 0%, transparent 65%)",
            }}
          />
          {/* Ambient gold glow — bottom-right */}
          <div
            className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.14]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.24) 0%, transparent 65%)",
            }}
          />

          {/* Top decorative gold line */}
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>

          <div className="container relative z-10">
            {/* Section header */}
            <div className={block.eyebrow ? "mb-10" : "mb-10"}>
              {block.eyebrow ? (
                <div className="mb-4 flex items-center justify-center gap-3">
                  <div className="h-px w-8 bg-[#c49b41] opacity-60" />
                  <p
                    className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                    style={{ color: "#c49b41" }}
                  >
                    {block.eyebrow}
                  </p>
                  <div className="h-px w-8 bg-[#c49b41] opacity-60" />
                </div>
              ) : null}

              <h2
                className="font-cinzel text-center text-3xl font-black uppercase leading-tight tracking-wide text-white md:text-5xl"
                style={{ textShadow: "0 4px 28px rgba(0,0,0,0.5)" }}
              >
                {block.title}
              </h2>

              {/* Gold ornament divider */}
              <div className="mt-6 flex items-center justify-center gap-3">
                <div
                  className="h-[1.5px] w-14"
                  style={{
                    background: "linear-gradient(90deg, transparent, #c49b41)",
                  }}
                />
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <path
                    d="M6 0l1.2 3.6H12l-3 2.4 1.2 3.6L6 7.2l-4.2 2.4 1.2-3.6-3-2.4h4.8z"
                    fill="#c49b41"
                  />
                </svg>
                <div
                  className="h-[1.5px] w-14"
                  style={{
                    background: "linear-gradient(90deg, #c49b41, transparent)",
                  }}
                />
              </div>
            </div>

            {/* Cards grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {block.items.map((item, index) => (
                <article
                  key={item.title}
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#c49b41]/15 bg-white/[0.03] backdrop-blur-md p-8 transition-all duration-500 ease-out hover:-translate-y-1.5 hover:scale-[1.02] hover:bg-white/[0.06] hover:border-[#c49b41]/40 hover:shadow-[0_0_36px_rgba(196,155,65,0.2)]"
                >
                  {/* Inner glow on hover */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-[#c49b41]/[0.04] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                  {/* Card index — top right */}
                  <span
                    className="absolute right-6 top-6 font-cinzel text-[11px] font-bold tabular-nums opacity-25 group-hover:opacity-60 transition-opacity duration-300"
                    style={{ color: "#c49b41" }}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Gold Sparkles icon badge */}
                  <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-[#c49b41]/25 bg-gradient-to-br from-[#c49b41]/20 to-[#c49b41]/5 p-3 text-[#c49b41] transition-all duration-500 group-hover:border-[#c49b41]/50 group-hover:shadow-[0_0_22px_rgba(196,155,65,0.22)]">
                    <Sparkles className="h-5 w-5 drop-shadow-[0_0_8px_rgba(196,155,65,0.55)]" />
                  </div>

                  <h3 className="mt-6 font-cinzel text-xl font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-[#c49b41]">
                    {item.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-white/65 transition-colors duration-300 group-hover:text-white/80">
                    {item.description}
                  </p>

                  {/* Bottom card gold accent line */}
                  <div
                    className="mt-7 h-px w-full opacity-20 transition-opacity duration-300 group-hover:opacity-50"
                    style={{
                      background:
                        "linear-gradient(90deg, #c49b41, transparent)",
                    }}
                  />
                </article>
              ))}
            </div>
          </div>

          {/* Bottom decorative gold line */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
        </section>
      );
    case "schedule":
      return (
        <section
          className="relative overflow-hidden section-padding text-white"
          style={{
            background:
              "linear-gradient(160deg, #0b0904 0%, #100c02 55%, #080603 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full opacity-[0.1]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.3) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-30">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
          <div className="container relative z-10 max-w-4xl">
            <div className="grid gap-4">
              {block.items.map((item) => (
                <article
                  key={`${item.date}-${item.title}`}
                  className="group grid gap-4 rounded-2xl border border-[#c49b41]/12 bg-white/[0.03] p-6 backdrop-blur-sm sm:grid-cols-[160px_1fr] transition-all duration-500 hover:border-[#c49b41]/35 hover:bg-white/[0.06] hover:shadow-[0_0_28px_rgba(196,155,65,0.1)]"
                >
                  <div
                    className="flex items-center gap-2 font-cinzel text-sm font-bold"
                    style={{ color: "#c49b41" }}
                  >
                    <CalendarDays className="h-4 w-4 shrink-0 drop-shadow-[0_0_6px_rgba(196,155,65,0.5)]" />
                    {item.date}
                  </div>
                  <div>
                    <h3 className="font-cinzel text-xl font-bold uppercase tracking-wide text-white transition-colors duration-300 group-hover:text-[#c49b41]">
                      {item.title}
                    </h3>
                    <p className="mt-2 whitespace-pre-line text-sm leading-7 text-white/60 transition-colors duration-300 group-hover:text-white/80">
                      {item.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
        </section>
      );
    case "gallery":
      return (
        <section
          className="relative overflow-hidden section-padding text-white"
          style={{
            background:
              "linear-gradient(160deg, #0b0904 0%, #110c02 55%, #080603 100%)",
          }}
        >
          {/* Ambient gold glow — top-left */}
          <div
            className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.15]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.3) 0%, transparent 65%)",
            }}
          />
          {/* Ambient gold glow — bottom-right */}
          <div
            className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.12]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.2) 0%, transparent 65%)",
            }}
          />
          {/* Top gold line */}
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>

          <div className="container relative z-10">
            {block.title ? (
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="h-px w-8 bg-[#c49b41] opacity-60" />
                  <p
                    className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                    style={{ color: "#c49b41" }}
                  >
                    Thư viện ảnh
                  </p>
                </div>
                <h2
                  className="font-cinzel text-3xl font-black uppercase leading-tight tracking-wide text-white md:text-5xl"
                  style={{ textShadow: "0 4px 28px rgba(0,0,0,0.5)" }}
                >
                  {block.title}
                </h2>
                <div
                  className="mt-5 h-[1.5px] w-16"
                  style={{
                    background: "linear-gradient(90deg, #c49b41, transparent)",
                  }}
                />
              </div>
            ) : null}
            <GalleryGrid images={block.images} title={block.title} />
          </div>

          {/* Bottom gold line */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
        </section>
      );
    case "sponsors":
      return (
        <section
          className="relative overflow-hidden section-padding text-white"
          style={{
            background:
              "linear-gradient(160deg, #0b0904 0%, #110c02 55%, #080603 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full opacity-[0.1]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.3) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-30">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
          <div className="container relative z-10">
            {block.eyebrow ? (
              <div className="mb-4 flex items-center gap-3">
                <div className="h-px w-8 bg-[#c49b41] opacity-60" />
                <p
                  className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                  style={{ color: "#c49b41" }}
                >
                  {block.eyebrow}
                </p>
              </div>
            ) : null}
            <h2
              className="mb-10 font-cinzel text-3xl font-black uppercase leading-tight tracking-wide text-white md:text-5xl"
              style={{ textShadow: "0 4px 28px rgba(0,0,0,0.5)" }}
            >
              {block.title}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {block.sponsors.map((sponsor) => (
                <div
                  key={sponsor}
                  className="group flex min-h-40 items-center justify-center rounded-2xl border border-[#c49b41]/15 bg-white/[0.03] p-6 text-center backdrop-blur-sm transition-all duration-500 hover:border-[#c49b41]/40 hover:bg-white/[0.07] hover:shadow-[0_0_28px_rgba(196,155,65,0.15)]"
                >
                  {sponsor.toLowerCase().includes("lta") ? (
                    <div className="relative h-20 w-64 rounded-md border border-[#c49b41]/25 bg-[#0D0D0D]/90 p-4 shadow-[0_14px_34px_rgba(0,0,0,0.48)]">
                      <Image
                        src={defaultAssets.partnerLogo}
                        alt="LTA Global"
                        fill
                        sizes="256px"
                        className="object-contain p-3"
                      />
                    </div>
                  ) : (
                    <span className="font-cinzel text-sm font-bold uppercase tracking-[0.15em] text-white/60 transition-colors duration-300 group-hover:text-[#c49b41]">
                      {sponsor}
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
        </section>
      );
    case "cta":
      return (
        <section
          className="relative overflow-hidden py-24 md:py-32 text-white"
          style={{
            background:
              "linear-gradient(160deg, #110c02 0%, #1d1200 40%, #110c02 100%)",
          }}
        >
          {/* Rich gold radial glow — centre */}
          <div
            className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[500px] w-[900px] opacity-30 rounded-full"
            style={{
              background:
                "radial-gradient(ellipse, rgba(196,155,65,0.55) 0%, transparent 65%)",
            }}
          />

          {/* Top + bottom gold lines */}
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-50">
            <div className="h-px w-56 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
            <div className="h-px w-56 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>

          <div className="container relative z-10 flex flex-col items-center text-center">
            {/* Eyebrow */}
            <div className="mb-6 flex items-center gap-3">
              <div className="h-px w-10 bg-[#c49b41] opacity-60" />
              <p
                className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                style={{ color: "#c49b41" }}
              >
                Hành động ngay
              </p>
              <div className="h-px w-10 bg-[#c49b41] opacity-60" />
            </div>

            {/* Title */}
            <h2
              className="font-cinzel text-4xl font-black uppercase leading-tight tracking-wide text-white md:text-6xl lg:text-7xl"
              style={{ textShadow: "0 4px 32px rgba(0,0,0,0.4)" }}
            >
              {block.title}
            </h2>

            {/* Body */}
            {block.body ? (
              <p
                className="mx-auto mt-6 max-w-xl font-playfair text-base leading-8 md:text-lg"
                style={{
                  color: "rgba(255,255,255,0.65)",
                  letterSpacing: "0.015em",
                }}
              >
                {block.body}
              </p>
            ) : null}

            {/* Gold ornament */}
            <div className="mt-8 flex items-center gap-3">
              <div
                className="h-[1.5px] w-12"
                style={{
                  background: "linear-gradient(90deg, transparent, #c49b41)",
                }}
              />
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path
                  d="M5 0l1 3H10l-2.5 2 1 3L5 6.5 1.5 8l1-3L0 3h4z"
                  fill="#c49b41"
                />
              </svg>
              <div
                className="h-[1.5px] w-12"
                style={{
                  background: "linear-gradient(90deg, #c49b41, transparent)",
                }}
              />
            </div>

            {/* CTA Button */}
            {block.cta ? (
              <div className="mt-10">
                <a
                  href={block.cta.href}
                  className="group relative inline-flex items-center gap-3 overflow-hidden rounded-none px-12 py-4 font-cinzel text-sm font-bold uppercase tracking-[0.25em] text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_48px_rgba(196,155,65,0.55)]"
                  style={{
                    background:
                      "linear-gradient(135deg, #d4a843 0%, #c49b41 40%, #a07820 100%)",
                  }}
                >
                  {/* Shimmer sweep on hover */}
                  <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">{block.cta.label}</span>
                </a>
              </div>
            ) : null}
          </div>
        </section>
      );
    case "newsList": {
      return (
        <section
          className="relative overflow-hidden section-padding text-white"
          style={{
            background:
              "linear-gradient(160deg, #0b0904 0%, #110c02 55%, #080603 100%)",
          }}
        >
          <div
            className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.12]"
            style={{
              background:
                "radial-gradient(circle, rgba(196,155,65,0.28) 0%, transparent 65%)",
            }}
          />
          <div className="absolute inset-x-0 top-0 flex justify-center opacity-30">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
          <div className="container relative z-10">
            <div className="mb-10">
              <div>
                {block.eyebrow ? (
                  <div className="mb-3 flex items-center gap-3">
                    <div className="h-px w-8 bg-[#c49b41] opacity-60" />
                    <p
                      className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                      style={{ color: "#c49b41" }}
                    >
                      {block.eyebrow}
                    </p>
                  </div>
                ) : null}
                <h2
                  className="font-cinzel text-3xl font-black uppercase leading-tight tracking-wide text-white md:text-5xl"
                  style={{ textShadow: "0 4px 28px rgba(0,0,0,0.5)" }}
                >
                  {block.title}
                </h2>
              </div>
            </div>
            <div className="rounded-2xl border border-[#c49b41]/16 bg-white/[0.03] px-6 py-12 text-center shadow-[0_18px_48px_rgba(0,0,0,0.35)] backdrop-blur-sm">
              <p className="text-base font-semibold text-white/72 md:text-lg">
                Nội dung đang cập nhật
              </p>
            </div>
          </div>
          <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
            <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#c49b41] to-transparent" />
          </div>
        </section>
      );
    }
    case "registration":
      return <RegistrationForm />;
    default:
      return null;
  }
}
