import { company } from './company';

export const SITE_URL = 'https://wolfway.pages.dev';
export const DEFAULT_OG_IMAGE = '/images/og-default-v2.jpg';

export function absoluteUrl(path = '/'): string {
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, SITE_URL).toString();
}

export function organizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: company.name,
    url: SITE_URL,
    logo: absoluteUrl('/images/logo_icon.png'),
    image: absoluteUrl(DEFAULT_OG_IMAGE),
    description: company.description,
    email: company.email,
    telephone: company.phone,
    areaServed: 'United States',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: company.phone,
        contactType: 'customer support',
        areaServed: 'US',
        availableLanguage: ['English'],
      },
    ],
  };
}

export function websiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: company.name,
    url: SITE_URL,
    publisher: {
      '@type': 'Organization',
      name: company.name,
    },
  };
}

export function webPageSchema(name: string, description: string, url: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: company.name,
      url: SITE_URL,
    },
  };
}
