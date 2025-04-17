import { Metadata } from "next";
import {appName, siteUrl, jsonEditorPath} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {jsonEditor} from "@/config/i18n-constants";
import JsonCompare from "@/components/custom/json/json-compare";
import {generateAlternates} from "@/lib/utils";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function JsonEditorPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${jsonEditor}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: jsonEditorPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${jsonEditor}.description`),
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
            <JsonCompare/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, jsonEditorPath);

    return {
        title: `${appName} | ${t(`${jsonEditor}.title`)}`,
        description: t(`${jsonEditor}.description`),
        keywords: Array.from({ length: 11 }, (_, i) => t(`${jsonEditor}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${jsonEditor}.title`)} | Free Online JSON Editor`,
            description: t(`${jsonEditor}.description`),
            url: `${url}${jsonEditorPath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${jsonEditor}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${jsonEditor}.title`),
            description: t(`${jsonEditor}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};