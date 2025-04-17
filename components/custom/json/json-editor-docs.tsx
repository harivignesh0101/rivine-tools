'use client'

import React from 'react'
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { jsonEditor } from "@/config/i18n-constants";
/**
 * Friendly end-user documentation for the Rivine JSON Editor tool.
 */
export default function JSONEditorDocumentation() {
    const t = useTranslations(`${jsonEditor}.docs`)

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
                        <strong>{t('features.dualEditor.title')}</strong>: {t('features.dualEditor.description')}
                    </li>
                    <li>
                        <strong>{t('features.viewModes.title')}</strong>: {t('features.viewModes.description')}
                    </li>
                    <li>
                        <strong>{t('features.formatting.title')}</strong>: {t('features.formatting.description')}
                    </li>
                    <li>
                        <strong>{t('features.search.title')}</strong>: {t('features.search.description')}
                    </li>
                    <li>
                        <strong>{t('features.transform.title')}</strong>: {t('features.transform.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('modes.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('modes.code.title')}</CardTitle>
                        <CardDescription>{t('modes.code.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('modes.tree.title')}</CardTitle>
                        <CardDescription>{t('modes.tree.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('modes.table.title')}</CardTitle>
                        <CardDescription>{t('modes.table.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('modes.preview.title')}</CardTitle>
                        <CardDescription>{t('modes.preview.description')}</CardDescription>
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
                <h2 className="text-2xl font-semibold mb-2">{t('advancedFeatures.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('advancedFeatures.filter.title')}</strong>: {t('advancedFeatures.filter.description')}
                    </li>
                    <li>
                        <strong>{t('advancedFeatures.sort.title')}</strong>: {t('advancedFeatures.sort.description')}
                    </li>
                    <li>
                        <strong>{t('advancedFeatures.transform.title')}</strong>: {t('advancedFeatures.transform.description')}
                    </li>
                    <li>
                        <strong>{t('advancedFeatures.repair.title')}</strong>: {t('advancedFeatures.repair.description')}
                    </li>
                    <li>
                        <strong>{t('advancedFeatures.navigation.title')}</strong>: {t('advancedFeatures.navigation.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('exampleLabel')}</h2>
                <pre className="bg-muted p-3 rounded">{`{
  "name": "Rivine JSON Editor",
  "features": ["formatting", "tree view", "table view"],
  "isAwesome": true,
  "version": 1.0
}`}</pre>
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
                        <strong>{t('troubleshooting.invalidJson.title')}</strong>: {t('troubleshooting.invalidJson.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.performance.title')}</strong>: {t('troubleshooting.performance.description')}
                    </li>
                    {/*<li>*/}
                    {/*    <strong>{t('troubleshooting.dataLoss.title')}</strong>: {t('troubleshooting.dataLoss.description')}*/}
                    {/*</li>*/}
                </ul>
            </section>
        </div>
    )
}