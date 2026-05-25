import type { Metadata } from "next";
import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { formatScheduleDate, scheduleDays } from "@/lib/schedule-mock";
import { createMetadata } from "@/lib/seo";

export const metadata: Metadata = createMetadata({
  title: "Lịch trình",
  description: "Lịch trình sự kiện được nhóm theo ngày, kèm giờ, tiêu đề và mô tả.",
  path: "/schedule"
});

export default function SchedulePage() {
  return (
    <main className="section-padding">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Lịch trình
          </p>
          <h1 className="mt-3 text-4xl font-bold md:text-6xl">Lịch trình sự kiện</h1>
          <p className="mt-4 text-lg leading-8 text-muted-foreground">
            Theo dõi các hoạt động chính được nhóm theo ngày, kèm thời gian, tiêu đề và nội dung chi tiết.
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {scheduleDays.map((day) => (
            <section key={day.date} className="grid gap-5 lg:grid-cols-[260px_1fr]">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                  {day.label}
                </p>
                <h2 className="mt-2 text-2xl font-bold">{formatScheduleDate(day.date)}</h2>
              </div>

              <div className="relative space-y-4 border-l border-border pl-5">
                {day.events.map((event) => (
                  <Card key={`${day.date}-${event.time}`} className="relative p-5">
                    <span className="absolute -left-[29px] top-6 h-3 w-3 rounded-full border-2 border-primary bg-background" />
                    <div className="grid gap-3 sm:grid-cols-[96px_1fr]">
                      <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                        <Clock className="h-4 w-4" />
                        {event.time}
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold">{event.title}</h3>
                        <p className="mt-2 text-sm leading-6 text-muted-foreground">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}
