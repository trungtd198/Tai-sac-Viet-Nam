import { PageBlockType, PrismaClient, PublishStatus } from "@prisma/client";
import { postBlocks, sitePageSeeds } from "./seed-content";
import { programBrand, programHero, programOverviewBody } from "../lib/program-copy";

const prisma = new PrismaClient();

const navigation = [
  ["Trang chủ", "/"],
  ["Đăng ký dự thi", "/dang-ky-du-thi"],
  ["Lịch trình", "/lich-trinh"],
  [programBrand.name, "/tai-sac-viet-nam-2026"],
  ["Ứng viên", "/ung-vien"],
  ["Tin tức", "/tin-tuc"],
  ["Đặt vé", "/dat-ve"],
  ["Đối tác", "/doi-tac"]
];

async function ensureReferenceData() {
  const [scheduleCount, awardCount, partnerCount] = await Promise.all([
    prisma.schedule.count(),
    prisma.award.count(),
    prisma.partner.count()
  ]);

  if (scheduleCount === 0) {
    await prisma.schedule.createMany({
      data: [
        {
          date: new Date("2026-05-26T00:00:00.000Z"),
          time: "09:00",
          title: "Tuyển sinh toàn quốc",
          description: "Công bố thông tin và tiếp nhận hồ sơ dự thi.",
          order: 1,
          isFeatured: true
        },
        {
          date: new Date("2026-06-20T00:00:00.000Z"),
          time: "14:00",
          title: "Sơ khảo ba miền",
          description: "Gặp gỡ thí sinh tại miền Bắc, miền Trung và miền Nam.",
          order: 2,
          isFeatured: true
        },
        {
          date: new Date("2026-08-22T00:00:00.000Z"),
          time: "19:30",
          title: "Đêm chung kết",
          description: "Trình diễn sân khấu, ứng xử và công bố danh hiệu.",
          order: 3,
          isFeatured: true
        }
      ]
    });
  }

  if (awardCount === 0) {
    await prisma.award.createMany({
      data: [
        {
          title: "Tài Sắc Việt Nam",
          description: "Danh hiệu cao nhất dành cho gương mặt hội tụ bản lĩnh, trí tuệ và khả năng lan tỏa giá trị Việt.",
          prize: "Danh hiệu cao quý và hợp đồng đồng hành",
          order: 1
        },
        {
          title: "Tinh hoa văn hóa",
          description: "Tôn vinh khả năng hiểu, kể và lan tỏa giá trị văn hóa truyền thống.",
          prize: "Cúp chứng nhận và quyền lợi truyền thông",
          order: 2
        },
        {
          title: "Giải phụ",
          description: "Các hạng mục cổ phục, làng nghề, ứng xử, truyền thông và văn hóa.",
          prize: "Quà tặng từ nhà tài trợ",
          order: 3
        }
      ]
    });
  }

  if (partnerCount === 0) {
    await prisma.partner.createMany({
      data: [
        { name: "FPT Play", tier: "Đối tác phát sóng", order: 1, isActive: true },
        { name: "Sheraton Hanoi West", tier: "Đối tác địa điểm", order: 2, isActive: true },
        { name: "Eventista", tier: "Đối tác công nghệ", order: 3, isActive: true },
        { name: "Olwen Fine Jewelry", tier: "Nhà tài trợ vương miện", order: 4, isActive: true }
      ]
    });
  }

  const posts = [
    {
      title: "Tài Sắc Việt Nam 2026 chính thức khởi động",
      slug: "tai-sac-viet-nam-2026-chinh-thuc-khoi-dong",
      excerpt: "Hành trình tìm kiếm vẻ đẹp giao thoa giữa truyền thống và hiện đại mở cổng tuyển sinh toàn quốc.",
      thumbnail: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date("2026-05-01T09:00:00.000Z"),
      blocks: postBlocks
    },
    {
      title: "Tuyển sinh toàn quốc Tài Sắc Việt Nam 2026",
      slug: "tuyen-sinh-toan-quoc-tai-sac-viet-nam-2026",
      excerpt: "Thông tin nhận hồ sơ trực tiếp và online dành cho thí sinh trên toàn quốc.",
      thumbnail: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1400&q=80",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date("2026-05-05T09:00:00.000Z"),
      blocks: postBlocks
    },
    {
      title: "Công bố đối tác đồng hành mùa thi 2026",
      slug: "cong-bo-doi-tac-dong-hanh-mua-thi-2026",
      excerpt: "Các thương hiệu, đơn vị truyền thông, không gian văn hóa và làng nghề đồng hành cùng hành trình lan tỏa giá trị Việt.",
      thumbnail: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
      coverImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date("2026-05-10T09:00:00.000Z"),
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
}

async function seedPages() {
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

  await prisma.navigationItem.deleteMany({});
  await prisma.navigationItem.createMany({
    data: navigation.map(([label, href], order) => ({
      label,
      href,
      order,
      isActive: true
    }))
  });

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

async function seedHomeBlocks() {
  await prisma.pageBlock.deleteMany({
    where: { pageKey: "home" }
  });

  await prisma.pageBlock.createMany({
    data: [
      {
        pageKey: "home",
        type: PageBlockType.HERO,
        title: programHero.title,
        content: {
          subtitle: programHero.subtitle,
          image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80",
          cta: { label: "Đăng ký dự thi", href: "/dang-ky-du-thi" }
        },
        order: 1,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.COUNTDOWN,
        title: "Đếm ngược đến hạn đăng ký",
        content: {
          eyebrow: "Hạn đăng ký",
          targetDate: "2026-06-25T23:59:59+07:00",
          description: "Thời hạn đăng ký dự thi: 25/06/2026."
        },
        order: 2,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.RICH_TEXT,
        title: "Sơ lược chương trình",
        content: {
          body: programOverviewBody
        },
        order: 3,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.SCHEDULE,
        title: "Lịch trình chương trình",
        content: { source: "schedules", limit: 3 },
        order: 4,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.AWARDS,
        title: "Giải thưởng",
        content: {},
        order: 5,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.NEWS,
        title: "Tin tức mới nhất",
        content: { limit: 3 },
        order: 6,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.PARTNERS,
        title: "Đối tác đồng hành",
        content: { source: "partners" },
        order: 7,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.VIDEO,
        title: "Video chương trình",
        content: {
          image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1400&q=80"
        },
        order: 8,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.GALLERY,
        title: "Thư viện hình ảnh",
        content: {
          images: [
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80",
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1000&q=80"
          ]
        },
        order: 9,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.CTA,
        title: "Sẵn sàng tham gia Tài Sắc Việt Nam 2026?",
        content: {
          body: "Gửi hồ sơ dự thi để ban tổ chức tiếp nhận và phản hồi.",
          cta: { label: "Đăng ký ngay", href: "/dang-ky-du-thi" }
        },
        order: 10,
        isActive: true
      }
    ]
  });
}

async function main() {
  await ensureReferenceData();
  await seedPages();
  await seedHomeBlocks();
  console.log("Đã seed các trang công khai và khối trang chủ.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
