'use client'

import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CheckCircle, Image, AlertTriangle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { imageMerge } from "@/config/i18n-constants";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert";

/**
 * Friendly end-user documentation for the Image Merger tool.
 */
export default function ImageMergerDocumentation() {
    const t = useTranslations(`${imageMerge}.docs`)

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-base leading-relaxed">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-muted-foreground mb-8">{t('intro')}</p>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('whatIs.title')}</h2>
                <p>{t('whatIs.description')}</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('features.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('features.multipleImages.title')}</strong>: {t('features.multipleImages.description')}
                    </li>
                    <li>
                        <strong>{t('features.positionOptions.title')}</strong>: {t('features.positionOptions.description')}
                    </li>
                    <li>
                        <strong>{t('features.sizeControl.title')}</strong>: {t('features.sizeControl.description')}
                    </li>
                    <li>
                        <strong>{t('features.borderOptions.title')}</strong>: {t('features.borderOptions.description')}
                    </li>
                    <li>
                        <strong>{t('features.imageSettings.title')}</strong>: {t('features.imageSettings.description')}
                    </li>
                </ul>
            </section>

            <Alert>
                <AlertTitle>
                    {t('imageLimit.title')}
                </AlertTitle>
                <AlertDescription>
                    {t('imageLimit.description')}
                </AlertDescription>
            </Alert>

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

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <CheckCircle className="w-5 h-5 text-green-500" /> {t('steps.step6.title')}
                        </CardTitle>
                        <CardDescription>{t('steps.step6.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('positionModes.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Image className="w-5 h-5 text-blue-500" /> {t('positionModes.horizontal.title')}
                        </CardTitle>
                        <CardDescription>{t('positionModes.horizontal.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Image className="w-5 h-5 text-blue-500" /> {t('positionModes.vertical.title')}
                        </CardTitle>
                        <CardDescription>{t('positionModes.vertical.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Image className="w-5 h-5 text-blue-500" /> {t('positionModes.grid.title')}
                        </CardTitle>
                        <CardDescription>{t('positionModes.grid.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('sizeOptions.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('sizeOptions.fitToSmallest.title')}</CardTitle>
                        <CardDescription>{t('sizeOptions.fitToSmallest.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('sizeOptions.matchLargest.title')}</CardTitle>
                        <CardDescription>{t('sizeOptions.matchLargest.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('sizeOptions.originalSize.title')}</CardTitle>
                        <CardDescription>{t('sizeOptions.originalSize.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('borderOptions.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('borderOptions.width.title')}</strong>: {t('borderOptions.width.description')}
                    </li>
                    <li>
                        <strong>{t('borderOptions.color.title')}</strong>: {t('borderOptions.color.description')}
                    </li>
                    <li>
                        <strong>{t('borderOptions.style.title')}</strong>: {t('borderOptions.style.description')}
                    </li>
                </ul>
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
                        <strong>{t('troubleshooting.notMerging.title')}</strong>: {t('troubleshooting.notMerging.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.qualityIssues.title')}</strong>: {t('troubleshooting.qualityIssues.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.layoutProblems.title')}</strong>: {t('troubleshooting.layoutProblems.description')}
                    </li>
                </ul>
            </section>
        </div>
    )
}