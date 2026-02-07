import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"
import {supportedLanguages} from "@/i18n/config";
import {siteUrl} from "@/config/site-config";

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

    const normalizePath = (path: string) => {
        if (!path) return "/";
        return path.startsWith("/") ? path : `/${path}`;
    };

    const localizedPath =
        locale === defaultLang
            ? normalizePath(slug)
            : normalizePath(`/${locale}${slug}`);

    const canonical = `${siteUrl}${localizedPath === "//" ? "/" : localizedPath}`;

    const languages = supportedLanguages.reduce<Record<string, string>>((acc, lang) => {
        const localized =
            lang.code === defaultLang
                ? normalizePath(slug)
                : normalizePath(`/${lang.code}${slug}`);
        acc[lang.code] = `${siteUrl}${localized === "//" ? "/" : localized}`;
        return acc;
    }, {});

    return {
        canonical,
        languages,
    };
}
