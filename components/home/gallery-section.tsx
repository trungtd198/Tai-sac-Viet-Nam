import Image from "next/image";
import { gallery } from "@/lib/home-data";
import { SectionHeading } from "@/components/home/section-heading";

export function GallerySection() {
  return (
    <section className="section-padding bg-muted">
      <div className="container">
        <SectionHeading
          eyebrow="Thư viện ảnh"
          title="Khoảnh khắc trên hành trình Tài Sắc"
          description="Lưới hình ảnh cho cổ phục, làng nghề, sân khấu, báo chí và hậu trường."
        />
        <div className="mt-8 grid auto-rows-[220px] gap-4 md:grid-cols-3">
          {gallery.map((image, index) => (
            <div
              key={image}
              className={index === 0 ? "relative overflow-hidden rounded-lg md:col-span-2 md:row-span-2" : "relative overflow-hidden rounded-lg"}
            >
              <Image src={image} alt={`Hình ảnh sự kiện ${index + 1}`} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
