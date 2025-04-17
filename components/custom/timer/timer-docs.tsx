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
import { timer } from "@/config/i18n-constants";
/**
 * Friendly end-user documentation for the Rivine Timer tool.
 */
export default function TimerDocumentation() {
    const t = useTranslations(`${timer}.docs`)

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
                        <strong>{t('features.visualTimer.title')}</strong>: {t('features.visualTimer.description')}
                    </li>
                    <li>
                        <strong>{t('features.presets.title')}</strong>: {t('features.presets.description')}
                    </li>
                    <li>
                        <strong>{t('features.custom.title')}</strong>: {t('features.custom.description')}
                    </li>
                    <li>
                        <strong>{t('features.controls.title')}</strong>: {t('features.controls.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-4">{t('presets.title')}</h2>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('presets.pomodoro.title')}</CardTitle>
                        <CardDescription>{t('presets.pomodoro.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('presets.shortBreak.title')}</CardTitle>
                        <CardDescription>{t('presets.shortBreak.description')}</CardDescription>
                    </CardHeader>
                </Card>

                <Card className="mb-4">
                    <CardHeader>
                        <CardTitle>{t('presets.focus.title')}</CardTitle>
                        <CardDescription>{t('presets.focus.description')}</CardDescription>
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
                <h2 className="text-2xl font-semibold mb-2">{t('controls.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('controls.play.title')}</strong>: {t('controls.play.description')}
                    </li>
                    <li>
                        <strong>{t('controls.pause.title')}</strong>: {t('controls.pause.description')}
                    </li>
                    <li>
                        <strong>{t('controls.reset.title')}</strong>: {t('controls.reset.description')}
                    </li>
                    <li>
                        <strong>{t('controls.settings.title')}</strong>: {t('controls.settings.description')}
                    </li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('customTimer.title')}</h2>
                <p className="mb-4">{t('customTimer.description')}</p>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t('customTimer.step1')}</li>
                    <li>{t('customTimer.step2')}</li>
                    <li>{t('customTimer.step3')}</li>
                </ul>
            </section>

            <section className="mb-10">
                <h2 className="text-2xl font-semibold mb-2">{t('tips.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>{t('tips.tip1')}</li>
                    <li>{t('tips.tip2')}</li>
                    <li>{t('tips.tip3')}</li>
                </ul>
            </section>

            <section>
                <h2 className="text-2xl font-semibold mb-2">{t('troubleshooting.title')}</h2>
                <ul className="list-disc pl-6 space-y-2">
                    <li>
                        <strong>{t('troubleshooting.timerNotStarting.title')}</strong>: {t('troubleshooting.timerNotStarting.description')}
                    </li>
                    <li>
                        <strong>{t('troubleshooting.notification.title')}</strong>: {t('troubleshooting.notification.description')}
                    </li>
                </ul>
            </section>
        </div>
    )
}