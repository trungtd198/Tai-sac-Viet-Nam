import { BadgeCheck, Globe2, Users } from "lucide-react";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/home/section-heading";

const points = [
  {
    icon: Globe2,
    title: "Tinh hoa cổ phục",
    description:
      "Tôn vinh quốc phục và những lớp nghĩa văn hóa trong hình ảnh người phụ nữ Việt Nam.",
  },
  {
    icon: Users,
    title: "Giá trị làng nghề",
    description:
      "Đưa thí sinh trực tiếp trải nghiệm làng nghề truyền thống và văn hóa phi vật thể.",
  },
  {
    icon: BadgeCheck,
    title: "Bản lĩnh cá nhân",
    description:
      "Rèn luyện ứng xử, tư duy hiện đại, giao tiếp và khả năng lan tỏa giá trị Việt.",
  },
];

export function AboutEventSection() {
  return (
    <section className="section-padding">
      <div className="container grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
        <SectionHeading
          eyebrow="Giới thiệu"
          title="Hành trình giao thoa giữa truyền thống và hiện đại"
          description="Tài Sắc Việt Nam 2026 là chương trình truyền hình thực tế kết hợp giải trí hiện đại và chiều sâu văn hóa di sản."
        />
        <div className="grid gap-4">
          {points.map((point) => {
            const Icon = point.icon;
            return (
              <Card
                key={point.title}
                className="grid gap-4 p-5 sm:grid-cols-[48px_1fr]"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{point.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    {point.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
