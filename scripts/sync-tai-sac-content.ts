import { PageBlockType, Prisma, PrismaClient, PublishStatus } from "@prisma/client";
import { postBlocks, sitePageSeeds } from "./seed-content";
import {
  programBrand,
  programEligibilityBody,
  programEligibilityItems,
  programExperienceItems,
  programFormatItems,
  programHero,
  programOverviewBody,
  programValueItems
} from "../lib/program-copy";

const prisma = new PrismaClient();
const legacyProgramSlug = "hoa-hau-du-lich-viet-nam-2026";
const currentProgramSlug = "tai-sac-viet-nam-2026";
const legacyContactSlug = "lien-he-quang-cao";
const currentContactSlug = "lien-he";

async function upsertHomeBlock(data: {
  key: string;
  type: PageBlockType;
  title: string;
  content: Prisma.InputJsonObject;
  order: number;
  isActive?: boolean;
}) {
  const homeBlocks = await prisma.pageBlock.findMany({
    where: { pageKey: "home" },
    orderBy: { order: "asc" }
  });
  const existing =
    homeBlocks.find((block) => {
      const content = block.content;
      return (
        content &&
        typeof content === "object" &&
        !Array.isArray(content) &&
        "blockKey" in content &&
        content.blockKey === data.key
      );
    }) ||
    homeBlocks.find((block) => {
      const content = block.content;
      const hasManagedKey =
        content &&
        typeof content === "object" &&
        !Array.isArray(content) &&
        "blockKey" in content;

      return block.type === data.type && !hasManagedKey;
    });

  const content = {
    ...data.content,
    blockKey: data.key
  };

  if (existing) {
    await prisma.pageBlock.update({
      where: { id: existing.id },
      data: {
        title: data.title,
        content,
        order: data.order,
        isActive: data.isActive ?? true
      }
    });
    return;
  }

  await prisma.pageBlock.create({
    data: {
      pageKey: "home",
      type: data.type,
      title: data.title,
      content,
      order: data.order,
      isActive: data.isActive ?? true
    }
  });
}

async function syncBrandAndNavigation() {
  await prisma.siteSetting.upsert({
    where: { key: "brand" },
    update: {
      value: {
        name: programBrand.name,
        tagline: programBrand.tagline
      }
    },
    create: {
      key: "brand",
      value: {
        name: programBrand.name,
        tagline: programBrand.tagline
      }
    }
  });

  await prisma.navigationItem.updateMany({
    where: { href: `/${legacyProgramSlug}` },
    data: { label: programBrand.name, href: `/${currentProgramSlug}` }
  });
}

async function syncPages() {
  const [
    legacyProgramPage,
    currentProgramPage,
    legacyContactPage,
    currentContactPage
  ] = await Promise.all([
    prisma.page.findUnique({ where: { slug: legacyProgramSlug } }),
    prisma.page.findUnique({ where: { slug: currentProgramSlug } }),
    prisma.page.findUnique({ where: { slug: legacyContactSlug } }),
    prisma.page.findUnique({ where: { slug: currentContactSlug } })
  ]);

  if (legacyProgramPage && currentProgramPage) {
    await prisma.page.delete({ where: { id: legacyProgramPage.id } });
  } else if (legacyProgramPage) {
    await prisma.page.update({
      where: { id: legacyProgramPage.id },
      data: { slug: currentProgramSlug }
    });
  }

  if (legacyContactPage && currentContactPage) {
    await prisma.page.delete({ where: { id: legacyContactPage.id } });
  } else if (legacyContactPage) {
    await prisma.page.update({
      where: { id: legacyContactPage.id },
      data: { slug: currentContactSlug }
    });
  }

  for (const page of sitePageSeeds) {
    await prisma.page.upsert({
      where: { slug: page.slug },
      update: {
        title: page.title,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
        blocks: page.blocks
      },
      create: {
        title: page.title,
        slug: page.slug,
        seoTitle: page.seoTitle,
        seoDescription: page.seoDescription,
        status: PublishStatus.PUBLISHED,
        publishedAt: new Date(),
        blocks: page.blocks
      }
    });
  }
}

async function syncHomeBlocks() {
  await upsertHomeBlock({
    key: "home-hero",
    type: PageBlockType.HERO,
    title: programHero.title,
    content: {
      eyebrow: programHero.eyebrow,
      subtitle: programHero.subtitle,
      cta: { label: "Đăng ký ngay", href: "/register" },
      cta2: { label: "Sơ lược chương trình", href: "/about" }
    },
    order: 1
  });

  await upsertHomeBlock({
    key: "home-countdown",
    type: PageBlockType.COUNTDOWN,
    title: "Đếm ngược đến hạn đăng ký",
    content: {
      eyebrow: "Hạn đăng ký",
      targetDate: "2026-06-25T23:59:59+07:00",
      description: "Thời hạn đăng ký dự thi: 25/06/2026."
    },
    order: 2
  });

  await upsertHomeBlock({
    key: "home-overview",
    type: PageBlockType.RICH_TEXT,
    title: "Sơ lược chương trình",
    content: {
      body: programOverviewBody
    },
    order: 3
  });

  await upsertHomeBlock({
    key: "home-experience",
    type: PageBlockType.RICH_TEXT,
    title: "Không gian trải nghiệm văn hóa",
    content: {
      body: "Thí sinh được trực tiếp dấn thân vào các không gian văn hóa đặc trưng, nơi bản sắc truyền thống được kết nối với tư duy và kỹ năng hiện đại.",
      items: programExperienceItems
    },
    order: 4
  });

  await upsertHomeBlock({
    key: "home-schedule",
    type: PageBlockType.SCHEDULE,
    title: "Format và lịch trình chương trình",
    content: {
      source: "schedules",
      limit: 6
    },
    order: 5
  });

  await upsertHomeBlock({
    key: "home-values",
    type: PageBlockType.AWARDS,
    title: "Ý nghĩa và giá trị nhận được",
    content: {
      items: programValueItems
    },
    order: 6
  });

  await upsertHomeBlock({
    key: "home-eligibility",
    type: PageBlockType.RICH_TEXT,
    title: "Đối tượng dự thi",
    content: {
      body: programEligibilityBody,
      items: programEligibilityItems
    },
    order: 7
  });

  await upsertHomeBlock({
    key: "home-news",
    type: PageBlockType.NEWS,
    title: "Tin tức mới nhất",
    content: {
      limit: 3
    },
    order: 8
  });

  await upsertHomeBlock({
    key: "home-partners",
    type: PageBlockType.PARTNERS,
    title: "Đối tác đồng hành",
    content: {
      source: "partners"
    },
    order: 9
  });

  await upsertHomeBlock({
    key: "home-video",
    type: PageBlockType.VIDEO,
    title: "Video chương trình",
    content: {
      description: "Khu vực giới thiệu trailer, họp báo và các video truyền thông chính thức của Tài Sắc Việt Nam."
    },
    order: 10
  });

  await upsertHomeBlock({
    key: "home-gallery",
    type: PageBlockType.GALLERY,
    title: "Thư viện hình ảnh",
    content: {
      images: [
        "/assets/banners/banner.jpg",
        "/assets/banners/luxury_hero.png"
      ]
    },
    order: 11
  });

  await upsertHomeBlock({
    key: "home-cta",
    type: PageBlockType.CTA,
    title: "Sẵn sàng tham gia Tài Sắc Việt Nam 2026?",
    content: {
      body: "Gửi hồ sơ dự thi để ban tổ chức tiếp nhận và phản hồi trong giai đoạn tuyển sinh toàn quốc.",
      cta: { label: "Đăng ký ngay", href: "/dang-ky-du-thi" }
    },
    order: 12
  });
}

async function syncReferenceData() {
  await prisma.schedule.updateMany({
    data: {
      isFeatured: false
    }
  });

  const schedules = [
    {
      date: new Date("2026-05-26T00:00:00.000Z"),
      time: "09:00",
      title: programFormatItems[0].title,
      description: "Mở đơn tiếp nhận hồ sơ thí sinh nữ công dân Việt Nam từ 18 đến 28 tuổi.",
      order: 1,
      isFeatured: true
    },
    {
      date: new Date("2026-06-20T00:00:00.000Z"),
      time: "14:00",
      title: programFormatItems[1].title,
      description: programFormatItems[1].description,
      order: 2,
      isFeatured: true
    },
    {
      date: new Date("2026-07-10T00:00:00.000Z"),
      time: "09:00",
      title: programFormatItems[2].title,
      description: programFormatItems[2].description,
      order: 3,
      isFeatured: true
    },
    {
      date: new Date("2026-07-25T00:00:00.000Z"),
      time: "20:00",
      title: programFormatItems[3].title,
      description: programFormatItems[3].description,
      order: 4,
      isFeatured: true
    },
    {
      date: new Date("2026-08-22T00:00:00.000Z"),
      time: "19:30",
      title: programFormatItems[4].title,
      description: programFormatItems[4].description,
      order: 5,
      isFeatured: true
    },
    {
      date: new Date("2026-09-12T00:00:00.000Z"),
      time: "19:30",
      title: programFormatItems[5].title,
      description: programFormatItems[5].description,
      order: 6,
      isFeatured: true
    }
  ];

  for (const item of schedules) {
    const existing = await prisma.schedule.findFirst({ where: { order: item.order } });

    if (existing) {
      await prisma.schedule.update({ where: { id: existing.id }, data: item });
    } else {
      await prisma.schedule.create({ data: item });
    }
  }

  const awards = programValueItems.map((item, index) => ({
    title: item.title,
    description: item.description,
    prize:
      index === 0
        ? "Vai trò lan tỏa giá trị văn hóa"
        : index === 1
          ? "Huấn luyện bởi chuyên gia"
          : index === 2
            ? "Quảng bá trên truyền hình, báo chí và mạng xã hội"
            : "Danh hiệu và cơ hội đồng hành chuyên nghiệp",
    order: index + 1
  }));

  for (const item of awards) {
    const existing = await prisma.award.findFirst({ where: { order: item.order } });

    if (existing) {
      await prisma.award.update({ where: { id: existing.id }, data: item });
    } else {
      await prisma.award.create({ data: item });
    }
  }
}

async function syncPosts() {
  const posts = [
    {
      title: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
      slug: "tai-sac-viet-nam-2026-mo-don-tuyen-sinh",
      excerpt: "Hành trình tìm kiếm gương mặt phụ nữ Việt Nam thế hệ mới chính thức bắt đầu.",
      coverImage: null,
      thumbnail: null,
      seoTitle: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
      seoDescription: "Thông tin khởi động tuyển sinh và sơ lược chương trình.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date("2026-05-26T09:00:00.000Z"),
      blocks: postBlocks
    }
  ];

  for (const post of posts) {
    await prisma.post.upsert({
      where: { slug: post.slug },
      update: post,
      create: post
    });
  }

  await prisma.post.updateMany({
    where: {
      slug: {
        in: [
          "official-launch-announcement",
          "tai-sac-viet-nam-2026-chinh-thuc-khoi-dong",
          "tuyen-sinh-toan-quoc-tai-sac-viet-nam-2026"
        ]
      }
    },
    data: {
      status: PublishStatus.DRAFT
    }
  });

  await prisma.post.updateMany({
    where: {
      slug: "cong-bo-doi-tac-dong-hanh-mua-thi-2026"
    },
    data: {
      title: "Công bố đối tác đồng hành Tài Sắc Việt Nam 2026",
      excerpt: "Các thương hiệu, đơn vị truyền thông, không gian văn hóa và làng nghề đồng hành cùng hành trình lan tỏa giá trị Việt.",
      seoTitle: "Công bố đối tác đồng hành Tài Sắc Việt Nam 2026",
      seoDescription: "Thông tin đối tác đồng hành cùng chương trình Tài Sắc Việt Nam 2026."
    }
  });
}

async function main() {
  await syncBrandAndNavigation();
  await syncPages();
  await syncHomeBlocks();
  await syncReferenceData();
  await syncPosts();
  console.log("Đã đồng bộ nội dung Tài Sắc Việt Nam 2026 vào database.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
