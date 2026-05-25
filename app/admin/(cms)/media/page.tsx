import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable, AdminTableCell } from "@/components/admin/admin-table";

function mediaTypeLabel(type: string) {
  if (type === "VIDEO") return "Video";
  if (type === "DOCUMENT") return "Tài liệu";
  return "Hình ảnh";
}

export default async function AdminMediaPage() {
  const media = await db.media.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      post: {
        select: {
          title: true
        }
      },
      partner: {
        select: {
          name: true
        }
      }
    }
  });

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Thư viện"
        description="Xem media đã tải lên hoặc đã liên kết với nội dung sự kiện."
      />

      <AdminTable
        headers={["Tiêu đề", "Loại", "Liên kết với", "URL", "Ngày tạo"]}
        emptyMessage={media.length === 0 ? "Chưa có media." : undefined}
      >
        {media.map((item) => (
          <tr key={item.id}>
            <AdminTableCell className="font-medium">{item.title}</AdminTableCell>
            <AdminTableCell>{mediaTypeLabel(item.type)}</AdminTableCell>
            <AdminTableCell>{item.post?.title || item.partner?.name || "Độc lập"}</AdminTableCell>
            <AdminTableCell>
              <a href={item.url} className="line-clamp-1 text-primary hover:underline">
                {item.url}
              </a>
            </AdminTableCell>
            <AdminTableCell>{item.createdAt.toLocaleDateString()}</AdminTableCell>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
