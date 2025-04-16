export const supportedLanguages = [
    {
        code: 'en',
        label: 'English',
        default: true
    },
    {
        code: 'es',
        label: 'Español (Spanish)'
    },
    {
        code: 'ta',
        label: 'தமிழ் (Tamil)'
    },
    {
        code: 'pt',
        label: 'Português (Portuguese)'
    }
]

export const i18n = {
    locales: supportedLanguages.map(({ code }) => code),
    defaultLocale: supportedLanguages.find(({ default: isDefault }) => isDefault)?.code ?? 'en'
} as const