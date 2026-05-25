import Link from "next/link";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable, AdminTableCell } from "@/components/admin/admin-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";

function publishStatusLabel(status: string) {
  return status === "PUBLISHED" ? "Đã xuất bản" : "Bản nháp";
}

export default async function AdminDashboardPage() {
  const [posts, users, recentPosts] = await Promise.all([
    db.post.count(),
    db.user.count(),
    db.post.findMany({
      take: 5,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        createdAt: true
      }
    })
  ]);

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <AdminPageHeader
          title="Tổng quan"
          description="Xem nhanh dữ liệu nội dung và quản trị."
        />
        <ButtonLink href="/" variant="outline">
          Xem website
        </ButtonLink>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {[
          ["Bài viết", posts, "/admin/posts"],
          ["Người dùng", users, "/admin"]
        ].map(([label, count, href]) => (
          <Link key={String(label)} href={String(href)}>
            <Card className="hover:bg-background">
              <CardHeader>
                <CardTitle>{label}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-4xl font-bold text-primary">{count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid gap-3">
        <h2 className="text-lg font-semibold">Bài viết gần đây</h2>
        <AdminTable
          headers={["Tiêu đề", "Đường dẫn", "Trạng thái", "Ngày tạo"]}
          emptyMessage={recentPosts.length === 0 ? "Chưa có bài viết." : undefined}
        >
          {recentPosts.map((post) => (
            <tr key={post.id}>
              <AdminTableCell className="font-medium">{post.title}</AdminTableCell>
              <AdminTableCell>{post.slug}</AdminTableCell>
              <AdminTableCell>{publishStatusLabel(post.status)}</AdminTableCell>
              <AdminTableCell>{post.createdAt.toLocaleDateString()}</AdminTableCell>
            </tr>
          ))}
        </AdminTable>
      </div>
    </div>
  );
}
