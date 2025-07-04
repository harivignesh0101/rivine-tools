import { Metadata } from "next";
import { appName, passwordGeneratorPath, siteUrl } from "@/config/site-config";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import { passwordGenerator } from "@/config/i18n-constants";
import JsonLd from "@/components/custom/core/json-ld";
import PasswordGenerator from "@/components/custom/password-generator/password-generator";
import {generateAlternates} from "@/lib/utils";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export default async function PasswordGeneratorPage({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: t(`${passwordGenerator}.label`),
        url: `${siteUrl}${getLocalizedPath({ slug: passwordGeneratorPath, locale })}`,
        applicationCategory: "Utility",
        operatingSystem: "All",
        description: t(`${passwordGenerator}.description`),
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
            <PasswordGenerator />
        </>
    );
}

export const generateMetadata = async ({ params }: PageProps): Promise<Metadata> => {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale });
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, passwordGeneratorPath);

    return {
        title: `${appName} | ${t(`${passwordGenerator}.title`)}`,
        description: t(`${passwordGenerator}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${passwordGenerator}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${passwordGenerator}.title`)} | Free Password Generator`,
            description: t(`${passwordGenerator}.description`),
            url: `${url}${passwordGeneratorPath}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`,
                    width: 1200,
                    height: 630,
                    alt: t(`${passwordGenerator}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${passwordGenerator}.title`),
            description: t(`${passwordGenerator}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};