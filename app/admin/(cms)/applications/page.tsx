import { db } from "@/lib/db";
import { formatDate } from "@/lib/utils";
import { Card } from "@/components/ui/card";

export default async function ApplicationsPage() {
  const applications = await db.application.findMany({
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-3xl font-bold">Hồ sơ ứng tuyển</h1>
        <p className="mt-1 text-sm text-muted-foreground">Xem các hồ sơ đăng ký gửi từ website.</p>
      </div>
      <div className="grid gap-4">
        {applications.length === 0 ? (
          <Card className="p-6 text-sm text-muted-foreground">Chưa có hồ sơ ứng tuyển.</Card>
        ) : null}
        {applications.map((application) => (
          <Card key={application.id} className="grid gap-4 p-5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-semibold">{application.fullName}</h2>
                <p className="text-sm text-muted-foreground">{application.city}</p>
              </div>
              <p className="text-sm text-muted-foreground">{formatDate(application.createdAt)}</p>
            </div>
            <div className="grid gap-2 text-sm md:grid-cols-2">
              <p>
                <span className="font-semibold">Email:</span> {application.email}
              </p>
              <p>
                <span className="font-semibold">Điện thoại:</span> {application.phone}
              </p>
              {application.portfolio ? (
                <p className="md:col-span-2">
                  <span className="font-semibold">Hồ sơ / mạng xã hội:</span> {application.portfolio}
                </p>
              ) : null}
            </div>
            {application.message ? <p className="text-sm leading-6 text-muted-foreground">{application.message}</p> : null}
          </Card>
        ))}
      </div>
    </div>
  );
}
