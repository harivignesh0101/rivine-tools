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
import { textCompare } from "@/config/i18n-constants";
/**
 * Friendly end-user documentation for the Rivine Text Compare tool.
 */
export default function TextCompareDocumentation() {
    const t = useTranslations(`${textCompare}.docs`)

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
                        <strong>{t('features.dualView.title')}</strong>: {t('features.dualView.description')}
                    </li>
                    <li>
                        <strong>{t('features.comparisonModes.title')}</strong>: {t('features.comparisonModes.description')}
                    </li>
                    <li>
                        <strong>{t('features.realTime.title')}</strong>: {t('features.realTime.description')}
                    </li>
                    <li>
                        <strong>{t('features.fileUpload.title')}</strong>: {t('features.fileUpload.description')}
                    </li>
                    <li>
                        <strong>{t('features.merging.title')}</strong>: {t('features.merging.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('comparisonModes.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('comparisonModes.character.title')}</CardTitle>
                        <CardDescription>{t('comparisonModes.character.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('comparisonModes.word.title')}</CardTitle>
                        <CardDescription>{t('comparisonModes.word.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('comparisonModes.line.title')}</CardTitle>
                        <CardDescription>{t('comparisonModes.line.description')}</CardDescription>
                    </CardHeader>
                </Card>
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
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('merging.title')}</h2>
                <p className="mb-4">{t('merging.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('merging.mergeToRight.title')}</strong>: {t('merging.mergeToRight.description')}
                    </li>
                    <li>
                        <strong>{t('merging.mergeToLeft.title')}</strong>: {t('merging.mergeToLeft.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('exampleLabel')}</h2>
                <div className="grid grid-cols-2 gap-4 bg-muted p-3 rounded">
                    <div>
                        <p className="font-semibold mb-1">{t('exampleLeft')}</p>
                        <p>This is an <span className="bg-red-200 px-1">old</span> example text.</p>
                    </div>
                    <div>
                        <p className="font-semibold mb-1">{t('exampleRight')}</p>
                        <p>This is an <span className="bg-green-200 px-1">updated</span> example text.</p>
                    </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{t('exampleNote')}</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('tips.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t('tips.tip1')}</li>
                    <li>{t('tips.tip2')}</li>
                    <li>{t('tips.tip3')}</li>
                    <li>{t('tips.tip4')}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">{t('troubleshooting.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('troubleshooting.largeFiles.title')}</strong>: {t('troubleshooting.largeFiles.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.formatting.title')}</strong>: {t('troubleshooting.formatting.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.encoding.title')}</strong>: {t('troubleshooting.encoding.description')}
                    </li>
                </ul>
            </section>
        </div>
    )
}