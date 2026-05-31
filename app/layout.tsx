import type { Metadata } from "next";
import "./globals.css";
import { createMetadata, defaultSeo, siteOrigin } from "@/lib/seo";
import { programBrand } from "@/lib/program-copy";

export const metadata: Metadata = {
  ...createMetadata({
    title: programBrand.name,
    description: defaultSeo.description,
    path: "/"
  }),
  metadataBase: new URL(siteOrigin()),
  applicationName: programBrand.name,
  authors: [{ name: programBrand.name }],
  creator: programBrand.name,
  publisher: programBrand.name,
  keywords: [
    "sự kiện",
    "văn hóa",
    "Việt Nam",
    "Tài Sắc Việt Nam 2026",
    "cuộc thi Tài Sắc Việt Nam",
    "tuyển sinh Tài Sắc Việt Nam",
    "truyền hình thực tế",
    "phụ nữ Việt Nam",
    "tài sắc",
    "đăng ký",
    "tin tức"
  ],
  title: {
    default: programBrand.name,
    template: `%s | ${programBrand.name}`
  },
  icons: {
    icon: "/assets/Logo_TSVN/Logo_TSVN_bg.jpg",
    shortcut: "/assets/Logo_TSVN/Logo_TSVN_bg.jpg",
    apple: "/assets/Logo_TSVN/Logo_TSVN_bg.jpg"
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&display=swap&subset=vietnamese"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/Logo_TSVN/Logo_TSVN_bg.jpg" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
