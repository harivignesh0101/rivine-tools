'use client'

import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CheckCircle, Info } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { textToHandwriting } from "@/config/i18n-constants";
/**
 * Friendly end-user documentation for the Text to Handwriting tool.
 */
export default function TextToHandwritingDocumentation() {
    const t = useTranslations(`${textToHandwriting}.docs`)

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
                        <strong>{t('features.fonts.title')}</strong>: {t('features.fonts.description')}
                    </li>
                    <li>
                        <strong>{t('features.customization.title')}</strong>: {t('features.customization.description')}
                    </li>
                    <li>
                        <strong>{t('features.colorOptions.title')}</strong>: {t('features.colorOptions.description')}
                    </li>
                    <li>
                        <strong>{t('features.pageFormat.title')}</strong>: {t('features.pageFormat.description')}
                    </li>
                    <li>
                        <strong>{t('features.multiPage.title')}</strong>: {t('features.multiPage.description')}
                    </li>
                    <li>
                        <strong>{t('features.exportOptions.title')}</strong>: {t('features.exportOptions.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
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
                <h2 className="text-2xl font-semibold mb-2">{t('multiPage.title')}</h2>
                <p className="mb-4">{t('multiPage.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('multiPage.addPages.title')}</strong>: {t('multiPage.addPages.description')}
                    </li>
                    <li>
                        <strong>{t('multiPage.managingBook.title')}</strong>: {t('multiPage.managingBook.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('downloading.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('downloading.singlePage.title')}</strong>: {t('downloading.singlePage.description')}
                    </li>
                    <li>
                        <strong>{t('downloading.multiPage.title')}</strong>: {t('downloading.multiPage.description')}
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
                        <strong>{t('troubleshooting.layout.title')}</strong>: {t('troubleshooting.layout.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.download.title')}</strong>: {t('troubleshooting.download.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.rendering.title')}</strong>: {t('troubleshooting.rendering.description')}
                    </li>
                </ul>
            </section>
        </div>
    )
}