// components/IframeListenerProvider.tsx
"use client";

import { useEffect } from "react";
import {usePathname, useRouter} from "next/navigation";
import {i18n} from "@/i18n/config";
import {useTheme} from "next-themes";

const IframeListenerProvider: React.FC = () => {
    const router = useRouter();
    const pathname = usePathname()
    const { setTheme } = useTheme()

    useEffect(() => {
        const url = new URL(window.location.href);
        const searchParams = url.searchParams;

        const frame = searchParams.get("frame");
        const theme = searchParams.get("theme");
        const lang = searchParams.get("lang");

        if (frame === "true") {

            if (theme && ['light', 'dark', 'system'].includes(theme)) {
                setTheme(theme)
            }

            if (lang) {
                const segments = pathname.split("/")
                if (i18n.locales.includes(segments[1])) {
                    segments[1] = lang
                } else {
                    segments.unshift("", lang)
                }
                if (i18n.locales.includes(lang)) {
                    console.log("Embedded in iframe with:");
                    router.replace(segments.join("/"))
                }
            }
        }
    }, []);

    return null;
};

export default IframeListenerProvider;
