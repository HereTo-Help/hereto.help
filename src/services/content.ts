import type { Project } from '../types/content';
import { getLanguage } from '../i18n';
import { resources, type Language } from '../i18n/resources';

export function getImage(id: string, language: Language = getLanguage()) {
  const imageData = resources[language].content.images;
  if (!Object.hasOwn(imageData, id))
    throw new Error(`Unknown editorial image: ${id}`);
  return imageData[id as keyof typeof imageData];
}

// Keep the content source behind this boundary so a future API can replace JSON.
export function getProjects(
  language: Language = getLanguage(),
): readonly Project[] {
  return resources[language].content.projects;
}
export function getProject(
  id: string,
  language: Language = getLanguage(),
): Project | undefined {
  return getProjects(language).find((project) => project.id === id);
}
export function getSiteContent(language: Language = getLanguage()) {
  return resources[language].content.site;
}
