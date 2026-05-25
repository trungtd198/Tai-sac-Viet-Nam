import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable, AdminTableCell } from "@/components/admin/admin-table";

function registrationStatusLabel(status: string) {
  if (status === "APPROVED") return "Đã duyệt";
  if (status === "REJECTED") return "Từ chối";
  return "Đang chờ";
}

export default async function AdminRegistrationsPage() {
  const registrations = await db.registration.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      user: {
        select: {
          name: true
        }
      }
    }
  });

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Đăng ký"
        description="Xem các hồ sơ đăng ký sự kiện."
      />

      <AdminTable
        headers={["Họ tên", "Email", "Điện thoại", "Ảnh", "Trạng thái", "Ngày tạo"]}
        emptyMessage={registrations.length === 0 ? "Chưa có hồ sơ đăng ký." : undefined}
      >
        {registrations.map((registration) => (
          <tr key={registration.id}>
            <AdminTableCell>
              <p className="font-medium">{registration.fullName}</p>
              <p className="mt-1 text-xs text-muted-foreground">{registration.address}</p>
            </AdminTableCell>
            <AdminTableCell>{registration.email}</AdminTableCell>
            <AdminTableCell>{registration.phone}</AdminTableCell>
            <AdminTableCell>
              {registration.imageUrl ? (
                <a href={registration.imageUrl} className="text-primary hover:underline">
                  Xem ảnh
                </a>
              ) : (
                "Chưa có ảnh"
              )}
            </AdminTableCell>
            <AdminTableCell>{registrationStatusLabel(registration.status)}</AdminTableCell>
            <AdminTableCell>{registration.createdAt.toLocaleDateString()}</AdminTableCell>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
