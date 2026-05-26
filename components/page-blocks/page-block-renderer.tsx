import { PageBlockType } from "@prisma/client";
import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Award,
  BookOpenCheck,
  Gem,
  HandHeart,
  Sparkles,
} from "lucide-react";
import { CountdownBlock } from "@/components/page-blocks/countdown-block";
import { GalleryGrid } from "@/components/blocks/gallery-grid";
import { PartnerMarquee } from "@/components/page-blocks/partner-marquee";
import { GoldDustCanvas } from "@/components/page-blocks/gold-dust-canvas";
import { getAwards } from "@/lib/queries/awards";
import { getPartners } from "@/lib/queries/partners";
import { getFeaturedSchedules } from "@/lib/queries/schedules";
import { defaultAssets } from "@/lib/default-assets";
import { programHero, programValueItems } from "@/lib/program-copy";

type Block = Awaited<
  ReturnType<typeof import("@/lib/queries/page-blocks").getActivePageBlocks>
>[number];

function asRecord(value: unknown): Record<string, unknown> {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    return value as Record<string, unknown>;
  }

  return {};
}

function readString(value: unknown, fallback = "") {
  return typeof value === "string" ? value : fallback;
}

function readArray(value: unknown) {
  return Array.isArray(value) ? value : [];
}

function isPosterImage(src: string) {
  return (
    src.toLowerCase().includes("/posters/") ||
    src.toLowerCase().includes("poster")
  );
}

function isLocalAsset(src: string) {
  return src.startsWith("/assets/") && !isPosterImage(src);
}

function resolveLocalImage(src: string | undefined, fallback: string) {
  if (src && isLocalAsset(src)) return src;
  return fallback;
}

const fallbackGalleryImages = [
  defaultAssets.heroBanner,
  defaultAssets.heroArt,
];

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

function getRichTextFallbackImage(
  content: Record<string, unknown>,
  title?: string | null,
) {
  const blockKey = readString(content.blockKey);

  if (blockKey === "home-experience") return defaultAssets.programMockupGold;
  if (blockKey === "home-eligibility") return defaultAssets.programLogoGold;
  if (blockKey === "home-overview") return defaultAssets.heroArt;

  if (title?.toLowerCase().includes("đối tượng"))
    return defaultAssets.programLogoGold;
  if (title?.toLowerCase().includes("trải nghiệm"))
    return defaultAssets.programMockupGold;

  return defaultAssets.heroArt;
}

export async function PageBlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((block) => (
        <PageBlock key={block.id} block={block} />
      ))}
    </>
  );
}

async function PageBlock({ block }: { block: Block }) {
  switch (block.type) {
    case PageBlockType.HERO:
      return <HeroBlock block={block} />;
    case PageBlockType.COUNTDOWN:
      return <CountdownSectionBlock block={block} />;
    case PageBlockType.RICH_TEXT:
      return <AboutBlock block={block} />;
    case PageBlockType.SCHEDULE:
      return <ScheduleBlock block={block} />;
    case PageBlockType.AWARDS:
      return <AwardsBlock block={block} />;
    case PageBlockType.NEWS:
      return <NewsBlock block={block} />;
    case PageBlockType.PARTNERS:
      return <PartnersBlock block={block} />;
    case PageBlockType.VIDEO:
      return <VideoBlock block={block} />;
    case PageBlockType.GALLERY:
      return <GalleryBlock block={block} />;
    case PageBlockType.CTA:
      return <CtaBlock block={block} />;
    default:
      return null;
  }
}

function HeroBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const title = block.title || readString(content.title, programHero.title);
  const image = resolveLocalImage(
    block.media?.url || readString(content.image),
    defaultAssets.heroBanner,
  );

  return (
    <section className="relative min-h-[78svh] w-full overflow-hidden bg-[#0D0D0D] text-white md:min-h-[82svh]">
      <h1 className="sr-only">{title}</h1>
      <Image
        src={image}
        alt={title}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />
      <div
        className="absolute inset-0 z-[2]"
        style={{
          background:
            "linear-gradient(90deg, rgba(13,13,13,0.08) 0%, rgba(13,13,13,0.02) 52%, rgba(13,13,13,0.04) 100%), linear-gradient(180deg, rgba(13,13,13,0.04) 0%, rgba(13,13,13,0.02) 58%, #0D0D0D 100%)",
        }}
      />

      {/* Subtle golden radial vignette at bottom centre */}
      <div className="absolute inset-x-0 bottom-0 z-[3] h-80 bg-[radial-gradient(ellipse_70%_55%_at_50%_100%,rgba(212,175,55,0.25),transparent_68%)]" />
      <div className="absolute inset-0 z-[3] bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      {/* Decorative top-centre line */}
      <div className="absolute inset-x-0 top-0 flex justify-center pt-6 opacity-60 z-[3]">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      {/* Gold Dust Particles */}
      <GoldDustCanvas />

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 z-[4] h-28 bg-gradient-to-t from-[#0D0D0D] to-transparent" />
    </section>
  );
}

function CountdownSectionBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const targetDate = readString(
    content.targetDate,
    "2026-06-25T23:59:59+07:00",
  );
  const eyebrow = readString(content.eyebrow, "Hạn đăng ký");
  const description = readString(content.description);

  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        background:
          "linear-gradient(90deg, #0d0d0d 0%, #1a1a1a 50%, #0d0d0d 100%)",
        borderColor: "rgba(212,175,55,0.2)",
      }}
    >
      {/* Ambient centre glow */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[300px] w-[700px] opacity-[0.1] rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.5) 0%, transparent 65%)",
        }}
      />
      <div className="container relative z-10 grid gap-8 py-10 md:grid-cols-[1fr_1.3fr] md:items-center">
        <div>
          <div className="mb-3 flex items-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
            <p
              className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "#D4AF37" }}
            >
              {eyebrow}
            </p>
          </div>
          <h2
            className="font-cinzel text-2xl font-black uppercase tracking-wide text-white md:text-3xl"
            style={{ textShadow: "0 2px 16px rgba(0,0,0,0.5)" }}
          >
            {block.title || "Đếm ngược đến hạn đăng ký"}
          </h2>
          {description ? (
            <p
              className="mt-3 font-sans text-sm leading-relaxed"
              style={{ color: "rgba(255,255,255,0.7)" }}
            >
              {description}
            </p>
          ) : null}
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <Link
              href="/dang-ky-du-thi"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md px-5 py-2.5 font-sans text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#1b1403] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(212,175,55,0.48)]"
              style={{
                background:
                  "linear-gradient(135deg, #9a6b1b 0%, #D4AF37 34%, #fff0a6 58%, #c5902d 100%)",
              }}
            >
              <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
              <span className="relative">Đăng ký dự thi</span>
            </Link>
          </div>
        </div>
        <CountdownBlock targetDate={targetDate} />
      </div>
      {/* Bottom gold line */}
      <div
        className="absolute inset-x-0 bottom-0 h-px opacity-20"
        style={{
          background:
            "linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)",
        }}
      />
    </div>
  );
}

function AboutBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const blockKey = readString(content.blockKey);
  const body = readString(content.body || content.description);
  const image = resolveLocalImage(
    block.media?.url || readString(content.image),
    getRichTextFallbackImage(content, block.title),
  );
  const rows = readRichTextRows(body).slice(
    0,
    blockKey === "home-overview" ? 3 : 4,
  );
  const items = readArray(content.items)
    .map((item) => {
      const value = asRecord(item);

      return {
        title: readString(value.title),
        description: readString(value.description),
      };
    })
    .filter((item) => item.title && item.description);

  return (
    <section
      id={blockKey === "home-overview" ? "so-luoc" : undefined}
      className="relative overflow-hidden py-20 md:py-28"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #12110d 46%, #0D0D0D 100%)",
      }}
    >
      {/* Ambient gold glow — top right */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 65%)",
        }}
      />

      {/* Ambient gold glow — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 65%)",
        }}
      />

      {/* Top-centre decorative line */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        <div className="grid items-center gap-14 lg:grid-cols-[1.28fr_0.72fr] lg:gap-20">
          {/* ── Left: text column ── */}
          <div
            className="animate-slide-from-left"
            style={{ animationDelay: "80ms" }}
          >
            {/* Gold eyebrow label */}
            <div className="mb-5 flex items-center gap-3">
              <div className="h-px w-10 bg-[#D4AF37] opacity-80" />
              <p
                className="font-cinzel text-xs font-semibold uppercase"
                style={{ color: "#D4AF37" }}
              >
                Giới thiệu
              </p>
            </div>

            {/* Main heading */}
            {block.title ? (
              <h2 className="font-cinzel text-gold-metallic text-3xl font-black uppercase sm:text-4xl lg:text-5xl">
                {block.title}
              </h2>
            ) : null}

            {/* Decorative gold ornament divider */}
            <div className="my-8 flex items-center gap-3">
              <div
                className="h-[1.5px] w-16"
                style={{
                  background:
                    "linear-gradient(90deg, #D4AF37, rgba(212,175,55,0.15))",
                }}
              />
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M7 1l1.4 4.2H14l-3.5 2.8 1.4 4.2L7 9.4l-4.9 2.8 1.4-4.2L0 5.2h5.6z"
                  fill="#D4AF37"
                />
              </svg>
              <div
                className="h-[1.5px] flex-1"
                style={{
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.15), transparent)",
                }}
              />
            </div>

            {rows.length ? (
              <div className="max-w-3xl space-y-5">
                {rows.map((row, index) =>
                  row.type === "list" ? (
                    <ul
                      key={`list-${index}`}
                      className="space-y-3 font-sans text-sm leading-7 text-zinc-300 md:text-base"
                    >
                      {row.items.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-[#D4AF37]/80 shadow-[0_0_6px_rgba(212,175,55,0.8)]" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p
                      key={`paragraph-${index}`}
                      className="whitespace-pre-line font-sans text-sm leading-7 text-zinc-300 md:text-base"
                    >
                      {row.text}
                    </p>
                  ),
                )}
              </div>
            ) : null}

            {items.length ? (
              <div className="mt-8 grid gap-4">
                {items.map((item) => (
                  <div
                    key={item.title}
                    className="group rounded-2xl border border-[#D4AF37]/15 bg-white/[0.02] p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-[#D4AF37]/35 hover:bg-white/[0.04]"
                  >
                    <div className="flex gap-3">
                      <span
                        className="mt-2 h-2.5 w-2.5 shrink-0 rounded-full"
                        style={{
                          background: "#D4AF37",
                          boxShadow: "0 0 14px rgba(212,175,55,0.6)",
                        }}
                      />
                      <div>
                        <h3 className="font-cinzel text-sm font-bold uppercase text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                          {item.title}
                        </h3>
                        <p className="mt-2 font-sans text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : null}

            {/* Bottom gold rule */}
            <div
              className="mt-10 h-px w-24 opacity-30"
              style={{
                background: "linear-gradient(90deg, #D4AF37, transparent)",
              }}
            />
          </div>

          <div
            className="animate-slide-from-right relative h-[430px] w-full sm:h-[500px] lg:h-[540px]"
            style={{ animationDelay: "200ms" }}
          >
            <div
              className="absolute left-0 top-3 aspect-[4/5] w-[68%] overflow-hidden rounded-xl border border-[#D4AF37]/25 bg-[#0D0D0D] transition-all duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/55"
              style={{
                boxShadow:
                  "0 18px 44px rgba(0,0,0,0.62), 0 0 28px rgba(212,175,55,0.08)",
              }}
            >
              <div className="relative h-full w-full">
                <Image
                  src={image}
                  alt={block.title || "Hình ảnh chương trình"}
                  fill
                  sizes="(min-width: 1024px) 30vw, 70vw"
                  className="object-cover object-center transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              </div>
            </div>

            <div
              className="absolute right-0 top-28 aspect-[16/11] w-[72%] overflow-hidden rounded-xl border border-[#D4AF37]/35 bg-[#0D0D0D] transition-all duration-500 hover:translate-y-1 hover:border-[#D4AF37]/65"
              style={{
                boxShadow:
                  "0 24px 56px rgba(0,0,0,0.68), 0 0 34px rgba(212,175,55,0.1)",
              }}
            >
              <Image
                src={defaultAssets.brandTexture}
                alt="Nhận diện thương hiệu Tài Sắc Việt Nam"
                fill
                sizes="(min-width: 1024px) 30vw, 70vw"
                className="object-cover object-center transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent" />
            </div>

            <div
              className="absolute bottom-20 left-[30%] z-10 flex h-28 w-28 items-center justify-center rounded-xl border border-[#D4AF37]/30 bg-[#101010]/75 p-5 backdrop-blur-md sm:h-36 sm:w-36"
              style={{
                boxShadow:
                  "0 18px 44px rgba(0,0,0,0.62), 0 0 36px rgba(212,175,55,0.12)",
              }}
            >
              <Image
                src={defaultAssets.programLogoGold}
                alt="Logo Tài Sắc Việt Nam"
                width={120}
                height={120}
                className="h-full w-full object-contain"
              />
            </div>

            <div
              className="absolute bottom-0 right-6 z-20 flex h-24 w-44 items-center justify-center rounded-xl border border-[#D4AF37]/25 bg-[#0D0D0D]/90 p-4 transition-all duration-500 hover:-translate-y-1 hover:border-[#D4AF37]/55 sm:h-28 sm:w-52"
              style={{
                boxShadow:
                  "0 18px 44px rgba(0,0,0,0.55), 0 0 30px rgba(212,175,55,0.1)",
              }}
            >
              <Image
                src={defaultAssets.partnerLogo}
                alt="Logo đối tác LTA Global"
                width={180}
                height={90}
                className="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom-centre decorative line */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

async function ScheduleBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const limit = Number(content.limit || 5);
  const dbSchedules = await getFeaturedSchedules();
  const fallbackSchedules = [
    {
      id: "fallback-schedule-1",
      time: "26/05/2026 - 25/06/2026",
      title: "Tuyển sinh toàn quốc",
      description: "Tiếp nhận hồ sơ đăng ký dự thi trực tuyến trên toàn quốc.",
    },
    {
      id: "fallback-schedule-2",
      time: "Tháng 6/2026",
      title: "Sơ khảo",
      description:
        "Đánh giá catwalk, tài năng và bản lĩnh cá nhân của thí sinh.",
    },
    {
      id: "fallback-schedule-3",
      time: "Tháng 7-8/2026",
      title: "Đào tạo & ghi hình",
      description:
        "Trải nghiệm văn hóa, cổ phục, làng nghề và thử thách truyền hình thực tế.",
    },
    {
      id: "fallback-schedule-4",
      time: "Ghi hình",
      title: "06 tập phát sóng",
      description:
        "Hành trình được ghi hình thành chuỗi truyền hình thực tế trước đêm chung kết.",
    },
    {
      id: "fallback-schedule-5",
      time: "Dự kiến 2026",
      title: "Vòng bán kết chương trình",
      description:
        "Địa điểm (dự kiến): Hà Nội\nNội dung thi: Lựa chọn 30 thí sinh có điểm cao nhất có mặt trong đêm Chung kết.\n+ Catwalk\n+ Phần thi tài năng",
    },
    {
      id: "fallback-schedule-6",
      time: "Dự kiến 2026",
      title: "Vòng chung kết",
      description:
        "Nội dung thi: 30 thí sinh sẽ cùng có mặt trong đêm Chung kết, lần lượt tham gia các phần sau:\n+ Trình diễn trang phục áo dài\n+ Trình diễn trang phục dạ hội\n+ Phần thi tài năng\n+ Top 5 - Phần thi ứng xử\nCông bố và trao giải thưởng cho các danh hiệu: Quán quân, Quán quân 1, Quán quân 2 và các giải phụ.",
    },
  ];
  const schedules = (
    dbSchedules.length ? dbSchedules : fallbackSchedules
  ).slice(0, limit);

  return (
    <section
      className="relative overflow-hidden section-padding text-white"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #161616 50%, #0D0D0D 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -left-40 -bottom-40 h-[500px] w-[500px] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 65%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-30">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
            <p
              className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "#D4AF37" }}
            >
              Lịch trình
            </p>
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
          </div>
          <h2 className="font-cinzel text-gold-metallic text-3xl font-black uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            {block.title || "Lịch trình"}
          </h2>
          <div className="mt-5 flex items-center justify-center gap-3">
            <div
              className="h-[1.5px] w-10"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37)",
              }}
            />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M4 0l.8 2.4H8l-2 1.6.8 2.4L4 4.8l-2.8 1.6.8-2.4-2-1.6h3.2z"
                fill="#D4AF37"
              />
            </svg>
            <div
              className="h-[1.5px] w-10"
              style={{
                background: "linear-gradient(90deg, #D4AF37, transparent)",
              }}
            />
          </div>
        </div>

        <div className="relative mx-auto mt-12 max-w-4xl pl-8 md:pl-0">
          <div className="timeline-rail absolute bottom-2 left-[15px] top-2 w-[1.5px] bg-gradient-to-b from-[#D4AF37] via-[#D4AF37]/30 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-16">
            {schedules.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className="timeline-step relative flex flex-col md:flex-row md:items-center"
                  style={
                    { "--delay": `${index * 110}ms` } as CSSProperties &
                      Record<"--delay", string>
                  }
                >
                  <div className="absolute left-[-24px] top-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full border-2 border-[#D4AF37] bg-[#0D0D0D] shadow-[0_0_14px_rgba(212,175,55,0.7)] transition-transform duration-300 hover:scale-125 md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#D4AF37]" />
                  </div>

                  <div
                    className={`w-full md:w-1/2 pr-0 md:pr-12 text-left md:text-right transition-all duration-500 hover:translate-x-[-4px] ${isLeft ? "block" : "hidden md:block md:invisible"}`}
                  >
                    <h3 className="font-cinzel text-lg font-bold uppercase tracking-wider text-white hover:text-[#D4AF37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 whitespace-pre-line font-sans text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>
                  </div>

                  <div
                    className={`w-full md:w-1/2 pl-0 md:pl-12 text-left transition-all duration-500 hover:translate-x-[4px] ${!isLeft ? "block" : "block md:hidden"}`}
                  >
                    <h3 className="font-cinzel text-lg font-bold uppercase tracking-wider text-white hover:text-[#D4AF37] transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="mt-3 whitespace-pre-line font-sans text-sm leading-6 text-zinc-400">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

async function AwardsBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const dbAwards = await getAwards();
  const fallbackAwards = readArray(content.items)
    .map((item, index) => {
      const value = asRecord(item);

      return {
        id: `fallback-award-${index}`,
        title: readString(value.title),
        description: readString(value.description),
        prize: readString(value.prize),
      };
    })
    .filter((item) => item.title && item.description);
  const awards = dbAwards.length
    ? dbAwards
    : fallbackAwards.length
      ? fallbackAwards
      : programValueItems.map((item, index) => ({
          id: `program-value-${index}`,
          title: item.title,
          description: item.description,
          prize: "",
        }));

  return (
    <section
      className="relative overflow-hidden section-padding text-white"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #161616 50%, #0D0D0D 100%)",
      }}
    >
      {/* Ambient gold glow — top left */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 65%)",
        }}
      />
      {/* Ambient gold glow — bottom right */}
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.1]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 65%)",
        }}
      />

      {/* Top decorative gold line */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Section header — centred */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37] opacity-70" />
            <p
              className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "#D4AF37" }}
            >
              Ý nghĩa & Giá trị
            </p>
            <div className="h-px w-8 bg-[#D4AF37] opacity-70" />
          </div>
          <h2 className="font-cinzel text-gold-metallic text-3xl font-black uppercase leading-tight tracking-wide sm:text-4xl md:text-5xl">
            {block.title || "Ý nghĩa & Giá trị nhận được"}
          </h2>
          {/* Gold ornament under heading */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div
              className="h-[1.5px] w-12"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37)",
              }}
            />
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M6 0l1.2 3.6H12l-3 2.4 1.2 3.6L6 7.2l-4.2 2.4 1.2-3.6-3-2.4h4.8z"
                fill="#D4AF37"
              />
            </svg>
            <div
              className="h-[1.5px] w-12"
              style={{
                background: "linear-gradient(90deg, #D4AF37, transparent)",
              }}
            />
          </div>
        </div>

        {/* Cards grid */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {awards.map((award) => {
            const title = award.title.toLowerCase();
            const Icon = title.includes("văn hóa")
              ? HandHeart
              : title.includes("đào tạo")
                ? BookOpenCheck
                : title.includes("tỏa sáng")
                  ? Sparkles
                  : title.includes("giải thưởng")
                    ? Award
                    : Gem;

            return (
              <article
                key={award.id}
                className="group relative flex min-h-[300px] flex-col items-center justify-between overflow-hidden rounded-2xl p-8 text-center glass-card glass-card-hover"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[#D4AF37]/25 bg-gradient-to-br from-[#D4AF37]/20 to-[#D4AF37]/5 text-[#D4AF37] transition-all duration-500 group-hover:scale-110 group-hover:border-[#D4AF37]/55 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.35)]">
                  <Icon className="h-7 w-7 drop-shadow-[0_0_8px_rgba(212,175,55,0.6)]" />
                </div>

                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="mt-6 font-cinzel text-lg font-bold uppercase tracking-wider text-white transition-colors duration-300 group-hover:text-[#D4AF37]">
                    {award.title}
                  </h3>
                  <p className="mt-4 font-sans text-sm leading-relaxed text-zinc-300">
                    {award.description}
                  </p>
                </div>

                {/* Prize value — gold accent */}
                {award.prize ? (
                  <div className="mt-6">
                    <span className="inline-block rounded-full border border-[#D4AF37]/35 bg-[#D4AF37]/10 px-4 py-1.5 font-cinzel text-xs font-semibold tracking-wider text-[#D4AF37] shadow-[0_0_12px_rgba(212,175,55,0.15)]">
                      {award.prize}
                    </span>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>

      {/* Bottom decorative gold line */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
        <div className="h-px w-40 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

async function NewsBlock({ block }: { block: Block }) {
  return (
    <section
      className="relative overflow-hidden section-padding text-white"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #161616 55%, #0D0D0D 100%)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.28) 0%, transparent 65%)",
        }}
      />
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-30">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Header */}
        <div className="mb-10">
          <div>
            <div className="mb-3 flex items-center gap-3">
              <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
              <p
                className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
                style={{ color: "#D4AF37" }}
              >
                Tin tức
              </p>
            </div>
            <h2 className="max-w-2xl font-cinzel text-gold-metallic text-3xl font-black uppercase leading-tight tracking-wide md:text-5xl">
              {block.title || "Tin tức mới nhất"}
            </h2>
          </div>
        </div>

        <div className="rounded-2xl border border-[#D4AF37]/16 bg-white/[0.03] px-6 py-12 text-center shadow-[0_18px_48px_rgba(0,0,0,0.35)] backdrop-blur-sm">
          <p className="font-sans text-base font-semibold text-zinc-300 md:text-lg">
            Nội dung đang cập nhật
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-25">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

async function PartnersBlock({ block }: { block: Block }) {
  const partners = await getPartners();

  return (
    <section
      className="relative overflow-hidden py-16 md:py-20"
      style={{
        background: "linear-gradient(180deg, #0D0D0D 0%, #161616 100%)",
      }}
    >
      {/* Ambient gold glow — centre */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[400px] w-[700px] opacity-[0.1] rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.4) 0%, transparent 65%)",
        }}
      />

      {/* Top gold accent line */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Centered header */}
        <div className="mb-10 text-center">
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
            <p
              className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "#D4AF37" }}
            >
              Đối tác
            </p>
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
          </div>
          <h2 className="font-cinzel text-gold-metallic text-2xl font-black uppercase leading-tight tracking-wide md:text-4xl">
            {block.title || "Đối tác đồng hành"}
          </h2>
          {/* Gold ornament */}
          <div className="mt-5 flex items-center justify-center gap-3">
            <div
              className="h-[1.5px] w-10"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37)",
              }}
            />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
              <path
                d="M4 0l.8 2.4H8l-2 1.6.8 2.4L4 4.8l-2.8 1.6.8-2.4-2-1.6h3.2z"
                fill="#D4AF37"
              />
            </svg>
            <div
              className="h-[1.5px] w-10"
              style={{
                background: "linear-gradient(90deg, #D4AF37, transparent)",
              }}
            />
          </div>
        </div>
      </div>

      {/* Full-width marquee (outside container for edge-to-edge scroll) */}
      <div className="relative z-10 mt-2">
        <PartnerMarquee partners={partners} />
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

function VideoBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const description = readString(content.description);
  const embedUrl = readString(content.embedUrl);
  const videoSrc =
    readString(content.videoUrl) ||
    readString(content.src) ||
    defaultAssets.introVideo;

  return (
    <section
      className="relative overflow-hidden section-padding text-white"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #161616 55%, #0D0D0D 100%)",
      }}
    >
      {/* Ambient gold glow — top-right */}
      <div
        className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.16]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.32) 0%, transparent 65%)",
        }}
      />
      {/* Ambient gold glow — bottom-left */}
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 h-[600px] w-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.22) 0%, transparent 65%)",
        }}
      />

      {/* Top gold accent line */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* ── Centered header ── */}
        <div
          className="mx-auto mb-12 max-w-2xl text-center animate-hero-fade-in"
          style={{ animationDelay: "0ms" }}
        >
          {/* Gold eyebrow */}
          <div className="mb-4 flex items-center justify-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
            <p
              className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "#D4AF37" }}
            >
              Video
            </p>
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
          </div>

          {/* Title */}
          <h2 className="font-cinzel text-gold-metallic text-3xl font-black uppercase leading-tight tracking-wide md:text-5xl">
            {block.title || "Video sự kiện"}
          </h2>

          {/* Gold ornament divider */}
          <div className="mt-6 flex items-center justify-center gap-3">
            <div
              className="h-[1.5px] w-12"
              style={{
                background: "linear-gradient(90deg, transparent, #D4AF37)",
              }}
            />
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path
                d="M5 0l1 3H10l-2.5 2 1 3L5 6.5 1.5 8l1-3L0 3h4z"
                fill="#D4AF37"
              />
            </svg>
            <div
              className="h-[1.5px] w-12"
              style={{
                background: "linear-gradient(90deg, #D4AF37, transparent)",
              }}
            />
          </div>

          {/* Description */}
          {description ? (
            <p className="mt-6 font-sans text-sm md:text-base leading-relaxed text-zinc-300">
              {description}
            </p>
          ) : null}
        </div>

        {/* ── Video container ── */}
        <div
          className="animate-hero-fade-in mx-auto max-w-4xl relative"
          style={{ animationDelay: "200ms" }}
        >
          {/* Gold corner accents */}
          <div
            className="absolute -left-3 -top-3 h-12 w-12 rounded-tl-2xl z-10"
            style={{
              border: "1.5px solid rgba(212,175,55,0.45)",
              borderRight: "none",
              borderBottom: "none",
            }}
          />
          <div
            className="absolute -bottom-3 -right-3 h-12 w-12 rounded-br-2xl z-10"
            style={{
              border: "1.5px solid rgba(212,175,55,0.45)",
              borderLeft: "none",
              borderTop: "none",
            }}
          />

          <div
            className="relative aspect-video w-full overflow-hidden rounded-3xl bg-black"
            style={{
              boxShadow:
                "0 0 0 1px rgba(212,175,55,0.15), 0 32px 80px rgba(0,0,0,0.7), 0 0 60px rgba(212,175,55,0.08)",
            }}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={block.title || "Video sự kiện"}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                className="h-full w-full object-cover"
                controls
                preload="metadata"
              >
                <source src={videoSrc} type="video/mp4" />
              </video>
            )}
          </div>
        </div>
      </div>

      {/* Bottom gold accent line */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

function GalleryBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const imagesFromData = [
    ...(block.media?.url ? [block.media.url] : []),
    ...readArray(content.images),
  ]
    .map((image) =>
      typeof image === "string" ? image : readString(asRecord(image).url),
    )
    .filter((image) => image && isLocalAsset(image));
  const images = (imagesFromData.length ? imagesFromData : fallbackGalleryImages).slice(0, 2);

  return (
    <section
      className="relative overflow-hidden section-padding text-white"
      style={{
        background:
          "linear-gradient(180deg, #0D0D0D 0%, #161616 55%, #0D0D0D 100%)",
      }}
    >
      {/* Ambient gold glow — top-left */}
      <div
        className="pointer-events-none absolute -left-48 -top-48 h-[600px] w-[600px] rounded-full opacity-[0.15]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.3) 0%, transparent 65%)",
        }}
      />
      {/* Ambient gold glow — bottom-right */}
      <div
        className="pointer-events-none absolute -bottom-48 -right-48 h-[600px] w-[600px] rounded-full opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 65%)",
        }}
      />
      {/* Top gold line */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-40">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="mb-10">
          <div className="mb-4 flex items-center gap-3">
            <div className="h-px w-8 bg-[#D4AF37] opacity-60" />
            <p
              className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
              style={{ color: "#D4AF37" }}
            >
              Thư viện ảnh
            </p>
          </div>
          <h2 className="font-cinzel text-gold-metallic text-3xl font-black uppercase leading-tight tracking-wide md:text-5xl">
            {block.title || "Thư viện ảnh"}
          </h2>
          <div
            className="mt-5 h-[1.5px] w-16"
            style={{
              background: "linear-gradient(90deg, #D4AF37, transparent)",
            }}
          />
        </div>

        <GalleryGrid images={images} title={block.title || "Thư viện ảnh"} />
      </div>

      {/* Bottom gold line */}
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
        <div className="h-[1px] w-48 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
    </section>
  );
}

function CtaBlock({ block }: { block: Block }) {
  const content = asRecord(block.content);
  const body = readString(content.body || content.description);
  const cta = asRecord(content.cta);
  const ctaLabel = readString(cta.label, "Xem thêm");
  const ctaHref = readString(cta.href, "/");

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32 text-white"
      style={{
        background:
          "linear-gradient(180deg, #0d0d0d 0%, #161616 50%, #0d0d0d 100%)",
      }}
    >
      {/* Rich gold radial glow — centre */}
      <div
        className="pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 mx-auto h-[500px] w-[900px] opacity-25 rounded-full"
        style={{
          background:
            "radial-gradient(ellipse, rgba(212,175,55,0.45) 0%, transparent 65%)",
        }}
      />

      {/* Top + bottom gold lines */}
      <div className="absolute inset-x-0 top-0 flex justify-center opacity-50">
        <div className="h-[1px] w-56 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>
      <div className="absolute inset-x-0 bottom-0 flex justify-center opacity-30">
        <div className="h-[1px] w-56 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />
      </div>

      <div className="container relative z-10 flex flex-col items-center text-center">
        {/* Eyebrow */}
        <div className="mb-6 flex items-center gap-3">
          <div className="h-px w-10 bg-[#D4AF37] opacity-60" />
          <p
            className="font-cinzel text-[11px] font-semibold uppercase tracking-[0.38em]"
            style={{ color: "#D4AF37" }}
          >
            Hành động ngay
          </p>
          <div className="h-px w-10 bg-[#D4AF37] opacity-60" />
        </div>

        {/* Title */}
        <h2 className="font-cinzel text-gold-metallic text-4xl font-black uppercase leading-tight tracking-wide sm:text-5xl md:text-6xl lg:text-7xl">
          {block.title || "Sẵn sàng tham gia?"}
        </h2>

        {/* Body in sans font */}
        {body ? (
          <p className="mx-auto mt-6 max-w-xl font-sans text-sm leading-relaxed text-zinc-300 md:text-base">
            {body}
          </p>
        ) : null}

        {/* Gold ornament */}
        <div className="mt-8 flex items-center gap-3">
          <div
            className="h-[1.5px] w-12"
            style={{
              background: "linear-gradient(90deg, transparent, #D4AF37)",
            }}
          />
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M5 0l1 3H10l-2.5 2 1 3L5 6.5 1.5 8l1-3L0 3h4z"
              fill="#D4AF37"
            />
          </svg>
          <div
            className="h-[1.5px] w-12"
            style={{
              background: "linear-gradient(90deg, #D4AF37, transparent)",
            }}
          />
        </div>

        {/* CTA Button */}
        <div className="mt-10">
          <a
            href={ctaHref}
            className="group relative inline-flex items-center overflow-hidden rounded-none px-12 py-4 font-cinzel text-sm font-bold uppercase tracking-[0.25em] text-black transition-all duration-500 hover:scale-105 hover:shadow-[0_0_48px_rgba(212,175,55,0.65)]"
            style={{
              background:
                "linear-gradient(135deg, #fcf6ba 0%, #D4AF37 50%, #aa771c 100%)",
            }}
          >
            {/* Shimmer sweep on hover */}
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{ctaLabel}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
