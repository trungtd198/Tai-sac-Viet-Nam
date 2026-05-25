import { Mail, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";

export function ContactCtaSection() {
  return (
    <section id="contact" className="section-padding bg-primary text-primary-foreground">
      <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-center">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] opacity-80">
            Liên hệ
          </p>
          <h2 className="mt-3 text-3xl font-bold md:text-5xl">
            Sẵn sàng tham gia hoặc đồng hành cùng Tài Sắc Việt Nam?
          </h2>
          <div className="mt-5 flex flex-col gap-3 text-sm opacity-90 sm:flex-row sm:gap-6">
            <span className="inline-flex items-center gap-2">
              <Mail className="h-4 w-4" />
              hello@event.vn
            </span>
            <span className="inline-flex items-center gap-2">
              <Phone className="h-4 w-4" />
              +84 900 000 000
            </span>
          </div>
        </div>
        <ButtonLink
          href="mailto:hello@event.vn"
          variant="outline"
          className="border-white/40 bg-white text-primary hover:bg-white/90"
        >
          Liên hệ ban tổ chức
        </ButtonLink>
      </div>
    </section>
  );
}
