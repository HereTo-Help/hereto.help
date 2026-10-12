import { describe, expect, it } from 'vitest';
import { localizedPath, readLocation } from './routes';
import { getPageMetadata, getPublishedPaths } from './seo';

describe('public discovery and link migration', () => {
  it('preserves contact topics and language in old shared links', () => {
    const old = readLocation(
      new URL(
        'https://hereto.help/?lang=en#/kontakt?thema=support:family-butler',
      ),
    );
    expect(old.path).toBe('/kontakt');
    expect(old.language).toBe('en');
    expect(old.params.get('thema')).toBe('support:family-butler');
    expect(localizedPath(old.path, old.language)).toBe('/en/kontakt/');
    const clean = readLocation(
      new URL('https://hereto.help/en/projekte/family-butler/'),
    );
    expect(clean.path).toBe('/projekte/family-butler');
    expect(clean.language).toBe('en');
    expect(clean.legacy).toBe(false);
  });
  it('gives every public page distinct canonical URLs and titles in both languages', () => {
    for (const language of ['de', 'en'] as const) {
      const pages = getPublishedPaths().map((path) =>
        getPageMetadata(path, language),
      );
      expect(new Set(pages.map((page) => page.url)).size).toBe(pages.length);
      expect(new Set(pages.map((page) => page.title)).size).toBe(pages.length);
      for (const page of pages) {
        expect(page.found).toBe(true);
        expect(page.description).toBeTruthy();
        expect(page.url).not.toContain('#');
        expect(page.url).not.toContain('?');
        expect(page.alternates.map((alternate) => alternate.language)).toEqual([
          'de-CH',
          'en',
        ]);
      }
    }
  });
  it('keeps project availability and draft status visible to machines', () => {
    const idea = getPageMetadata('/projekte/safe-steps', 'de');
    expect(idea.description).toContain('Projektidee');
    expect(JSON.stringify(idea.structuredData)).toContain(
      'noch kein verfügbares',
    );
    expect(getPageMetadata('/statuten', 'en').description).toContain(
      'Not yet adopted',
    );
    expect(getPageMetadata('/projekte/missing', 'de').found).toBe(false);
    expect(getPageMetadata('/missing', 'en').found).toBe(false);
  });
});
