import type { Metadata } from "next";
import { requireAdmin } from "@/lib/auth";
import { AdminShell } from "@/components/admin/admin-shell";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Quản trị",
  robots: {
    index: false,
    follow: false
  }
};

export default async function CmsLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
