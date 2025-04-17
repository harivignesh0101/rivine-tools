import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {supportedLanguages} from "@/i18n/config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function formatTime(seconds: number): string {
  const hours = Math.floor(seconds / 3600)
  const mins = Math.floor((seconds % 3600) / 60)
  const secs = seconds % 60

  if (hours > 0) {
    return `${hours}:${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
}


export function generateAlternates(locale: string, slug: string) {
  const defaultLang = supportedLanguages.find((lang) => lang.default)?.code || "en";

  // Generate canonical URL
  const canonical = locale === defaultLang ? `${slug}` : `/${locale}${slug}`;

  // Generate alternate URLs excluding the current locale and x-default
  const languages = supportedLanguages.reduce<Record<string, string>>((acc, lang) => {
    // Add alternate URLs for all languages except the current locale
    if (lang.code !== locale) {
      acc[lang.code] =
          lang.code === defaultLang ? `${slug}` : `/${lang.code}${slug}`;
    }
    return acc;
  }, {});

  return {
    canonical,
    languages,
  };
}

