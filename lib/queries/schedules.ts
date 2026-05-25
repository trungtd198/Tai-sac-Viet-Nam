import { prisma } from "@/lib/prisma";

export async function getSchedules() {
  try {
    return await prisma.schedule.findMany({
      orderBy: [{ date: "asc" }, { order: "asc" }, { time: "asc" }]
    });
  } catch (error) {
    console.error("Failed to fetch schedules", error);
    return [];
  }
}

export async function getFeaturedSchedules() {
  try {
    return await prisma.schedule.findMany({
      where: {
        isFeatured: true
      },
      orderBy: [{ date: "asc" }, { order: "asc" }, { time: "asc" }]
    });
  } catch (error) {
    console.error("Failed to fetch featured schedules", error);
    return [];
  }
}
