import { sponsors } from "@/lib/home-data";
import { SectionHeading } from "@/components/home/section-heading";

export function SponsorsSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="Đối tác"
          title="Đồng hành bởi các đối tác văn hóa và truyền thông"
          align="center"
        />
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
          {sponsors.map((sponsor) => (
            <div
              key={sponsor}
              className="flex min-h-28 items-center justify-center rounded-lg border border-border bg-card p-5 text-center text-sm font-bold text-muted-foreground shadow-sm"
            >
              {sponsor}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
