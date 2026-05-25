import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}

export function formatDate(date: Date | string | null | undefined) {
  if (!date) return "";

  return new Intl.DateTimeFormat("vi-VN", {
    month: "short",
    day: "numeric",
    year: "numeric"
  }).format(new Date(date));
}

export function toSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}
