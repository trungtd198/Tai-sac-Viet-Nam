import { PageBlockType, PrismaClient } from "@prisma/client";
import { programHero, programOverviewBody } from "../lib/program-copy";

const prisma = new PrismaClient();

async function main() {
  const existingBlocks = await prisma.pageBlock.count({
    where: { pageKey: "home" }
  });

  if (existingBlocks > 0) {
    console.log(`Các khối trang chủ đã tồn tại: ${existingBlocks}`);
    return;
  }

  const scheduleCount = await prisma.schedule.count();
  if (scheduleCount === 0) {
    await prisma.schedule.createMany({
      data: [
        {
          date: new Date("2026-05-26T00:00:00.000Z"),
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
  }

  const partnerCount = await prisma.partner.count();
  if (partnerCount === 0) {
    await prisma.partner.createMany({
      data: [
        {
          name: "Heritage Media",
          tier: "Nhà tài trợ vàng",
          order: 1,
          isActive: true
        },
        {
          name: "Lotus Hotels",
          tier: "Đối tác",
          order: 2,
          isActive: true
        },
        {
          name: "Đối tác làng nghề",
          tier: "Đối tác",
          order: 3,
          isActive: true
        }
      ]
    });
  }

  await prisma.pageBlock.createMany({
    data: [
      {
        pageKey: "home",
        type: PageBlockType.HERO,
        title: programHero.title,
        content: {
          subtitle: programHero.subtitle,
          image:
            "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
          cta: { label: "Đăng ký ngay", href: "/register" }
        },
        order: 1,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.RICH_TEXT,
        title: "Sơ lược chương trình",
        content: {
          body: programOverviewBody
        },
        order: 2,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.SCHEDULE,
        title: "Lịch trình chương trình",
        content: { source: "schedules", limit: 3 },
        order: 3,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.PARTNERS,
        title: "Đối tác",
        content: { source: "partners" },
        order: 4,
        isActive: true
      },
      {
        pageKey: "home",
        type: PageBlockType.GALLERY,
        title: "Thư viện ảnh",
        content: {
          images: [
            "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?auto=format&fit=crop&w=900&q=80",
            "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80"
          ]
        },
        order: 5,
        isActive: true
      }
    ]
  });

  console.log("Đã tạo khối mặc định cho trang chủ.");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
