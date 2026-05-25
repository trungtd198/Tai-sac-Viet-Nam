import Image from "next/image";
import { Play } from "lucide-react";
import { event } from "@/lib/home-data";
import { SectionHeading } from "@/components/home/section-heading";

export function VideoSection() {
  return (
    <section className="section-padding bg-secondary text-secondary-foreground">
      <div className="container grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <SectionHeading
          eyebrow="Video"
          title="Xem video giới thiệu chương trình"
          description="Khu vực dành cho trailer, intro chính thức hoặc các tập ghi hình hành trình Tài Sắc Việt Nam."
          tone="inverted"
        />
        <div className="relative aspect-video overflow-hidden rounded-lg">
          <Image src={event.videoImage} alt="Video giới thiệu chương trình" fill sizes="(min-width: 1024px) 58vw, 100vw" className="object-cover" />
          <div className="absolute inset-0 bg-secondary/30" />
          <button
            type="button"
            aria-label="Phát video giới thiệu chương trình"
            className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg"
          >
            <Play className="ml-1 h-7 w-7 fill-current" />
          </button>
        </div>
      </div>
    </section>
  );
}
