'use client'

import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CheckCircle } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {qrCodeGenerator} from "@/config/i18n-constants";

export default function QrCodeGeneratorDocumentation() {
    const t = useTranslations(`${qrCodeGenerator}.docs`)

    return (
        <div className="max-w-3xl mx-auto px-4 py-10 text-base leading-relaxed">
            <h1 className="text-4xl font-bold mb-4">{t('title')}</h1>
            <p className="text-muted-foreground mb-8">{t('intro')}</p>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('whatIs.title')}</h2>
                <p>{t('whatIs.description')}</p>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('whatCanYouCreate.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>{t('whatCanYouCreate.url.title')}</strong> {t('whatCanYouCreate.url.description')}</li>
                    <li><strong>{t('whatCanYouCreate.text.title')}</strong> {t('whatCanYouCreate.text.description')}</li>
                    <li><strong>{t('whatCanYouCreate.phone.title')}</strong> {t('whatCanYouCreate.phone.description')}</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('steps.title')}</h2>

                {Array.from({ length: 5 }, (_, i) => (
                    <Card className="mb-4" key={i}>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-500" /> {t(`steps.step${i + 1}.title`)}
                            </CardTitle>
                            <CardDescription>{t(`steps.step${i + 1}.description`)}</CardDescription>
                        </CardHeader>
                        {i === 1 && (
                            <CardContent>
                                <p className="italic text-sm mb-1">{t('steps.exampleLabel')}</p>
                                <pre className="bg-muted p-3 rounded">https://tools.rivine.dev</pre>
                            </CardContent>
                        )}
                        {i === 4 && (
                            <CardContent>
                                <Button size="sm">{t('steps.downloadButton')}</Button>
                            </CardContent>
                        )}
                    </Card>
                ))}
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('tips.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    {Array.from({ length: 4 }, (_, i) => (
                        <li key={i}>{t(`tips.tip${i + 1}`)}</li>
                    ))}
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">{t('troubleshooting.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li><strong>{t('troubleshooting.qrNotShowing.title')}</strong> {t('troubleshooting.qrNotShowing.description')}</li>
                    <li><strong>{t('troubleshooting.downloadNotWorking.title')}</strong> {t('troubleshooting.downloadNotWorking.description')}</li>
                </ul>
            </section>
        </div>
    )
}
