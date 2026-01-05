/**
 * MetaTags component for SEO
 * Uses react-helmet-async to update document head with dynamic meta tags
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEOMetadata } from './types/seo';

interface MetaTagsProps {
  seo: SEOMetadata;
}

export function MetaTags({ seo }: MetaTagsProps) {
  const htmlLocale = seo.locale === 'zh-cn' ? 'zh-CN' : 'en';

  return (
    <Helmet>
      {/* HTML lang attribute */}
      <html lang={htmlLocale} />

      {/* Basic meta tags */}
      <title>{seo.title}</title>
      {seo.description && <meta name="description" content={seo.description} />}
      {seo.keywords && <meta name="keywords" content={seo.keywords} />}

      {/* Robots meta tag */}
      {seo.noindex ? <meta name="robots" content="noindex, nofollow" /> : <meta name="robots" content="index, follow" />}

      {/* Canonical URL */}
      <link rel="canonical" href={seo.canonical} />

      {/* Hreflang tags for bilingual SEO */}
      {seo.hreflang.map(entry => (
        <link key={entry.locale} rel="alternate" hrefLang={entry.locale} href={entry.href} />
      ))}

      {/* Open Graph meta tags */}
      <meta property="og:title" content={seo.og.title} />
      <meta property="og:description" content={seo.og.description} />
      <meta property="og:image" content={seo.og.image} />
      <meta property="og:type" content={seo.og.type} />
      <meta property="og:url" content={seo.og.url} />

      {/* Twitter Card meta tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.og.title} />
      <meta name="twitter:description" content={seo.og.description} />
      <meta name="twitter:image" content={seo.og.image} />

      {/* JSON-LD structured data */}
      {seo.structuredData && <script type="application/ld+json">{JSON.stringify(seo.structuredData)}</script>}
    </Helmet>
  );
}
