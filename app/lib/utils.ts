import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const APP_BASE_URL = "https://dash.nusanetwork.com";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function nameToSlug(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/&/g, "and")
    .replace(/[^\w-]+/g, "");
}

export function slugToName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/(\b\w)/g, (match) => match.toUpperCase());
}
