"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

type NavItem = { id: string; href: string; label: string };
type Brand = { name: string; tagline?: string };

type NavbarClientProps = {
  brand: Brand;
  navigation: NavItem[];
  ticketItem: NavItem;
  registerItem: NavItem;
};

export function NavbarClient({
  brand,
  navigation,
  ticketItem,
  registerItem,
}: NavbarClientProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const close = () => {
      setMenuOpen(false);
    };
    window.addEventListener("resize", close);
    return () => window.removeEventListener("resize", close);
  }, []);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header
      id="site-header"
      className="sticky top-0 z-50 border-b transition-all duration-500"
      style={{
        background: scrolled ? "rgba(9,8,4,0.94)" : "rgba(9,8,4,0.78)",
        backdropFilter: "blur(18px)",
        borderColor: scrolled
          ? "rgba(212,175,55,0.22)"
          : "rgba(212,175,55,0.12)",
      }}
    >
      <div className="container grid min-h-[64px] grid-cols-[1fr_auto] items-center gap-4 xl:grid-cols-[minmax(310px,max-content)_auto_minmax(260px,max-content)]">
        <Link
          href="/"
          className="group flex min-w-max flex-col"
          onClick={closeMenu}
        >
          <span className="whitespace-nowrap font-cinzel text-base font-black uppercase text-white transition-colors duration-300 group-hover:text-[#D4AF37] md:text-[18px]">
            {brand.name}
          </span>
          {brand.tagline ? (
            <span className="mt-0.5 hidden whitespace-nowrap font-sans text-[10px] font-light tracking-[0.12em] text-[#D4AF37]/70 sm:block">
              {brand.tagline}
            </span>
          ) : null}
        </Link>

        <nav className="hidden items-center gap-5 xl:flex justify-center">
          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className="group relative whitespace-nowrap py-6 font-sans text-[12px] font-extrabold uppercase tracking-[0.06em] text-white/90 transition-colors duration-300 hover:text-white"
            >
              {item.label}
              <span className="absolute bottom-4 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full bg-[#D4AF37] transition-all duration-300 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3">
          <Link
            href={ticketItem.href}
            className="hidden whitespace-nowrap rounded-md border border-[#D4AF37]/35 px-5 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.1em] text-white/90 transition-all duration-300 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37] md:inline-flex"
          >
            {ticketItem.label}
          </Link>
          <Link
            href={registerItem.href}
            className="group relative hidden whitespace-nowrap overflow-hidden rounded-md px-5 py-2 font-sans text-[11px] font-extrabold uppercase tracking-[0.1em] text-[#1b1403] transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_28px_rgba(212,175,55,0.48)] sm:inline-flex"
            style={{
              background:
                "linear-gradient(135deg, #9a6b1b 0%, #D4AF37 34%, #fff0a6 58%, #c5902d 100%)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{registerItem.label}</span>
          </Link>

          <button
            aria-label={menuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
            className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-white/15 text-white/90 transition-all duration-300 hover:border-[#D4AF37]/45 hover:text-[#D4AF37] xl:hidden"
          >
            <span
              className={`absolute transition-all duration-300 ${menuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-90 scale-75"}`}
            >
              <X className="h-5 w-5" />
            </span>
            <span
              className={`absolute transition-all duration-300 ${menuOpen ? "opacity-0 -rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}`}
            >
              <Menu className="h-5 w-5" />
            </span>
          </button>
        </div>
      </div>

      <div
        className="absolute inset-x-0 bottom-0 h-px transition-opacity duration-500"
        style={{
          opacity: scrolled ? 0.5 : 0.2,
          background:
            "linear-gradient(90deg, transparent, #D4AF37 30%, #D4AF37 70%, transparent)",
        }}
      />

      <div
        className="overflow-hidden transition-all duration-500 ease-in-out xl:hidden"
        style={{
          maxHeight: menuOpen ? "620px" : "0px",
          opacity: menuOpen ? 1 : 0,
          background: "rgba(13,13,13,0.98)",
          backdropFilter: "blur(22px)",
          borderTop: menuOpen ? "1px solid rgba(212,175,55,0.14)" : "none",
        }}
      >
        <div className="container flex flex-col py-6">
          <div className="mb-4 h-px w-12 bg-[#D4AF37]/55" />

          {navigation.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={closeMenu}
              className="group flex items-center gap-3 py-3 font-sans text-sm font-medium uppercase tracking-[0.14em] text-white/85 transition-colors duration-300 hover:text-[#D4AF37]"
            >
              <span className="h-px w-0 bg-[#D4AF37] transition-all duration-300 group-hover:w-6" />
              {item.label}
            </Link>
          ))}

          <div className="my-4 h-px w-full bg-gradient-to-r from-[#D4AF37]/30 to-transparent" />

          <Link
            href={ticketItem.href}
            onClick={closeMenu}
            className="mb-3 inline-flex w-full items-center justify-center rounded-md border border-[#D4AF37]/35 py-3 font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-white/90 transition-all duration-300 hover:border-[#D4AF37]/70 hover:bg-[#D4AF37]/10 hover:text-[#D4AF37]"
          >
            {ticketItem.label}
          </Link>

          <Link
            href={registerItem.href}
            onClick={closeMenu}
            className="group relative inline-flex w-full items-center justify-center overflow-hidden rounded-md py-3.5 font-sans text-xs font-extrabold uppercase tracking-[0.14em] text-[#1b1403] transition-all duration-300 hover:shadow-[0_0_24px_rgba(212,175,55,0.45)]"
            style={{
              background:
                "linear-gradient(135deg, #9a6b1b 0%, #D4AF37 34%, #fff0a6 58%, #c5902d 100%)",
            }}
          >
            <span className="absolute inset-0 -translate-x-full skew-x-[-20deg] bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
            <span className="relative">{registerItem.label}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
