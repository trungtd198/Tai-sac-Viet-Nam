import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable, AdminTableCell } from "@/components/admin/admin-table";

export default async function AdminSchedulePage() {
  const schedules = await db.schedule.findMany({
    orderBy: [{ date: "asc" }, { order: "asc" }, { time: "asc" }]
  });

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Lịch trình"
        description="Xem các mốc lịch trình được nhóm theo ngày trên website."
      />

      <AdminTable
        headers={["Ngày", "Giờ", "Tiêu đề", "Mô tả", "Nổi bật"]}
        emptyMessage={schedules.length === 0 ? "Chưa có lịch trình." : undefined}
      >
        {schedules.map((item) => (
          <tr key={item.id}>
            <AdminTableCell>{item.date.toLocaleDateString()}</AdminTableCell>
            <AdminTableCell className="font-medium">{item.time}</AdminTableCell>
            <AdminTableCell className="font-medium">{item.title}</AdminTableCell>
            <AdminTableCell>{item.description}</AdminTableCell>
            <AdminTableCell>{item.isFeatured ? "Có" : "Không"}</AdminTableCell>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
