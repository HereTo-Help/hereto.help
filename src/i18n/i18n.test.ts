import { describe, expect, it } from 'vitest';
import i18n, { resolveLanguage } from './index';
import { resources } from './resources';
import { getImage, getProjects, getSiteContent } from '../services/content';
import { getReferences } from '../services/references';

function leaves(value: unknown, prefix = ''): Record<string, string> {
  if (typeof value === 'string') return { [prefix]: value };
  if (!value || typeof value !== 'object') return {};
  return Object.assign(
    {},
    ...Object.entries(value).map(([key, child]) =>
      leaves(child, prefix ? `${prefix}.${key}` : key),
    ),
  );
}

describe('German and English localisation', () => {
  it('keeps all translation keys and interpolation placeholders aligned', () => {
    const german = leaves(resources.de);
    const english = leaves(resources.en);
    Object.assign(german, leaves(getReferences('de'), 'references'));
    Object.assign(english, leaves(getReferences('en'), 'references'));
    expect(Object.keys(english).sort()).toEqual(Object.keys(german).sort());
    for (const key of Object.keys(german)) {
      if (german[key]) expect(english[key].trim(), key).not.toBe('');
      expect(english[key].match(/\{\{\w+\}\}/g) || [], key).toEqual(
        german[key].match(/\{\{\w+\}\}/g) || [],
      );
    }
  });
  it('keeps routes, project IDs, image assets and contact topic IDs stable across languages', () => {
    expect(
      getProjects('en').map((project) => [
        project.id,
        project.image,
        project.stage,
        project.url,
      ]),
    ).toEqual(
      getProjects('de').map((project) => [
        project.id,
        project.image,
        project.stage,
        project.url,
      ]),
    );
    expect(getSiteContent('en').navigation.map((item) => item.path)).toEqual(
      getSiteContent('de').navigation.map((item) => item.path),
    );
    expect(
      getReferences('en').map(({ id, image, logo }) => [id, image, logo]),
    ).toEqual(
      getReferences('de').map(({ id, image, logo }) => [id, image, logo]),
    );
    for (const reference of getReferences('en')) {
      expect(getImage(reference.image, 'en').file).toBe(
        getImage(reference.image, 'de').file,
      );
      expect(getImage(reference.image, 'en').alt).toContain('AI-generated');
    }
    expect(getSiteContent('en').services.map((item) => item.id)).toEqual(
      getSiteContent('de').services.map((item) => item.id),
    );
    expect(
      new Set(getSiteContent('de').services.map((item) => item.id)).size,
    ).toBe(getSiteContent('de').services.length);
    expect(
      getSiteContent('en').participation.map((item) => item.topic),
    ).toEqual(getSiteContent('de').participation.map((item) => item.topic));
    for (const project of getProjects('en')) {
      expect(getImage(project.image, 'en').file).toBe(
        getImage(project.image, 'de').file,
      );
      expect(getImage(project.image, 'en').alt).toContain('AI-generated');
    }
  });
  it('uses language-specific plural forms and a safe German fallback', () => {
    expect(i18n.getFixedT('en')('common.projectCount', { count: 1 })).toBe(
      '1 project',
    );
    expect(i18n.getFixedT('en')('common.projectCount', { count: 3 })).toBe(
      '3 projects',
    );
    expect(i18n.getFixedT('de')('common.projectCount', { count: 1 })).toBe(
      '1 Projekt',
    );
    expect(resolveLanguage('fr')).toBe('de');
    expect(resolveLanguage(null)).toBe('de');
    expect(resolveLanguage('en')).toBe('en');
  });
});
