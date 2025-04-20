"use client"

import * as React from "react"
import Link from "next/link"

import { cn } from "@/lib/utils"
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import Logo from "@/components/custom/core/logo";
import {toolsNavItems} from "@/config/site-config";
import {useTranslations} from "use-intl";

export function ToolsNav() {
    const t = useTranslations()
    return (
        <NavigationMenu delayDuration={300}>
            <NavigationMenuList className="flex flex-row items-center">
                {toolsNavItems.map((item) => {
                    if ("links" in item) {
                        return (
                            <NavigationMenuItem key={item.label}>
                                <NavigationMenuTrigger>{item.tLabel ? t(item.tLabel) : item.label}</NavigationMenuTrigger>
                                <NavigationMenuContent>
                                    <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] grid-cols-1 md:grid-cols-2">
                                        {item.featured && (
                                            <li className="md:row-span-3">
                                                <NavigationMenuLink asChild>
                                                    <Link
                                                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                                                        href={item.featured.href ? item.featured.href : '/'}
                                                    >
                                                        <Logo />
                                                        <div className="mb-2 mt-4 text-lg font-medium">
                                                            {
                                                                item.featured.tLabel ?
                                                                    t(item.featured.tLabel) : item.featured.label
                                                            }
                                                        </div>
                                                        <p className="text-sm leading-tight text-muted-foreground">
                                                            {
                                                                item.featured.tDescription ?
                                                                    t(item.featured.tDescription) : item.featured.description
                                                            }
                                                        </p>
                                                    </Link>
                                                </NavigationMenuLink>
                                            </li>
                                        )}

                                        <div className="flex flex-col gap-3">
                                            {item.links?.map((link) => (
                                                <ListItem key={link.label} href={link.href} title={link.tLabel ? t(link.tLabel) : link.label ? link.label : ''}>
                                                    {
                                                        link.tDescription ?
                                                            t(link.tDescription) : link.description
                                                    }
                                                </ListItem>
                                            ))}
                                        </div>
                                    </ul>
                                </NavigationMenuContent>
                            </NavigationMenuItem>
                        );
                    } else {
                        return (
                            <NavigationMenuItem key={item.label}>
                                <Link href={item.href ? item.href : '/'} legacyBehavior passHref>
                                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                                        {
                                            item.tLabel ? t(item.tLabel) : item.label
                                        }
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                        );
                    }
                })}
            </NavigationMenuList>
        </NavigationMenu>
    )
}

interface ListItemProps extends React.ComponentPropsWithoutRef<typeof Link> {
    title: string
    children: React.ReactNode
}

const ListItem = React.forwardRef<React.ElementRef<"a">, ListItemProps>(
    ({ className, title, children, ...props }, ref) => {
        return (
            <li>
                <NavigationMenuLink asChild>
                    <Link
                        ref={ref}
                        {...props}
                        className={cn(
                            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
                            className
                        )}
                    >
                        <div className="text-sm font-medium leading-none">{title}</div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                            {children}
                        </p>
                    </Link>
                </NavigationMenuLink>
            </li>
        )
    }
)
ListItem.displayName = "ListItem"
