import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {SiteHeader} from "@/components/custom/core/site-header";
import {SiteFooter} from "@/components/custom/core/site-footer";
import {ThemeProvider} from "@/components/theme/theme-provider";
import "../globals.css";
import {i18n} from "@/i18n/config";
import PagesTopLoader from "@/components/providers/pages-top-loader";
import {GoogleAnalytics} from "@next/third-parties/google";

export const metadata = {
    robots: {
        index: true,
        follow: true,
    }
};


export default async function LocaleLayout({
                                               children,
                                               params
                                           }: {
    children: React.ReactNode;
    params: Promise<{locale: string}>;
}) {
    // Ensure that the incoming `locale` is valid
    const {locale} = await params;
    if (!hasLocale(i18n.locales, locale)) {
        notFound();
    }

    return (
        <html lang={locale} suppressHydrationWarning>
            <body>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem
                    disableTransitionOnChange
                >
                    <NextIntlClientProvider>
                        <PagesTopLoader></PagesTopLoader>
                        <div className="flex flex-col min-h-screen">
                            <SiteHeader />
                            <div className="flex-grow">
                                {children}
                            </div>
                            <SiteFooter />
                        </div>
                    </NextIntlClientProvider>
                </ThemeProvider>
                {process.env.ENABLE_GOOGLE_ANALYTICS === 'true' && (
                    <GoogleAnalytics gaId={`${process.env.GOOGLE_ANALYTICS_ID}`} />
                )}
            </body>
        </html>
    );
}