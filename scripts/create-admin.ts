import { PrismaClient, UserRole } from "@prisma/client";
import { hashPassword } from "../lib/password";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@event.vn";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("Cần cấu hình ADMIN_PASSWORD trong .env");
  }

  await prisma.user.upsert({
    where: { email },
    update: {
      role: UserRole.ADMIN,
      passwordHash: hashPassword(password)
    },
    create: {
      name: "Quản trị sự kiện",
      email,
      role: UserRole.ADMIN,
      passwordHash: hashPassword(password)
    }
  });

  console.log(`Tài khoản admin đã sẵn sàng: ${email}`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
