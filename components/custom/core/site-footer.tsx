import Logo from "@/components/custom/core/logo";
import {footerBottomLinks, footerMenuItems, toolsNavItems, publicUrl, socialIcons} from "@/config/site-config";
import { getTranslations } from 'next-intl/server';
import Link from "next/link";

const SiteFooter = async () => {
    const t = await getTranslations();

    return (
        <div className="w-[100%] justify-center flex">
            <div className="container max-w-screen-2xl items-center px-6">
                <footer className="w-[100%]">
                    <div className="grid grid-cols-2 gap-8 lg:grid-cols-6 pt-4">
                        <div className="col-span-2 mb-8 lg:mb-0">
                            <div className="flex items-center gap-2 lg:justify-start">
                                <a href={publicUrl || '/'}>
                                    <Logo/>
                                </a>
                            </div>
                            <div className="py-8">
                                <ul className="flex flex-wrap items-center gap-6">
                                    {socialIcons.map((technology, idx) => {
                                        const Icon = technology.icon;
                                        return (
                                            <li
                                                key={idx}
                                                className="transition-transform duration-300 hover:scale-110"
                                            >
                                                <Link
                                                    href={technology.url}
                                                    target="_blank"
                                                    className="flex items-center justify-center p-3 rounded-full
                                                     bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                                                      text-gray-700 dark:text-gray-300 transition-colors duration-300"
                                                    aria-label={`Social link ${idx + 1}`}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </Link>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </div>
                        </div>
                        {footerMenuItems.map((section: any, sectionIdx: number) => (
                            <div key={sectionIdx}>
                                <h3 className="mb-4 font-bold">{section.title}</h3>
                                <ul className="space-y-4 text-muted-foreground">
                                    {section.links.map((link: any, linkIdx: number) => (
                                        <li
                                            key={linkIdx}
                                            className=" hover:text-primary"
                                        >
                                            <Link target={link.blank ? '_blank' : '_self'} href={link.href}>
                                                {
                                                    link.tLabel ? t(link.tLabel) : link.label
                                                }
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                        {toolsNavItems.map((item, sectionIdx) => (
                            <div key={sectionIdx}>
                                <p className="mb-4 font-bold">{item.tLabel ? t(item.tLabel) : item.label}</p>
                                <ul className="space-y-4 text-muted-foreground">
                                    {item.links?.map((link: any, linkIdx) => (
                                        <li
                                            key={linkIdx}
                                            className=" hover:text-primary"
                                        >
                                            <Link target={link.blank ? '_blank' : '_self'} href={link.href}>
                                                {
                                                    link.tLabel ? t(link.tLabel) : link.label
                                                }
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                    <div
                        className="mt-24 flex flex-col justify-between gap-4 border-t py-4 text-sm font-medium text-muted-foreground md:flex-row md:items-center">
                        <p>{`© ${new Date().getFullYear()} Rivine dev. All rights reserved.`}</p>
                        <ul className="flex gap-4">
                            {footerBottomLinks.map((link: any, linkIdx) => (
                                <li key={linkIdx} className="underline hover:text-primary">
                                    <a href={link.url} target="_blank">
                                        {
                                            link.tLabel ? t(link.tLabel) : link.label
                                        }
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </footer>
            </div>
        </div>
    );
};

export { SiteFooter };
