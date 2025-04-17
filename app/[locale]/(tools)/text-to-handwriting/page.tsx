import { Metadata } from "next";
import {appName, textToHandwritingPath, siteUrl} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {textToHandwriting} from "@/config/i18n-constants";
import HandwritingConverter from "@/components/custom/text-to-handwriting/handwriting-convertor";
import {generateAlternates} from "@/lib/utils";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function TextToHandwritingPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${textToHandwriting}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: textToHandwritingPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${textToHandwriting}.description`),
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
            <HandwritingConverter/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, textToHandwritingPath);

    return {
        title: `${appName} | ${t(`${textToHandwriting}.title`)}`,
        description: t(`${textToHandwriting}.description`),
        keywords: Array.from({ length: 26 }, (_, i) => t(`${textToHandwriting}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${textToHandwriting}.title`)} | Free Online Text to Handwriting`,
            description: t(`${textToHandwriting}.description`),
            url: `${url}${textToHandwritingPath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${textToHandwriting}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${textToHandwriting}.title`),
            description: t(`${textToHandwriting}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};