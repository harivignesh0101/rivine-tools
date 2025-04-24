'use client'

import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CheckCircle, Camera } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { instagramPostGenerator } from "@/config/i18n-constants";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

/**
 * Friendly end-user documentation for the Instagram Post Generator tool.
 */
export default function InstagramPostGeneratorDocumentation() {
    const t = useTranslations(`${instagramPostGenerator}.docs`)

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-base leading-relaxed">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-muted-foreground mb-8">{t('intro')}</p>

            {/* Usage Policy Alert */}
            <Alert className="mb-10 border-amber-500/50 bg-amber-50 dark:bg-amber-950/50">
                <AlertTitle className="text-amber-800 dark:text-amber-300 text-lg font-bold">
                    {t('usagePolicy.title')}
                </AlertTitle>
                <AlertDescription className="text-amber-700 dark:text-amber-400">
                    <p className="mb-2 font-medium">{t('usagePolicy.disclaimer')}</p>
                    <ul className="list-disc pl-6 space-y-1.5">
                        <li>{t('usagePolicy.rules.rule1')}</li>
                        <li>{t('usagePolicy.rules.rule2')}</li>
                        <li>{t('usagePolicy.rules.rule3')}</li>
                        <li>{t('usagePolicy.rules.rule4')}</li>
                        <li>{t('usagePolicy.rules.rule5')}</li>
                        <li>{t('usagePolicy.rules.rule6')}</li>
                        <li>{t('usagePolicy.rules.rule7')}</li>
                    </ul>
                    <p className="mt-2 italic">{t('usagePolicy.conclusion')}</p>
                </AlertDescription>
            </Alert>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('whatIs.title')}</h2>
                <p>{t('whatIs.description')}</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('features.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('features.customization.title')}</strong>: {t('features.customization.description')}
                    </li>
                    <li>
                        <strong>{t('features.themes.title')}</strong>: {t('features.themes.description')}
                    </li>
                    <li>
                        <strong>{t('features.viewModes.title')}</strong>: {t('features.viewModes.description')}
                    </li>
                    <li>
                        <strong>{t('features.download.title')}</strong>: {t('features.download.description')}
                    </li>
                    <li>
                        <strong>{t('features.engagement.title')}</strong>: {t('features.engagement.description')}
                    </li>
                </ul>
            </section>

            <section className="my-10">
                <h2 className="text-2xl font-semibold mb-4">{t('steps.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {t('steps.step1.title')}
                        </CardTitle>
                        <CardDescription>{t('steps.step1.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {t('steps.step2.title')}
                        </CardTitle>
                        <CardDescription>{t('steps.step2.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {t('steps.step3.title')}
                        </CardTitle>
                        <CardDescription>{t('steps.step3.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {t('steps.step4.title')}
                        </CardTitle>
                        <CardDescription>{t('steps.step4.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {t('steps.step5.title')}
                        </CardTitle>
                        <CardDescription>{t('steps.step5.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('customizationOptions.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Camera className="w-5 h-5 text-blue-500" /> {t('customizationOptions.profileSection.title')}
                        </CardTitle>
                        <CardDescription>{t('customizationOptions.profileSection.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Camera className="w-5 h-5 text-blue-500" /> {t('customizationOptions.contentSection.title')}
                        </CardTitle>
                        <CardDescription>{t('customizationOptions.contentSection.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Camera className="w-5 h-5 text-blue-500" /> {t('customizationOptions.appearanceSection.title')}
                        </CardTitle>
                        <CardDescription>{t('customizationOptions.appearanceSection.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Camera className="w-5 h-5 text-blue-500" /> {t('customizationOptions.engagementSection.title')}
                        </CardTitle>
                        <CardDescription>{t('customizationOptions.engagementSection.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('tips.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t('tips.tip1')}</li>
                    <li>{t('tips.tip2')}</li>
                    <li>{t('tips.tip3')}</li>
                    <li>{t('tips.tip4')}</li>
                    <li>{t('tips.tip5')}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">{t('troubleshooting.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('troubleshooting.imageIssues.title')}</strong>: {t('troubleshooting.imageIssues.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.downloadProblems.title')}</strong>: {t('troubleshooting.downloadProblems.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.performanceIssues.title')}</strong>: {t('troubleshooting.performanceIssues.description')}
                    </li>
                </ul>
            </section>
        </div>
    )
}