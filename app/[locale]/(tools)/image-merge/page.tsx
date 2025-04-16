import { Metadata } from "next";
import {appName, imageMergePath, siteUrl} from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import JsonLd from "@/components/custom/core/json-ld";
import ImageMerger from "@/components/custom/image-merger/image-merge";
import {imageMerge} from "@/config/i18n-constants";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ImageMergerPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${imageMerge}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: imageMergePath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${imageMerge}.description`),
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
            <ImageMerger/>
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;

    return {
        title: `${appName} | ${t(`${imageMerge}.title`)}`,
        description: t(`${imageMerge}.description`),
        keywords: Array.from({ length: 26 }, (_, i) => t(`${imageMerge}.keywords.${i}`)),
        openGraph: {
            title: `${t(`${imageMerge}.title`)} | Free Online Image Merge`,
            description: t(`${imageMerge}.description`),
            url: `${url}${imageMergePath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${imageMerge}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${imageMerge}.title`),
            description: t(`${imageMerge}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};