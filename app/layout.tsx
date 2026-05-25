import type { Metadata } from "next";
import "./globals.css";
import { createMetadata, defaultSeo, siteUrl } from "@/lib/seo";
import { programBrand } from "@/lib/program-copy";

export const metadata: Metadata = {
  ...createMetadata({
    title: programBrand.name,
    description: defaultSeo.description,
    path: "/"
  }),
  metadataBase: new URL(siteUrl()),
  applicationName: programBrand.name,
  authors: [{ name: programBrand.name }],
  creator: programBrand.name,
  publisher: programBrand.name,
  keywords: [
    "sự kiện",
    "văn hóa",
    "Việt Nam",
    "tài sắc",
    "đăng ký",
    "tin tức"
  ],
  title: {
    default: programBrand.name,
    template: `%s | ${programBrand.name}`
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700;800;900&family=Cormorant+Garamond:wght@400;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap&subset=vietnamese"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
