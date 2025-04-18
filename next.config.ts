import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-eval' 'unsafe-inline';
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
  style-src-elem 'self' 'unsafe-inline' https://fonts.googleapis.com;
  font-src 'self' https://fonts.gstatic.com https://cdn.jsdelivr.net data:;
  connect-src 'self' https://fonts.gstatic.com https://fonts.googleapis.com https://cdn.jsdelivr.net;
  img-src 'self' blob: data:;
  object-src 'none';
  base-uri 'self';
  form-action 'self';
  frame-src 'none';
  frame-ancestors 'none';
  upgrade-insecure-requests;
`;

const securityHeaders = [
    {
        key: 'Content-Security-Policy',
        value: cspHeader.replace(/\n/g, '').trim(),
    },
];

const nextConfig: NextConfig = {
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: securityHeaders,
            },
        ];
    },
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
