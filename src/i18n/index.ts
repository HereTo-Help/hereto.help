import { localizedPath, readLocation } from '../services/routes';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { resources, type Language } from './resources';

export const supportedLanguages = ['de', 'en'] as const;

export function resolveLanguage(value: string | null | undefined): Language {
  return value === 'en' ? 'en' : 'de';
}

function languageFromUrl(): Language {
  return typeof window === 'undefined'
    ? 'de'
    : readLocation(new URL(window.location.href)).language;
}

void i18n.use(initReactI18next).init({
  resources,
  lng: languageFromUrl(),
  fallbackLng: 'de',
  supportedLngs: supportedLanguages,
  defaultNS: 'ui',
  ns: ['ui', 'content'],
  initAsync: false,
  interpolation: { escapeValue: false },
  returnNull: false,
});

export function getLanguage(): Language {
  return resolveLanguage(i18n.resolvedLanguage);
}

export async function changeLanguage(language: Language) {
  if (getLanguage() === language) return;
  const url = new URL(window.location.href);
  const { path, params } = readLocation(url);
  url.pathname = localizedPath(path, language);
  url.search = params.toString();
  url.hash = '';
  window.history.pushState(null, '', url);
  await i18n.changeLanguage(language);
  window.dispatchEvent(new Event('routechange'));
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    void i18n.changeLanguage(languageFromUrl());
  });
}

export default i18n;
