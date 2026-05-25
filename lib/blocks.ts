export type LinkValue = {
  label: string;
  href: string;
};

export type HeroBlock = {
  id: string;
  type: "hero";
  eyebrow?: string;
  title: string;
  subtitle?: string;
  image?: string;
  primaryCta?: LinkValue;
  secondaryCta?: LinkValue;
};

export type RichTextBlock = {
  id: string;
  type: "richText";
  eyebrow?: string;
  title?: string;
  body: string;
};

export type FeatureGridBlock = {
  id: string;
  type: "featureGrid";
  eyebrow?: string;
  title: string;
  items: Array<{
    title: string;
    description: string;
  }>;
};

export type StatsBlock = {
  id: string;
  type: "stats";
  items: Array<{
    value: string;
    label: string;
  }>;
};

export type ScheduleBlock = {
  id: string;
  type: "schedule";
  items: Array<{
    date: string;
    title: string;
    description: string;
  }>;
};

export type GalleryBlock = {
  id: string;
  type: "gallery";
  title?: string;
  images: string[];
};

export type SponsorsBlock = {
  id: string;
  type: "sponsors";
  eyebrow?: string;
  title: string;
  sponsors: string[];
};

export type CtaBlock = {
  id: string;
  type: "cta";
  title: string;
  body?: string;
  cta?: LinkValue;
};

export type NewsListBlock = {
  id: string;
  type: "newsList";
  eyebrow?: string;
  title: string;
  limit?: number;
};

export type RegistrationBlock = {
  id: string;
  type: "registration";
  title?: string;
};

export type ContentBlock =
  | HeroBlock
  | RichTextBlock
  | FeatureGridBlock
  | StatsBlock
  | ScheduleBlock
  | GalleryBlock
  | SponsorsBlock
  | CtaBlock
  | NewsListBlock
  | RegistrationBlock;

export const blockTemplates: ContentBlock[] = [
  {
    id: "hero-1",
    type: "hero",
    eyebrow: "Mùa thi",
    title: "Tiêu đề sự kiện",
    subtitle: "Phần giới thiệu ngắn hiển thị công khai.",
    image: "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=1800&q=80",
    primaryCta: { label: "Đăng ký", href: "/register" },
    secondaryCta: { label: "Tìm hiểu thêm", href: "/about" }
  },
  {
    id: "text-1",
    type: "richText",
    eyebrow: "Mục",
    title: "Tiêu đề section",
    body: "Nội dung có thể chỉnh sửa."
  },
  {
    id: "features-1",
    type: "featureGrid",
    title: "Lưới nội dung",
    items: [
      { title: "Điểm nổi bật", description: "Mô tả điểm nổi bật có thể chỉnh sửa." },
      { title: "Điểm nổi bật", description: "Mô tả điểm nổi bật có thể chỉnh sửa." }
    ]
  },
  {
    id: "news-1",
    type: "newsList",
    title: "Tin tức mới nhất",
    limit: 3
  },
  {
    id: "register-1",
    type: "registration",
    title: "Biểu mẫu đăng ký"
  }
];

export function parseBlocks(value: unknown): ContentBlock[] {
  if (!Array.isArray(value)) return [];
  return value.filter((block): block is ContentBlock => {
    return Boolean(
      block &&
        typeof block === "object" &&
        "id" in block &&
        "type" in block &&
        typeof block.id === "string" &&
        typeof block.type === "string"
    );
  });
}
