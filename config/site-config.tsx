import {LinkIcon, PhoneIcon, Type} from "lucide-react";
import {
    characterCounter,
    clock,
    general, image, imageMerge, json, jsonEditor,
    passwordGenerator,
    qrCodeGenerator,
    qrCodePhone,
    qrCodeText,
    qrCodeUrl, text, textCompare, textToHandwriting,
    timer, wordCounter
} from "@/config/i18n-constants";
import {Icons} from "@/components/custom/icons/icons";

interface ToolLink {
    href: string;
    label?: string;
    tLabel?: string;
    description?: string;
    tDescription?: string;
}

interface FeaturedTool {
    href?: string;
    label?: string;
    tLabel?: string;
    description?: string;
    tDescription?: string;
    icon?: string;
}

interface ToolNavItem {
    href?: string;
    label?: string;
    tLabel?: string;
    description?: string;
    tDescription?: string;
    featured?: FeaturedTool;
    links?: ToolLink[];
}

export const qrHomePath = "/qr-code-generator";
export const qrMenuItems = [
    {
        icon: LinkIcon,
        title: `${qrCodeUrl}.label`,
        href: `${qrHomePath}`,
    },
    {
        icon: Type,
        title: `${qrCodeText}.label`,
        href: `${qrHomePath}/text`,
    },
    {
        icon: PhoneIcon,
        title: `${qrCodePhone}.label`,
        href: `${qrHomePath}/phone`,
    },
]

export const passwordGeneratorPath = "/password-generator";

export const timerPath = "/timer";

export const textComparePath = "/text-compare";

export const jsonEditorPath = "/json-editor";

export const imageMergePath = "/image-merge";

export const textToHandwritingPath = "/text-to-handwriting";

export const characterCounterPath = "/character-counter";

export const wordCounterPath = "/word-counter";

export const toolsNavItems: ToolNavItem[] = [
    {
        label: "QR Code Generator",
        tLabel: `${qrCodeGenerator}.label`,
        description: "Create QR codes for URLs, text, phone numbers, and more.",
        tDescription: `${qrCodeGenerator}.navDescription`,
        featured: {
            href: qrHomePath,
            label: "QR Tool Generator Suite",
            tLabel: `${qrCodeGenerator}.subLabel`,
            description: "Generate all types of QR codes in one place.",
            tDescription: `${qrCodeGenerator}.subNavDescription`,
            icon: "qr",
        },
        links: [
            {
                label: "URL",
                tLabel: `${qrCodeUrl}.label`,
                href: qrHomePath,
                description: "Generate QR codes for links.",
                tDescription: `${qrCodeUrl}.navDescription`,
            },
            {
                label: "Text",
                tLabel: `${qrCodeText}.label`,
                href: `${qrHomePath}/text`,
                description: "Encode plain text into QR codes.",
                tDescription: `${qrCodeText}.navDescription`,
            },
            {
                label: "Phone",
                tLabel: `${qrCodePhone}.label`,
                href: `${qrHomePath}/phone`,
                description: "Generate QR codes to dial a number.",
                tDescription: `${qrCodePhone}.navDescription`,
            },
        ],
    },
    {
        label: "Image",
        tLabel: `${image}.label`,
        description: "image.",
        tDescription: `${image}.navDescription`,
        featured: {
            href: imageMergePath,
            label: "Image Suite",
            tLabel: `${image}.subLabel`,
            description: "Image.",
            tDescription: `${image}.subNavDescription`,
            icon: "qr",
        },
        links: [
            {
                label: "Merge images",
                tLabel: `${imageMerge}.label`,
                href: imageMergePath,
                description: "Image.",
                tDescription: `${imageMerge}.navDescription`,
            },
        ],
    },
    {
        label: "Text",
        tLabel: `${text}.label`,
        description: "Clocks",
        tDescription: `${text}.navDescription`,
        featured: {
            href: textComparePath,
            label: "Clock Suite",
            tLabel: `${text}.subLabel`,
            description: "clocks.",
            tDescription: `${text}.subNavDescription`,
        },
        links: [
            {
                label: "Text Compare",
                tLabel: `${textCompare}.label`,
                href: textComparePath,
                description: "clocks.",
                tDescription: `${textCompare}.navDescription`,
            },
            {
                label: "Text to Handwriting",
                tLabel: `${textToHandwriting}.label`,
                href: textToHandwritingPath,
                description: "Handwriting.",
                tDescription: `${textToHandwriting}.navDescription`,
            },
            {
                label: "Character Counter",
                tLabel: `${characterCounter}.label`,
                href: characterCounterPath,
                description: "Character counting.",
                tDescription: `${characterCounter}.navDescription`,
            },
            {
                label: "Word Counter",
                tLabel: `${wordCounter}.label`,
                href: wordCounterPath,
                description: "Word counting.",
                tDescription: `${wordCounter}.navDescription`,
            },
        ],
    },
    {
        label: "Password generator",
        tLabel: `${passwordGenerator}.label`,
        description: "Create secure passwords.",
        tDescription: `${passwordGenerator}.navDescription`,
        featured: {
            href: passwordGeneratorPath,
            label: "QR Tool Generator Suite",
            tLabel: `${passwordGenerator}.subLabel`,
            description: "Generate various passwords.",
            tDescription: `${passwordGenerator}.subNavDescription`,
            icon: "qr",
        },
        links: [
            {
                label: "Password Generator",
                tLabel: `${passwordGenerator}.label`,
                href: passwordGeneratorPath,
                description: "Generate QR codes for links.",
                tDescription: `${passwordGenerator}.navDescription`,
            },
        ],
    },
    {
        label: "Clock",
        tLabel: `${clock}.label`,
        description: "Clocks",
        tDescription: `${clock}.navDescription`,
        featured: {
            href: timerPath,
            label: "Clock Suite",
            tLabel: `${clock}.subLabel`,
            description: "clocks.",
            tDescription: `${clock}.subNavDescription`,
        },
        links: [
            {
                label: "Timer",
                tLabel: `${timer}.label`,
                href: timerPath,
                description: "clocks.",
                tDescription: `${timer}.navDescription`,
            },
        ],
    },
    {
        label: "JSON",
        tLabel: `${json}.title`,
        description: "JSON",
        tDescription: `${jsonEditor}.navDescription`,
        featured: {
            href: jsonEditorPath,
            label: "JSON Suite",
            tLabel: `${json}.subLabel`,
            description: "JSON.",
            tDescription: `${json}.subNavDescription`,
        },
        links: [
            {
                label: "JSON",
                tLabel: `${jsonEditor}.label`,
                href: jsonEditorPath,
                description: "JSON.",
                tDescription: `${jsonEditor}.navDescription`,
            },
        ],
    }
    // Add more tools here...
];



export const navButtons = [
    // { href: '', icon: "calendar-check", target: "_blank", tooltip: "Schedule a call"  },
    // { href: 'https://github.com/rivine-dev/rivine-tools', icon: "github", target: "_blank", tooltip: "Github"  },
    // { href: user.linkedIn, icon: "linkedin", target: "_blank" },
    //     tooltip: "linkedIn"}
]

export const navLinks = [
    // { href: "/projects", label: "Projects" },
    // { href: "/blog", label: "Blog" },
    // { href: "/experience", label: "Experience" },
    // { href: "/about", label: "About", tLabel: "general.about" },
    // { href: "/contributions", label: "Contributions" },
    // { href: "/contact", label: "Contact" },
] satisfies {
    href: string;
    label?: string;
    tLabel?: string;
}[];

export const footerMenuItems = [
    // {
    //     title: "Site",
    //     links: [
    //         { label: "Home", tLabel: `${general}.home`, href: "/" },
    //         ...navLinks
    //     ],
    // },
    // {
    //     title: "Support me",
    //     links: [
    //         { href: user.buymecoffee, label: 'Buy me a coffee', blank: true },
    //     ],
    // },
    // {
    //     title: "Talk to me",
    //     links: [
    //         { href: user.cal, label: 'Schedule a call', blank: true  },
    //     ],
    // },
    // {
    //     title: "Social",
    //     links: [
    //         { href: user.instagram, label: 'Instagram', blank: true  },
    //         { href: user.github, label: 'Github', blank: true  },
    //         { href: user.linkedIn, label: 'Linkedin', blank: true  },
    //     ],
    // },
]

export const footerBottomLinks = [
    // { label: "Terms and Conditions", url: "http://www.example.com/terms-and-conditions" },
    // { label: "Privacy Policy", url: "#" },
]

export const socialIcons = [
    {
        label: 'Instagram',
        icon: Icons.Instagram,
        url: 'https://www.instagram.com/rivine.dev/'
    },
    {
        label: 'Threads',
        icon: Icons.Threads,
        url: 'https://www.threads.net/@rivine.dev'
    },
]

export const publicUrl = process.env.PUBLIC_SITE_URL;

export const siteUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_VERCEL_URL || "https://tools.rivine.dev";

export const appName = process.env.APP_NAME || "Rivine Tools";

export const toolsCards = [
    {
        title: `${qrCodeGenerator}.label`,
        description: `${qrCodeGenerator}.description`,
        isActive: true,
        link: `${qrHomePath}`,
    },
    {
        title: `${passwordGenerator}.label`,
        description: `${passwordGenerator}.description`,
        isActive: true,
        link: `${passwordGeneratorPath}`,
    },
    {
        title: `${timer}.label`,
        description: `${timer}.description`,
        isActive: true,
        link: `${timerPath}`,
    },
    {
        title: `${textCompare}.label`,
        description: `${textCompare}.description`,
        isActive: true,
        link: `${textComparePath}`,
    },
    {
        title: `${jsonEditor}.label`,
        description: `${jsonEditor}.description`,
        isActive: true,
        link: `${jsonEditorPath}`,
    },
    {
        title: `${imageMerge}.label`,
        description: `${imageMerge}.description`,
        isActive: true,
        link:`${imageMergePath}`,
    },
    {
        title: `${textToHandwriting}.label`,
        description: `${textToHandwriting}.description`,
        isActive: true,
        link: `${textToHandwritingPath}`,
    },
    {
        title: `${characterCounter}.label`,
        description: `${characterCounter}.description`,
        isActive: true,
        link: `${characterCounterPath}`,
    },
    {
        title: `${wordCounter}.label`,
        description: `${wordCounter}.description`,
        isActive: true,
        link: `${wordCounterPath}`,
    },
];