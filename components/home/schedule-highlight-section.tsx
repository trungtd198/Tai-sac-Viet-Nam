import { Clock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { scheduleHighlights } from "@/lib/home-data";
import { SectionHeading } from "@/components/home/section-heading";

export function ScheduleHighlightSection() {
  return (
    <section id="schedule" className="section-padding bg-muted">
      <div className="container">
        <SectionHeading
          eyebrow="Lịch trình"
          title="Các mốc chính của chương trình"
          description="Timeline tuyển sinh, đào tạo, ghi hình truyền hình thực tế và Gala Chung kết."
        />
        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {scheduleHighlights.map((item) => (
            <Card key={item.title} className="p-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <Clock className="h-4 w-4" />
                {item.time}
              </div>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{item.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
