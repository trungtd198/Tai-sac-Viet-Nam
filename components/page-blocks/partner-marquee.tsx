"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { defaultAssets } from "@/lib/default-assets";

type Partner = {
  id: string;
  name: string;
  website?: string | null;
  logoUrl?: string | null;
  tier: string;
  media: { url: string; altText?: string | null }[];
};

type PartnerMarqueeProps = {
  partners: Partner[];
};

export function PartnerMarquee({ partners }: PartnerMarqueeProps) {
  void partners;

  const rootRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const displayPartners = [
    {
      id: "local-lta-partner",
      name: "LTA Global",
      website: null,
      logoUrl: defaultAssets.partnerLogo,
      tier: "local",
      media: [],
    },
  ];
  const repeatedPartners = Array.from({
    length: Math.max(2, Math.ceil(8 / displayPartners.length)),
  }).flatMap(() => displayPartners);
  const items = [...repeatedPartners, ...repeatedPartners];

  useEffect(() => {
    const element = rootRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.35,
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <style>{`
        @keyframes marquee-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: none;
          transform: translateX(0);
          will-change: transform;
        }
        .marquee-track.is-running {
          animation: marquee-scroll 32s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee-track.is-running {
            animation: none;
          }
        }
      `}</style>

      <div ref={rootRef} className="relative overflow-hidden">
        {/* Left fade */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0b0904] to-transparent" />
        {/* Right fade */}
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0b0904] to-transparent" />

        <div className="flex justify-center">
          <div
            className={`marquee-track flex items-center gap-14 py-3 ${isVisible ? "is-running" : ""}`}
            style={{ width: "max-content" }}
          >
            {items.map((partner, index) => {
              const logoSrc = partner.logoUrl;
              const altText = partner.name;
              const inner = (
                <div className="relative flex h-14 w-[190px] items-center justify-center overflow-hidden rounded-sm border border-[#D4AF37]/20 bg-[#0D0D0D]/90 px-4 py-2 shadow-[0_12px_30px_rgba(0,0,0,0.45)]">
                  <Image
                    src={logoSrc}
                    alt={altText}
                    fill
                    sizes="190px"
                    className="object-contain p-2 opacity-90 transition-all duration-500 group-hover:opacity-100"
                  />
                </div>
              );

              const content = (
                <div
                  key={`${partner.id}-${index}`}
                  className="group flex shrink-0 items-center justify-center px-2"
                >
                  {partner.website ? (
                    <a
                      href={partner.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={partner.name}
                      className="flex items-center"
                    >
                      {inner}
                    </a>
                  ) : (
                    inner
                  )}
                </div>
              );

              return content;
            })}
          </div>
        </div>
      </div>
    </>
  );
}
