import { Metadata } from "next";
import {appName, siteUrl, characterCounterPath} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {characterCounter} from "@/config/i18n-constants";
import { generateAlternates } from "@/lib/utils";
import {CharacterCounter} from "@/components/custom/char-counter/character-counter";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TextComparePage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${characterCounter}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: characterCounterPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${characterCounter}.description`),
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
            <CharacterCounter/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, characterCounterPath);

    return {
        title: `${appName} | ${t(`${characterCounter}.title`)}`,
        description: t(`${characterCounter}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${characterCounter}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${characterCounter}.title`)} | Free Online Character counter`,
            description: t(`${characterCounter}.description`),
            url: `${url}${characterCounter}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${characterCounter}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${characterCounter}.title`),
            description: t(`${characterCounter}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};