import type { MetadataRoute } from 'next'
import {
    characterCounterPath,
    imageMergePath,
    jsonEditorPath,
    passwordGeneratorPath,
    qrHomePath,
    siteUrl,
    textComparePath, textToHandwritingPath,
    timerPath, wordCounterPath
} from '@/config/site-config'
import {supportedLanguages} from "@/i18n/config";

const getAlternates = (basePath: string) => ({
    languages: Object.fromEntries(
        supportedLanguages
            .filter((lang) => !lang.default) // skip default
            .map((lang) => [lang.code, `${siteUrl}/${lang.code}${basePath}`])
    ),
})

export default function sitemap(): MetadataRoute.Sitemap {
    return [
        {
            url: siteUrl,
            lastModified: new Date(),
            alternates: getAlternates(''),
        },
        {
            url: `${siteUrl}${qrHomePath}`,
            lastModified: new Date(),
            alternates: getAlternates(qrHomePath),
        },
        {
            url: `${siteUrl}${qrHomePath}/phone`,
            lastModified: new Date(),
            alternates: getAlternates(`${qrHomePath}/phone`),
        },
        {
            url: `${siteUrl}${qrHomePath}/text`,
            lastModified: new Date(),
            alternates: getAlternates(`${qrHomePath}/text`),
        },
        {
            url: `${siteUrl}${passwordGeneratorPath}`,
            lastModified: new Date(),
            alternates: getAlternates(passwordGeneratorPath),
        },
        {
            url: `${siteUrl}${timerPath}`,
            lastModified: new Date(),
            alternates: getAlternates(timerPath),
        },
        {
            url: `${siteUrl}${textComparePath}`,
            lastModified: new Date(),
            alternates: getAlternates(textComparePath),
        },
        {
            url: `${siteUrl}${jsonEditorPath}`,
            lastModified: new Date(),
            alternates: getAlternates(jsonEditorPath),
        },
        {
            url: `${siteUrl}${imageMergePath}`,
            lastModified: new Date(),
            alternates: getAlternates(imageMergePath),
        },
        {
            url: `${siteUrl}${textToHandwritingPath}`,
            lastModified: new Date(),
            alternates: getAlternates(textToHandwritingPath),
        },
        {
            url: `${siteUrl}${characterCounterPath}`,
            lastModified: new Date(),
            alternates: getAlternates(characterCounterPath),
        },
        {
            url: `${siteUrl}${wordCounterPath}`,
            lastModified: new Date(),
            alternates: getAlternates(wordCounterPath),
        },
    ]
}
