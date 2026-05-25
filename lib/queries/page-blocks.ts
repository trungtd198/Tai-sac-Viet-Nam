import { PageBlockType } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { defaultAssets } from "@/lib/default-assets";
import {
  programEligibilityItems,
  programExperienceItems,
  programFormatItems,
  programHero,
  programOverviewBody,
  programValueItems
} from "@/lib/program-copy";

function getFallbackHomeBlocks() {
  const now = new Date();

  return [
    {
      id: "fallback-home-hero",
      pageKey: "home",
      type: PageBlockType.HERO,
      title: programHero.title,
      content: {
        eyebrow: programHero.eyebrow,
        subtitle: programHero.subtitle,
        image: defaultAssets.heroBanner,
        cta: { label: "Đăng ký ngay", href: "/dang-ky-du-thi" },
        cta2: { label: "Sơ lược chương trình", href: "#so-luoc" }
      },
      order: 1,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-countdown",
      pageKey: "home",
      type: PageBlockType.COUNTDOWN,
      title: "Đếm ngược đến hạn đăng ký",
      content: {
        eyebrow: "Hạn đăng ký",
        targetDate: "2026-06-25T23:59:59+07:00",
        description: "Thời hạn đăng ký dự thi: 25/06/2026."
      },
      order: 2,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-overview",
      pageKey: "home",
      type: PageBlockType.RICH_TEXT,
      title: "Sơ lược chương trình",
      content: {
        blockKey: "home-overview",
        body: programOverviewBody,
        image: defaultAssets.heroArt
      },
      order: 3,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-experience",
      pageKey: "home",
      type: PageBlockType.RICH_TEXT,
      title: "Không gian trải nghiệm văn hóa",
      content: {
        blockKey: "home-experience",
        description: "Các thử thách được thiết kế để thí sinh trực tiếp chạm vào chiều sâu văn hóa Việt trong một ngôn ngữ hiện đại.",
        items: programExperienceItems
      },
      order: 4,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-schedule",
      pageKey: "home",
      type: PageBlockType.SCHEDULE,
      title: "Lịch trình chương trình",
      content: { limit: 4, items: programFormatItems },
      order: 5,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-awards",
      pageKey: "home",
      type: PageBlockType.AWARDS,
      title: "Ý nghĩa và giá trị nhận được",
      content: { items: programValueItems },
      order: 6,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-partners",
      pageKey: "home",
      type: PageBlockType.PARTNERS,
      title: "Đối tác đồng hành",
      content: {},
      order: 7,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-gallery",
      pageKey: "home",
      type: PageBlockType.GALLERY,
      title: "Thư viện sự kiện",
      content: {
        images: [
          defaultAssets.heroBanner,
          defaultAssets.heroArt
        ]
      },
      order: 8,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    },
    {
      id: "fallback-home-cta",
      pageKey: "home",
      type: PageBlockType.CTA,
      title: "Sẵn sàng tham gia Tài Sắc Việt Nam 2026?",
      content: {
        description: "Gửi hồ sơ để ban tổ chức tiếp nhận, xét duyệt và liên hệ trong giai đoạn tuyển sinh toàn quốc.",
        cta: { label: "Đăng ký ngay", href: "/dang-ky-du-thi" }
      },
      order: 9,
      isActive: true,
      mediaId: null,
      media: null,
      createdAt: now,
      updatedAt: now
    }
  ];
}

export async function getActivePageBlocks(pageKey = "home") {
  try {
    return await prisma.pageBlock.findMany({
      where: {
        pageKey,
        isActive: true
      },
      orderBy: {
        order: "asc"
      },
      include: {
        media: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch active page blocks", error);
    if (pageKey === "home") return getFallbackHomeBlocks();
    return [];
  }
}

export async function getAdminPageBlocks(pageKey = "home") {
  try {
    return await prisma.pageBlock.findMany({
      where: {
        pageKey
      },
      orderBy: {
        order: "asc"
      },
      include: {
        media: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch admin page blocks", error);
    return [];
  }
}
