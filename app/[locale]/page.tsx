import React from "react";
import { Spotlight } from "@/components/ui/spotlight";
import { appName, siteUrl, toolsCards } from "@/config/site-config";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import Link from "next/link";
import { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { getLocalizedPath } from "@/i18n/get-localized-path";
import { home } from "@/config/i18n-constants";
import {generateAlternates} from "@/lib/utils";
import ToolsHomeContent from "@/components/custom/home/home-content";

type PageProps = {
    params: Promise<{ locale: string }>;
    searchParams?: Promise<Record<string, string | string[] | undefined>>; // Optional, as it's not used
};

export default async function Home({ params }: PageProps) {
    const resolvedParams = await params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale }); // Pass locale to getTranslations

    return (
        <div className="relative z-0 -mt-20">
            <div
                className="h-[90vh] w-full rounded-md flex items-center justify-center antialiased bg-grid-white/[0.02] relative overflow-hidden"
            >
                <Spotlight />
                <div className="p-4 max-w-7xl mx-auto relative z-10 w-full pt-20">
                    <h1
                        className="text-4xl md:text-7xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-b
            from-neutral-800 to-neutral-400
            dark:from-neutral-50 dark:to-neutral-400 bg-opacity-50"
                    >
                        {appName}
                    </h1>
                    <p className="mt-4 font-normal text-base dark:text-neutral-300 max-w-lg text-center mx-auto">
                        {t(`${home}.label`)}
                    </p>
                    <p className="mt-4 font-normal text-base dark:text-neutral-300 max-w-lg text-center mx-auto">
                        {t(`${home}.subLabel`)}
                    </p>
                    <div className="mt-4 flex justify-center text-center">
                        <HoverBorderGradient containerClassName="rounded-full" className="flex items-center space-x-2">
                            <Link href="#tools" scroll={true}>
                                <span className="block px-4 py-2">{t(`${home}.exploreTools`)}</span>
                            </Link>
                        </HoverBorderGradient>
                    </div>
                </div>
            </div>

            <div id="tools" className="py-20">
                <div className="max-w-5xl mx-auto px-8">
                    <HoverEffect items={toolsCards} />
                </div>
            </div>

            <div className="my-10">
                <ToolsHomeContent/>
            </div>
        </div>
    );
}

export const generateMetadata = async (props: PageProps): Promise<Metadata> => {
    const resolvedParams = await props.params; // Await the Promise
    const { locale } = resolvedParams; // Extract locale from resolved params
    const t = await getTranslations({ locale }); // Pass locale to getTranslations
    const url = `${siteUrl}${getLocalizedPath({ slug: "", locale })}`;
    const alternates = generateAlternates(locale, "");

    return {
        title: `${appName} | ${t(`${home}.title`)}`,
        description: t(`${home}.description`),
        keywords: Array.from({ length: 7 }, (_, i) => t(`${home}.keywords.${i}`)),
        metadataBase: new URL(siteUrl),
        alternates,
        openGraph: {
            title: `${t(`${home}.title`)} | Free online tools`,
            description: t(`${home}.description`),
            url: `${url}`,
            siteName: appName,
            images: [
                {
                    url: `${siteUrl}/logo/logo-stone.png`, // Replace with your OG image URL
                    width: 1200,
                    height: 630,
                    alt: t(`${home}.title`),
                },
            ],
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: t(`${home}.title`),
            description: t(`${home}.description`),
            images: [`${siteUrl}/logo/logo-stone.png`],
        },
    };
};