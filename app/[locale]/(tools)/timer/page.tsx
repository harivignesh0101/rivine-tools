import { Metadata } from "next";
import {appName, siteUrl, timerPath} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {timer} from "@/config/i18n-constants";
import {Timer} from "@/components/custom/timer/timer";
import {generateAlternates} from "@/lib/utils";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TimerPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${timer}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: timerPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${timer}.description`),
        inLanguage: locale,
        publisher: {
            "@type": "Organization",
            name: appName,
            url: siteUrl,
        },
    };

    return (
        <>
            <JsonLd data={jsonLd} />
            <Timer/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, timerPath);

    return {
        title: `${appName} | ${t(`${timer}.title`)}`,
        description: t(`${timer}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${timer}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${timer}.title`)} | Free Online Timer`,
            description: t(`${timer}.description`),
            url: `${url}${timerPath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${timer}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${timer}.title`),
            description: t(`${timer}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};