import { Metadata } from "next";
import {appName, siteUrl, wordCounterPath} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {wordCounter} from "@/config/i18n-constants";
import { generateAlternates } from "@/lib/utils";
import {WordCounter} from "@/components/custom/word-counter/word-counter";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WordCounterPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${wordCounter}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: wordCounterPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${wordCounter}.description`),
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
            <WordCounter/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, wordCounterPath);

    return {
        title: `${appName} | ${t(`${wordCounter}.title`)}`,
        description: t(`${wordCounter}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${wordCounter}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${wordCounter}.title`)} | Free Online Word counter`,
            description: t(`${wordCounter}.description`),
            url: `${url}${wordCounterPath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${wordCounter}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${wordCounter}.title`),
            description: t(`${wordCounter}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};