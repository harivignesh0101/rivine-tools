'use client'

import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CheckCircle, AlignJustify } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { wordCounter } from "@/config/i18n-constants"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

/**
 * Friendly end-user documentation for the Word Counter tool.
 */
export default function WordCounterDocumentation() {
    const t = useTranslations(`${wordCounter}.docs`)

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
                        <strong>{t('features.realTimeCount.title')}</strong>: {t('features.realTimeCount.description')}
                    </li>
                    <li>
                        <strong>{t('features.filterOptions.title')}</strong>: {t('features.filterOptions.description')}
                    </li>
                    <li>
                        <strong>{t('features.wordLength.title')}</strong>: {t('features.wordLength.description')}
                    </li>
                    <li>
                        <strong>{t('features.wordTypes.title')}</strong>: {t('features.wordTypes.description')}
                    </li>
                    <li>
                        <strong>{t('features.trimWhitespace.title')}</strong>: {t('features.trimWhitespace.description')}
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
                <h2 className="text-2xl font-semibold mb-4">{t('countingOptions.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlignJustify className="w-5 h-5 text-blue-500" /> {t('countingOptions.stopAtWord.title')}
                        </CardTitle>
                        <CardDescription>{t('countingOptions.stopAtWord.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlignJustify className="w-5 h-5 text-blue-500" /> {t('countingOptions.minWordLength.title')}
                        </CardTitle>
                        <CardDescription>{t('countingOptions.minWordLength.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlignJustify className="w-5 h-5 text-blue-500" /> {t('countingOptions.maxWordLength.title')}
                        </CardTitle>
                        <CardDescription>{t('countingOptions.maxWordLength.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <AlignJustify className="w-5 h-5 text-blue-500" /> {t('countingOptions.trimText.title')}
                        </CardTitle>
                        <CardDescription>{t('countingOptions.trimText.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('wordTypes.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('wordTypes.ignoreCommonWords.title')}</CardTitle>
                        <CardDescription>{t('wordTypes.ignoreCommonWords.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('wordTypes.countNumbers.title')}</CardTitle>
                        <CardDescription>{t('wordTypes.countNumbers.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('wordTypes.countHyphenatedAsOne.title')}</CardTitle>
                        <CardDescription>{t('wordTypes.countHyphenatedAsOne.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('wordTypes.countAbbreviations.title')}</CardTitle>
                        <CardDescription>{t('wordTypes.countAbbreviations.description')}</CardDescription>
                    </CardHeader>
                </Card>
            </section>

            <Alert className="mb-10">
                <AlertTitle>
                    {t('preview.title')}
                </AlertTitle>
                <AlertDescription>
                    {t('preview.description')}
                </AlertDescription>
            </Alert>

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
                        <strong>{t('troubleshooting.unexpectedCount.title')}</strong>: {t('troubleshooting.unexpectedCount.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.filterInteraction.title')}</strong>: {t('troubleshooting.filterInteraction.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.performanceIssues.title')}</strong>: {t('troubleshooting.performanceIssues.description')}
                    </li>
                </ul>
            </section>
        </div>
    )
}