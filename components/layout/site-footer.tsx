import Link from "next/link";
import Image from "next/image";
import { getBrand, getNavigation } from "@/lib/cms";
import { defaultAssets } from "@/lib/default-assets";
import { socialLinks } from "@/lib/social-links";

export async function SiteFooter() {
  const [brand, navigation] = await Promise.all([getBrand(), getNavigation()]);
  const year = new Date().getFullYear();
  const logoSrc =
    brand.logoUrl || defaultAssets.programLogoGold || defaultAssets.footerLogo;

  return (
    <footer
      className="relative overflow-hidden text-white"
      style={{
        background:
          "linear-gradient(160deg, #0b0904 0%, #110c02 60%, #080603 100%)",
      }}
    >
      {/* Ambient gold glow */}
      <div
        className="pointer-events-none absolute -bottom-32 left-1/2 h-[400px] w-[700px] -translate-x-1/2 rounded-full opacity-[0.08]"
        style={{
          background:
            "radial-gradient(ellipse, rgba(196,155,65,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Top gold separator */}
      <div className="flex justify-center">
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#c49b41]/40 to-transparent" />
      </div>

      {/* Main content */}
      <div className="container relative z-10 grid gap-12 py-16 md:grid-cols-[1.6fr_1fr_1fr] md:gap-16 md:py-20">
        {/* ── Column 1: Brand ── */}
        <div>
          {/* Logo */}
          <div className="relative mb-5 h-16 w-32">
            <Image
              src={logoSrc}
              alt={brand.name}
              fill
              sizes="128px"
              className="object-contain object-left"
            />
          </div>

          {/* Brand name */}
          <p
            className="font-cinzel text-xl font-black uppercase leading-tight tracking-wide text-white"
            style={{ textShadow: "0 2px 12px rgba(0,0,0,0.4)" }}
          >
            {brand.name}
          </p>

          {/* Tagline */}
          {brand.tagline ? (
            <p
              className="mt-3 max-w-sm font-playfair text-sm leading-7 italic"
              style={{
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.01em",
              }}
            >
              {brand.tagline}
            </p>
          ) : null}

          {/* Gold rule */}
          <div
            className="mt-6 h-px w-14 opacity-60"
            style={{
              background: "linear-gradient(90deg, #c49b41, transparent)",
            }}
          />
        </div>

        {/* ── Column 2: Navigation ── */}
        <div>
          <p
            className="mb-5 font-cinzel text-[13px] font-semibold uppercase tracking-[0.35em]"
            style={{ color: "#c49b41" }}
          >
            Điều hướng
          </p>
          <nav className="flex flex-col gap-3">
            {navigation.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="group flex items-center gap-2 text-[15px] text-white/90 transition-colors duration-300 hover:text-[#c49b41]"
              >
                <span
                  className="h-px w-3 flex-shrink-0 bg-[#c49b41] opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:w-5"
                  style={{ transition: "width 300ms, opacity 300ms" }}
                />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* ── Column 3: Connect ── */}
        <div>
          <p
            className="mb-5 font-cinzel text-[13px] font-semibold uppercase tracking-[0.35em]"
            style={{ color: "#c49b41" }}
          >
            Kết nối
          </p>

          {/* Social icon row */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-300 hover:border-[#c49b41]/50 hover:text-[#c49b41] hover:shadow-[0_0_16px_rgba(196,155,65,0.15)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            {/* Instagram */}
            <a
              href="#"
              aria-label="Instagram"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-300 hover:border-[#c49b41]/50 hover:text-[#c49b41] hover:shadow-[0_0_16px_rgba(196,155,65,0.15)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle
                  cx="17.5"
                  cy="6.5"
                  r="1"
                  fill="currentColor"
                  stroke="none"
                />
              </svg>
            </a>
            {/* YouTube */}
            <a
              href={socialLinks.youtube}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 text-white/85 transition-all duration-300 hover:border-[#c49b41]/50 hover:text-[#c49b41] hover:shadow-[0_0_16px_rgba(196,155,65,0.15)]"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.41 19.6C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.95A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                <polygon
                  fill="white"
                  points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
                />
              </svg>
            </a>
          </div>

          {/* Decorative star ornament */}
          <div className="mt-8 flex items-center gap-3 opacity-30">
            <div className="h-px w-6 bg-[#c49b41]" />
            <svg width="8" height="8" viewBox="0 0 8 8" fill="#c49b41">
              <path d="M4 0l.8 2.4H8l-2 1.6.8 2.4L4 4.8l-2.8 1.6.8-2.4-2-1.6h3.2z" />
            </svg>
            <div className="h-px w-6 bg-[#c49b41]" />
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="relative z-10 border-t py-5"
        style={{ borderColor: "rgba(196,155,65,0.12)" }}
      >
        <div className="container flex flex-col items-center justify-between gap-2 text-center sm:flex-row">
          <p className="font-cinzel text-[12px] uppercase tracking-[0.28em] text-white/60">
            © {year} {brand.name}
          </p>
          <p className="font-cinzel text-[12px] uppercase tracking-[0.28em] text-white/60">
            All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
