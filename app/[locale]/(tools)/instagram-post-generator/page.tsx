import { Metadata } from "next";
import {appName, siteUrl, instagramPostGeneratorPath} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import {instagramPostGenerator} from "@/config/i18n-constants";
import { generateAlternates } from "@/lib/utils";
import InstagramPostGenerator from "@/components/custom/instagram/instagram-post-generator";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function InstagramPostGeneratorPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${instagramPostGenerator}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: instagramPostGeneratorPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${instagramPostGenerator}.description`),
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
            <InstagramPostGenerator/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, instagramPostGeneratorPath);

    return {
        title: `${appName} | ${t(`${instagramPostGenerator}.title`)}`,
        description: t(`${instagramPostGenerator}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${instagramPostGenerator}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${instagramPostGenerator}.title`)} | Free Instagram post generator`,
            description: t(`${instagramPostGenerator}.description`),
            url: `${url}${instagramPostGeneratorPath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${instagramPostGenerator}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${instagramPostGenerator}.title`),
            description: t(`${instagramPostGenerator}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};