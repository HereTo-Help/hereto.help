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
    : resolveLanguage(new URL(window.location.href).searchParams.get('lang'));
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
  url.searchParams.set('lang', language);
  window.history.pushState(null, '', url);
  await i18n.changeLanguage(language);
}

if (typeof window !== 'undefined') {
  window.addEventListener('popstate', () => {
    void i18n.changeLanguage(languageFromUrl());
  });
}

export default i18n;
