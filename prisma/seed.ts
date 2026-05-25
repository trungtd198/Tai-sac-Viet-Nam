import { MediaType, PageBlockType, PrismaClient, PublishStatus, RegistrationStatus, UserRole } from "@prisma/client";
import { homeBlocks, aboutBlocks, scheduleBlocks, registrationBlocks, postBlocks, sitePageSeeds } from "../scripts/seed-content";
import { hashPassword } from "../lib/password";
import {
  programBrand,
  programHero,
  programOverviewBody,
  programValueItems
} from "../lib/program-copy";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = process.env.ADMIN_EMAIL || "admin@event.vn";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin123";

  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: {
      name: "Quản trị sự kiện",
      passwordHash: hashPassword(adminPassword),
      role: UserRole.ADMIN
    },
    create: {
      name: "Quản trị sự kiện",
      email: adminEmail,
      passwordHash: hashPassword(adminPassword),
      role: UserRole.ADMIN
    }
  });

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

  await prisma.navigationItem.deleteMany({});
  await prisma.navigationItem.createMany({
    data: navigation.map(([label, href], order) => ({
      label,
      href,
      order,
      isActive: true
    }))
  });

  await prisma.page.upsert({
    where: { slug: "home" },
    update: {
      title: "Trang chủ",
      seoTitle: programBrand.name,
      seoDescription: "Hành trình truyền hình thực tế tôn vinh bản lĩnh, trí tuệ và tình yêu văn hóa dân tộc.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: homeBlocks
    },
    create: {
      title: "Trang chủ",
      slug: "home",
      seoTitle: programBrand.name,
      seoDescription: "Hành trình truyền hình thực tế tôn vinh bản lĩnh, trí tuệ và tình yêu văn hóa dân tộc.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: homeBlocks
    }
  });

  await prisma.page.upsert({
    where: { slug: "about" },
    update: {
      title: "Giới thiệu",
      seoTitle: `Giới thiệu ${programBrand.name}`,
      seoDescription: "Tìm hiểu sơ lược chương trình, ý nghĩa, quyền lợi và đối tượng dự thi.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: aboutBlocks
    },
    create: {
      title: "Giới thiệu",
      slug: "about",
      seoTitle: `Giới thiệu ${programBrand.name}`,
      seoDescription: "Tìm hiểu sơ lược chương trình, ý nghĩa, quyền lợi và đối tượng dự thi.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: aboutBlocks
    }
  });

  await prisma.page.upsert({
    where: { slug: "schedule" },
    update: {
      title: "Lịch trình",
      seoTitle: "Lịch trình sự kiện",
      seoDescription: "Các mốc chính của tuyển sinh, đào tạo, ghi hình và Gala Chung kết.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: scheduleBlocks
    },
    create: {
      title: "Lịch trình",
      slug: "schedule",
      seoTitle: "Lịch trình sự kiện",
      seoDescription: "Các mốc chính của tuyển sinh, đào tạo, ghi hình và Gala Chung kết.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: scheduleBlocks
    }
  });

  await prisma.page.upsert({
    where: { slug: "register" },
    update: {
      title: "Đăng ký",
      seoTitle: "Đăng ký",
      seoDescription: "Gửi hồ sơ đăng ký tham gia sự kiện.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: registrationBlocks
    },
    create: {
      title: "Đăng ký",
      slug: "register",
      seoTitle: "Đăng ký",
      seoDescription: "Gửi hồ sơ đăng ký tham gia sự kiện.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
      blocks: registrationBlocks
    }
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

  await prisma.post.upsert({
    where: { slug: "official-launch-announcement" },
    update: {
      title: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
      excerpt: "Hành trình tìm kiếm gương mặt phụ nữ Việt Nam thế hệ mới chính thức bắt đầu.",
      coverImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80",
      seoTitle: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
      seoDescription: "Thông tin khởi động tuyển sinh và sơ lược chương trình.",
      status: PublishStatus.PUBLISHED,
      author: {
        connect: { id: adminUser.id }
      },
      publishedAt: new Date("2026-05-01T09:00:00.000Z"),
      blocks: postBlocks
    },
    create: {
      title: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
      slug: "official-launch-announcement",
      excerpt: "Hành trình tìm kiếm gương mặt phụ nữ Việt Nam thế hệ mới chính thức bắt đầu.",
      coverImage: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1400&q=80",
      seoTitle: "Tài Sắc Việt Nam 2026 mở đơn tuyển sinh toàn quốc",
      seoDescription: "Thông tin khởi động tuyển sinh và sơ lược chương trình.",
      status: PublishStatus.PUBLISHED,
      author: {
        connect: { id: adminUser.id }
      },
      publishedAt: new Date("2026-05-01T09:00:00.000Z"),
      blocks: postBlocks
    }
  });

  await prisma.schedule.deleteMany({});
  await prisma.schedule.createMany({
    data: [
      {
        date: new Date("2026-08-20T00:00:00.000Z"),
        time: "09:00",
        title: "Tuyển sinh toàn quốc",
        description: "Mở đơn tiếp nhận hồ sơ thí sinh trên toàn quốc.",
        order: 1,
        isFeatured: true
      },
      {
        date: new Date("2026-08-21T00:00:00.000Z"),
        time: "14:00",
        title: "Đào tạo và ghi hình",
        description: "Thí sinh tham gia cổ phục, làng nghề, ứng xử và thử thách bản lĩnh cá nhân.",
        order: 1,
        isFeatured: true
      },
      {
        date: new Date("2026-08-22T00:00:00.000Z"),
        time: "19:30",
        title: "Gala Chung kết",
        description: "Đêm vinh danh, biểu diễn và công bố danh hiệu chính thức.",
        order: 1,
        isFeatured: true
      }
    ]
  });

  await prisma.award.deleteMany({});
  await prisma.award.createMany({
    data: [
      {
        title: "Tài Sắc Việt Nam",
        description: "Tôn vinh gương mặt hội tụ bản lĩnh, trí tuệ và khả năng lan tỏa giá trị Việt.",
        prize: "Danh hiệu cao quý và hợp đồng đồng hành",
        order: 1
      },
      {
        title: "Tinh hoa văn hóa",
        description: "Tôn vinh khả năng hiểu, kể và lan tỏa giá trị văn hóa truyền thống.",
        prize: "Xuất hiện trong chiến dịch truyền thông văn hóa",
        order: 2
      },
      {
        title: "Bản lĩnh truyền cảm hứng",
        description: "Vinh danh khả năng giao tiếp, ứng xử và kết nối cộng đồng.",
        order: 3
      }
    ]
  });

  await prisma.pageBlock.deleteMany({});
  await prisma.media.deleteMany({});
  await prisma.partner.deleteMany({});

  const partner = await prisma.partner.create({
    data: {
      name: "Heritage Media",
      website: "https://example.com",
      logoUrl: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=600&q=80",
      tier: "Nhà tài trợ vàng",
      order: 1
    }
  });

  const heroMedia = await prisma.media.create({
    data: {
      title: "Ảnh hero lễ khai mạc",
      url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      type: MediaType.IMAGE,
      altText: "Sân khấu lễ khai mạc"
    }
  });

  await prisma.media.create({
    data: {
      title: "Logo đối tác",
      url: partner.logoUrl || "",
      type: MediaType.IMAGE,
      altText: "Logo Heritage Media",
      partnerId: partner.id
    }
  });

  const seededPost = await prisma.post.findUnique({
    where: { slug: "official-launch-announcement" }
  });

  if (seededPost) {
    await prisma.media.create({
      data: {
        title: "Ảnh đại diện thông báo khởi động",
        url: seededPost.coverImage || "",
        type: MediaType.IMAGE,
        altText: seededPost.title,
        postId: seededPost.id
      }
    });
  }

  await prisma.registration.deleteMany({});
  await prisma.registration.create({
    data: {
      fullName: "Nguyễn Minh Anh",
      email: "minhanh@example.com",
      phone: "+84 900 000 000",
      address: "Thành phố Hồ Chí Minh, Việt Nam",
      imageUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80",
      description: "Mong muốn tham gia chương trình và lan tỏa giá trị văn hóa truyền thống Việt Nam.",
      status: RegistrationStatus.PENDING,
      userId: adminUser.id
    }
  });

  await prisma.pageBlock.createMany({
    data: [
      {
        pageKey: "home",
        type: PageBlockType.HERO,
        title: programHero.title,
        content: {
          subtitle: programHero.subtitle,
          cta: { label: "Đăng ký ngay", href: "/register" }
        },
        order: 1,
        mediaId: heroMedia.id
      },
      {
        pageKey: "home",
        type: PageBlockType.RICH_TEXT,
        title: "Sơ lược chương trình",
        content: {
          body: programOverviewBody
        },
        order: 2
      },
      {
        pageKey: "home",
        type: PageBlockType.AWARDS,
        title: "Ý nghĩa và giá trị nhận được",
        content: {
          items: programValueItems
        },
        order: 3
      },
      {
        pageKey: "home",
        type: PageBlockType.SCHEDULE,
        title: "Lịch trình chương trình",
        content: {
          source: "schedules",
          limit: 3
        },
        order: 4
      },
      {
        pageKey: "home",
        type: PageBlockType.PARTNERS,
        title: "Đối tác",
        content: {
          source: "partners",
          tier: "Nhà tài trợ vàng"
        },
        order: 5
      },
      {
        pageKey: "home",
        type: PageBlockType.GALLERY,
        title: "Thư viện sự kiện",
        content: {
          images: [
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
          ]
        },
        order: 6
      }
    ]
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
