import { useEffect } from 'react';

const SITE_NAME = 'Round Robin Distributor';
const SITE_URL = import.meta.env.VITE_SITE_URL || '';
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

function setMeta(attr, key, content) {
  if (!content) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function setJsonLd(id, data) {
  let el = document.getElementById(id);
  if (!data) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('script');
    el.type = 'application/ld+json';
    el.id = id;
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(data);
}

/**
 * Per-page SEO manager. Renders nothing; imperatively syncs document head
 * tags on mount/route change since this project has no server-side render step.
 */
export default function SEO({
  title,
  description,
  slug = '/',
  keywords,
  robots = 'index, follow',
  ogImage = DEFAULT_OG_IMAGE,
  ogType = 'website',
  structuredData,
}) {
  const canonical = `${SITE_URL}${slug}`;
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;

  useEffect(() => {
    document.title = fullTitle;

    setMeta('name', 'description', description);
    setMeta('name', 'robots', robots);
    if (keywords) setMeta('name', 'keywords', keywords);

    setLink('canonical', canonical);

    setMeta('property', 'og:title', fullTitle);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:type', ogType);
    setMeta('property', 'og:url', canonical);
    setMeta('property', 'og:image', ogImage);
    setMeta('property', 'og:site_name', SITE_NAME);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:title', fullTitle);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', ogImage);

    setJsonLd('page-structured-data', structuredData);
  }, [fullTitle, description, robots, keywords, canonical, ogImage, ogType, structuredData]);

  return null;
}
