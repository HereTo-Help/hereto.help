import deReferences from '../locales/de/references.json';
import enReferences from '../locales/en/references.json';
import { getLanguage } from '../i18n';
import type { Language } from '../i18n/resources';

export function getReferences(language: Language = getLanguage()) {
  return language === 'de' ? deReferences : enReferences;
}
