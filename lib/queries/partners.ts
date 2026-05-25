import { prisma } from "@/lib/prisma";

export async function getPartners() {
  try {
    return await prisma.partner.findMany({
      where: {
        isActive: true
      },
      orderBy: [{ tier: "asc" }, { order: "asc" }, { name: "asc" }],
      include: {
        media: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch partners", error);
    return [];
  }
}

export async function getPartnersByTier(tier: string) {
  try {
    return await prisma.partner.findMany({
      where: {
        tier,
        isActive: true
      },
      orderBy: [{ order: "asc" }, { name: "asc" }],
      include: {
        media: true
      }
    });
  } catch (error) {
    console.error("Failed to fetch partners by tier", error);
    return [];
  }
}
