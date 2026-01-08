import { type NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import {i18n} from "@/i18n/config";

// Middleware using next-intl
const intlMiddleware = createMiddleware({
    locales : i18n.locales,
    defaultLocale: i18n.defaultLocale,
    localePrefix: "as-needed", // doesn't force locale in path
});

export function proxy(request: NextRequest) {
    return intlMiddleware(request);
}

export const config = {
    matcher: [
        // Match all paths except static files
        "/((?!_next|api|.*\\.).*)",
    ],
};
