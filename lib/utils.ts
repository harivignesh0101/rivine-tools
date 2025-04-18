import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
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

    let canonical = locale === defaultLang ? `${slug}` : `/${locale}${slug}`;
    if (!canonical) {
        canonical = '/';
    }


    const languages = supportedLanguages.reduce<Record<string, string>>((acc, lang) => {
        acc[lang.code] =
            lang.code === defaultLang ? `${slug}` : `/${lang.code}${slug}`;
        if (!acc[lang.code]) {
            acc[lang.code] = '/';
        }
        return acc;
    }, {});

    return {
        canonical,
        languages,
    };
}