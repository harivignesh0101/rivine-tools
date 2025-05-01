"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { i18n } from "@/i18n/config";
import { useTheme } from "next-themes";

const IframeListenerProvider: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname();
    const { setTheme } = useTheme();

    useEffect(() => {
        if (typeof window === "undefined") return;
        const inIframe = window.self !== window.top;
        if (!inIframe) return;

        const segments = pathname.split("/");
        const firstSegment = segments[1];
        const isLangPrefixed = i18n.locales.includes(firstSegment);
        const currentLang = isLangPrefixed ? firstSegment : "en";
        const pathWithoutLang = isLangPrefixed
            ? "/" + segments.slice(2).join("/")
            : pathname;

        const url = new URL(window.location.href);
        const searchParams = url.searchParams;

        const themeParam = searchParams.get("theme");
        const langParam = searchParams.get("lang");

        // === Apply theme ===
        const effectiveTheme = themeParam || localStorage.getItem("frame-theme");
        if (effectiveTheme && ['light', 'dark', 'system'].includes(effectiveTheme)) {
            setTheme(effectiveTheme);
            // Update only if it came from search param
            if (themeParam) {
                localStorage.setItem("frame-theme", effectiveTheme);
            }
        }

        // === Handle language redirection ===
        const effectiveLang = langParam || localStorage.getItem("frame-language") || "en";
        if (i18n.locales.includes(effectiveLang)) {
            const targetPath =
                effectiveLang === i18n.defaultLocale
                    ? pathWithoutLang
                    : `/${effectiveLang}${pathWithoutLang}`;

            // Update only if it came from search param
            if (langParam) {
                localStorage.setItem("frame-language", effectiveLang);
            }

            if (pathname !== targetPath) {
                router.replace(targetPath);
                return;
            }
        }

    }, [pathname]);

    return null;
};

export default IframeListenerProvider;
