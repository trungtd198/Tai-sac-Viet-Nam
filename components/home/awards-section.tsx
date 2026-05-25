import { Trophy } from "lucide-react";
import { Card } from "@/components/ui/card";
import { awards } from "@/lib/home-data";
import { SectionHeading } from "@/components/home/section-heading";

export function AwardsSection() {
  return (
    <section className="section-padding">
      <div className="container">
        <SectionHeading
          eyebrow="Giải thưởng"
          title="Tôn vinh bản lĩnh, trí tuệ và giá trị văn hóa"
          align="center"
        />
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {awards.map((award) => (
            <Card key={award.title} className="p-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-md bg-accent text-accent-foreground">
                <Trophy className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold">{award.title}</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{award.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
