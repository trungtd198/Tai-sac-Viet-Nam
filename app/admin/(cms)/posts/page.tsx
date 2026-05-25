import Link from "next/link";
import { deletePostAction } from "@/lib/admin-actions";
import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable, AdminTableCell } from "@/components/admin/admin-table";
import { Button, ButtonLink } from "@/components/ui/button";

function publishStatusLabel(status: string) {
  return status === "PUBLISHED" ? "Đã xuất bản" : "Bản nháp";
}

export default async function AdminPostsPage() {
  const posts = await db.post.findMany({
    orderBy: { updatedAt: "desc" },
    include: {
      author: {
        select: {
          name: true
        }
      }
    }
  });

  return (
    <div className="grid gap-6">
      <div className="flex items-center justify-between gap-4">
        <AdminPageHeader
          title="Bài viết"
          description="Quản lý tin tức, thông báo và nội dung blog."
        />
        <ButtonLink href="/admin/posts/new">Tạo bài viết</ButtonLink>
      </div>

      <AdminTable
        headers={["Tiêu đề", "Tác giả", "Trạng thái", "Cập nhật", "Thao tác"]}
        emptyMessage={posts.length === 0 ? "Chưa có bài viết." : undefined}
      >
        {posts.map((post) => (
          <tr key={post.id}>
            <AdminTableCell>
              <Link href={`/admin/posts/${post.id}/edit`} className="font-medium hover:text-primary">
                {post.title}
              </Link>
              <p className="mt-1 text-xs text-muted-foreground">/news/{post.slug}</p>
            </AdminTableCell>
            <AdminTableCell>{post.author?.name || "Chưa gán"}</AdminTableCell>
            <AdminTableCell>{publishStatusLabel(post.status)}</AdminTableCell>
            <AdminTableCell>{post.updatedAt.toLocaleDateString()}</AdminTableCell>
            <AdminTableCell>
              <div className="flex gap-2">
                <ButtonLink href={`/admin/posts/${post.id}/edit`} variant="outline" size="sm">
                  Sửa
                </ButtonLink>
                <form action={deletePostAction}>
                  <input type="hidden" name="id" value={post.id} />
                  <Button type="submit" variant="outline" size="sm">
                    Xóa
                  </Button>
                </form>
              </div>
            </AdminTableCell>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
