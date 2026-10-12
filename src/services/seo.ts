import config from '../config/site.json';
import { getImage, getProject, getProjects, getSEOContent } from './content';
import { localizedPath } from './routes';
import type { Language } from '../i18n/resources';

export const siteOrigin = config.origin;
export function getPublishedPaths() {
  return [
    ...Object.keys(getSEOContent('de').pages),
    ...getProjects('de').map((project) => '/projekte/' + project.id),
  ];
}
export function getPageMetadata(path: string, language: Language) {
  const project = path.startsWith('/projekte/')
    ? getProject(path.slice(10), language)
    : undefined;
  const pages = getSEOContent(language).pages;
  const page = Object.hasOwn(pages, path)
    ? pages[path as keyof typeof pages]
    : undefined;
  const found = !!(page || project);
  const title =
    (project?.name ||
      page?.title ||
      (language === 'de' ? 'Seite nicht gefunden' : 'Page not found')) +
    ' — Here to Help';
  const description = project
    ? project.summary + ' ' + project.status + '.'
    : page?.description ||
      (language === 'de'
        ? 'Diese Seite gibt es nicht.'
        : 'This page does not exist.');
  const url = siteOrigin + localizedPath(path, language);
  const imageFile = project
    ? getImage(project.image, language).file
    : 'collaboration';
  const image = siteOrigin + '/images/social/' + imageFile + '.jpg';
  const imageAlt = getImage(project?.image || 'collaboration', language).alt;
  const alternates = ['de', 'en'].map((lang) => ({
    language: lang === 'de' ? 'de-CH' : 'en',
    url: siteOrigin + localizedPath(path, lang as Language),
  }));
  const website = {
    '@type': 'WebSite',
    '@id': siteOrigin + '/#website',
    name: 'Here to Help',
    url: siteOrigin + '/',
    inLanguage: ['de-CH', 'en'],
  };
  const webpage = {
    '@type': 'WebPage',
    '@id': url + '#webpage',
    url,
    name: title,
    description,
    inLanguage: language === 'de' ? 'de-CH' : 'en',
    isPartOf: { '@id': website['@id'] },
    ...(project
      ? {
          mainEntity: {
            '@type': 'CreativeWork',
            name: project.name,
            description: project.description + ' ' + project.notice,
            creativeWorkStatus: project.status,
            url,
          },
        }
      : {}),
  };
  return {
    title,
    description,
    url,
    image,
    imageAlt,
    found,
    language,
    alternates,
    structuredData: {
      '@context': 'https://schema.org',
      '@graph': [website, webpage],
    },
  };
}
export type PageMetadata = ReturnType<typeof getPageMetadata>;

export function updateDocumentMetadata(metadata: PageMetadata) {
  document.title = metadata.title;
  document.documentElement.lang = metadata.language === 'de' ? 'de-CH' : 'en';
  const setMeta = (attribute: string, key: string, value: string) => {
    let element = document.head.querySelector<HTMLMetaElement>(
      'meta[' + attribute + '="' + key + '"]',
    );
    if (!element) {
      element = document.createElement('meta');
      element.setAttribute(attribute, key);
      document.head.append(element);
    }
    element.content = value;
  };
  const setLink = (rel: string, href: string, language?: string) => {
    const selector =
      'link[rel="' +
      rel +
      '"]' +
      (language ? '[hreflang="' + language + '"]' : '');
    let element = document.head.querySelector<HTMLLinkElement>(selector);
    if (!element) {
      element = document.createElement('link');
      element.rel = rel;
      if (language) element.hreflang = language;
      document.head.append(element);
    }
    element.href = href;
  };
  setMeta('name', 'description', metadata.description);
  setMeta(
    'name',
    'robots',
    metadata.found ? 'index,follow,max-image-preview:large' : 'noindex,follow',
  );
  setLink('canonical', metadata.url);
  metadata.alternates.forEach((alternate) =>
    setLink('alternate', alternate.url, alternate.language),
  );
  setLink('alternate', metadata.alternates[0].url, 'x-default');
  for (const [key, value] of Object.entries({
    'og:type': 'website',
    'og:site_name': 'Here to Help',
    'og:title': metadata.title,
    'og:description': metadata.description,
    'og:url': metadata.url,
    'og:image': metadata.image,
    'og:image:alt': metadata.imageAlt,
    'og:locale': metadata.language === 'de' ? 'de_CH' : 'en_GB',
    'og:locale:alternate': metadata.language === 'de' ? 'en_GB' : 'de_CH',
    'og:image:width': '1200',
    'og:image:height': '630',
  }))
    setMeta('property', key, value);
  for (const [key, value] of Object.entries({
    'twitter:card': 'summary_large_image',
    'twitter:title': metadata.title,
    'twitter:description': metadata.description,
    'twitter:image': metadata.image,
    'twitter:image:alt': metadata.imageAlt,
  }))
    setMeta('name', key, value);
  let data = document.getElementById('structured-data');
  if (!data) {
    data = document.createElement('script');
    data.id = 'structured-data';
    data.setAttribute('type', 'application/ld+json');
    document.head.append(data);
  }
  data.textContent = JSON.stringify(metadata.structuredData);
}
