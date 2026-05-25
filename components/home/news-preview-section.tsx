import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button";
import { news } from "@/lib/home-data";
import { SectionHeading } from "@/components/home/section-heading";

export function NewsPreviewSection() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Tin tức"
            title="Cập nhật mới nhất"
            description="Thông báo tuyển sinh, hành trình truyền hình thực tế và thông tin Gala Chung kết."
          />
          <ButtonLink href="#" variant="outline" className="w-fit">
            Xem tất cả tin tức
          </ButtonLink>
        </div>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {news.map((item) => (
            <Card key={item.title} className="overflow-hidden">
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  {item.date}
                </p>
                <h3 className="mt-3 text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.excerpt}</p>
                <a href="#" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Xem thêm <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
