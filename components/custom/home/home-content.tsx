'use client'

import React from 'react'
import { useTranslations } from 'next-intl'
import {
    Shield,
    Zap,
    Code,
    RefreshCw,
    FileText,
    Image,
    Database,
    Palette
} from 'lucide-react'
import { home } from "@/config/i18n-constants"

/**
 * Landing page content section that appears below the tools list
 */
export default function ToolsHomeContent() {
    const t = useTranslations(`${home}.docs`)

    return (
        <div className="w-full bg-gradient-to-b from-background to-muted/20 py-16">
            <div className="container px-4 mx-auto max-w-6xl">
                {/* Value Proposition */}
                <section className="mb-16 text-center">
                    <h2 className="text-3xl font-bold mb-4">{t('valueSection.title')}</h2>
                    <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                        {t('valueSection.description')}
                    </p>
                </section>

                {/* Benefits Grid */}
                <section className="mb-16">
                    <h3 className="text-2xl font-semibold mb-12 text-center">{t('benefitsSection.title')}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Zap className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">{t('benefitsSection.benefits.0.title')}</h4>
                                <p className="text-muted-foreground">{t('benefitsSection.benefits.0.description')}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Shield className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">{t('benefitsSection.benefits.1.title')}</h4>
                                <p className="text-muted-foreground">{t('benefitsSection.benefits.1.description')}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <Code className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">{t('benefitsSection.benefits.2.title')}</h4>
                                <p className="text-muted-foreground">{t('benefitsSection.benefits.2.description')}</p>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start">
                            <div className="bg-primary/10 p-3 rounded-full">
                                <RefreshCw className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="text-lg font-medium mb-2">{t('benefitsSection.benefits.3.title')}</h4>
                                <p className="text-muted-foreground">{t('benefitsSection.benefits.3.description')}</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="flex flex-col md:flex-row gap-12 mt-20 items-start">
                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">{t('usageSection.title')}</h3>
                        <p className="text-muted-foreground">{t('usageSection.steps')}</p>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-2xl font-semibold mb-4">{t('empowerSection.title')}</h3>
                        <p className="text-muted-foreground">{t('empowerSection.steps')}</p>
                    </div>
                </section>
            </div>
        </div>
    )
}
