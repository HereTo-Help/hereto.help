import type { Language } from '../i18n/resources';

export function localizedPath(path: string, language: Language): string {
  const clean = path === '/' ? '' : path.replace(/^\/|\/$/g, '');
  return (language === 'en' ? '/en/' : '/') + (clean ? clean + '/' : '');
}

export function readLocation(url: URL) {
  const legacy = url.hash.startsWith('#/');
  const route = legacy ? url.hash.slice(1) : url.pathname + url.search;
  const [rawPath, query = ''] = route.split('?');
  const english = rawPath === '/en' || rawPath.startsWith('/en/');
  const path = (english ? rawPath.slice(3) : rawPath).replace(/\/$/, '') || '/';
  const params = new URLSearchParams(query);
  const language: Language =
    english || url.searchParams.get('lang') === 'en' ? 'en' : 'de';
  params.delete('lang');
  return { path, params, language, legacy };
}
