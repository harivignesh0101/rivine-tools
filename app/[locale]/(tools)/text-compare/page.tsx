import { Metadata } from "next";
import {appName, siteUrl, textComparePath} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {textCompare} from "@/config/i18n-constants";
import {TextDiffViewer} from "@/components/custom/text-compare/text-compare";
import { generateAlternates } from "@/lib/utils";

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
        name: t(`${textCompare}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: textComparePath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${textCompare}.description`),
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
            <TextDiffViewer/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, textComparePath);

    return {
        title: `${appName} | ${t(`${textCompare}.title`)}`,
        description: t(`${textCompare}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${textCompare}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${textCompare}.title`)} | Free Online Text compare`,
            description: t(`${textCompare}.description`),
            url: `${url}${textComparePath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${textCompare}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${textCompare}.title`),
            description: t(`${textCompare}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};