import { prisma } from "@/lib/prisma";

export async function getAwards() {
  try {
    return await prisma.award.findMany({
      where: { isActive: true },
      orderBy: { order: "asc" }
    });
  } catch (error) {
    console.error("Failed to fetch awards", error);
    return [];
  }
}
