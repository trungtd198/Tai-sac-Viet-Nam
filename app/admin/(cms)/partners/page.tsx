import { db } from "@/lib/db";
import { AdminPageHeader } from "@/components/admin/admin-page-header";
import { AdminTable, AdminTableCell } from "@/components/admin/admin-table";

export default async function AdminPartnersPage() {
  const partners = await db.partner.findMany({
    orderBy: [{ tier: "asc" }, { order: "asc" }, { name: "asc" }],
    include: {
      media: true
    }
  });

  return (
    <div className="grid gap-6">
      <AdminPageHeader
        title="Đối tác"
        description="Xem nhà tài trợ và đối tác sự kiện."
      />

      <AdminTable
        headers={["Tên", "Nhóm", "Trang web", "Tệp media", "Hoạt động"]}
        emptyMessage={partners.length === 0 ? "Chưa có đối tác." : undefined}
      >
        {partners.map((partner) => (
          <tr key={partner.id}>
            <AdminTableCell className="font-medium">{partner.name}</AdminTableCell>
            <AdminTableCell>{partner.tier}</AdminTableCell>
            <AdminTableCell>
              {partner.website ? (
                <a href={partner.website} className="text-primary hover:underline">
                  {partner.website}
                </a>
              ) : (
                "Chưa thiết lập"
              )}
            </AdminTableCell>
            <AdminTableCell>{partner.media.length}</AdminTableCell>
            <AdminTableCell>{partner.isActive ? "Có" : "Không"}</AdminTableCell>
          </tr>
        ))}
      </AdminTable>
    </div>
  );
}
