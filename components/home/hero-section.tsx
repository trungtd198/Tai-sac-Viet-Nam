import Image from "next/image";
import { CalendarDays, MapPin } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { event } from "@/lib/home-data";

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-secondary text-secondary-foreground">
      <Image
        src={event.heroImage}
        alt={event.title}
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-45"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-secondary via-secondary/90 to-secondary/25" />
      <div className="container relative flex min-h-[82svh] items-center py-20">
        <div className="max-w-4xl">
          <div className="flex flex-wrap gap-3 text-sm font-semibold text-accent">
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
              <CalendarDays className="h-4 w-4" />
              22/08/2026
            </span>
            <span className="inline-flex items-center gap-2 rounded-md bg-white/10 px-3 py-2">
              <MapPin className="h-4 w-4" />
              {event.location}
            </span>
          </div>
          <h1 className="mt-6 text-5xl font-bold tracking-normal md:text-7xl">
            {event.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 opacity-90 md:text-xl">
            {event.subtitle}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="#contact">Giữ chỗ tham dự</ButtonLink>
            <ButtonLink
              href="#schedule"
              variant="outline"
              className="border-white/40 bg-white/10 text-white hover:bg-white/20"
            >
              Xem lịch trình
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
