import Link from "next/link";
import { deletePageAction } from "@/lib/admin-actions";
import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Button, ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function publishStatusLabel(status: string) {
  return status === "PUBLISHED" ? "Đã xuất bản" : "Bản nháp";
}

export default async function AdminPagesPage() {
  const pages = await db.page.findMany({
    orderBy: { updatedAt: "desc" }
  });

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Trang nội dung</h1>
          <p className="mt-1 text-sm text-muted-foreground">Trang chủ dùng đường dẫn hệ thống là home.</p>
        </div>
        <ButtonLink href="/admin/pages/new">Tạo trang</ButtonLink>
      </div>
      <div className="grid gap-3">
        {pages.map((page) => (
          <Card key={page.id} className="grid gap-4 p-4 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <Link href={`/admin/pages/${page.id}/edit`} className="font-semibold hover:text-primary">
                {page.title}
              </Link>
              <p className="mt-1 text-sm text-muted-foreground">
                /{page.slug === "home" ? "" : page.slug} - {publishStatusLabel(page.status)} - Cập nhật {formatDate(page.updatedAt)}
              </p>
            </div>
            <div className="flex gap-2">
              <ButtonLink href={`/admin/pages/${page.id}/edit`} variant="outline" size="sm">
                Sửa
              </ButtonLink>
              <form action={deletePageAction}>
                <input type="hidden" name="id" value={page.id} />
                <Button type="submit" variant="outline" size="sm">
                  Xóa
                </Button>
              </form>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
