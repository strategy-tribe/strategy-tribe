/** @type {import('next').NextConfig} */

const ContentSecurityPolicy = `
  default-src 'self' fonts.googleapis.com fonts.gstatic.com vitals.vercel-insights.com;
  style-src 'self' 'unsafe-inline' *;
  style-src-elem 'self' 'unsafe-inline' *;
  img-src 'self' data:;
  script-src 'self' 'unsafe-eval' https://www.unpkg.com/moralis/package.json;
  script-src-elem 'self' cdn.onesignal.com onesignal.com https://www.unpkg.com/moralis/package.json;
  connect-src 'self' https://www.unpkg.com/moralis/package.json https://8ujfwmevx5cc.usemoralis.com:2053 https://internal-api.moralis.io https://gb5qrt1xtz9b.usemoralis.com:2053;
  `
  .replace(/\s{2,}/g, ' ')
  .trim();

const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: ContentSecurityPolicy,
  },
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  },
];

const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  reactStrictMode: true,
  images: {
    domains: ['ul1np2i8ycs9.usemoralis.com', '8ujfwmevx5cc.usemoralis.com'],
  },
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
};

module.exports = nextConfig;
