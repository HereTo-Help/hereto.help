import deUI from '../locales/de/ui.json';
import enUI from '../locales/en/ui.json';
import deProjects from '../locales/de/projects.json';
import enProjects from '../locales/en/projects.json';
import deSite from '../locales/de/site.json';
import enSite from '../locales/en/site.json';
import deImages from '../locales/de/images.json';
import enImages from '../locales/en/images.json';

export const resources = {
  de: {
    ui: deUI,
    content: { projects: deProjects, site: deSite, images: deImages },
  },
  en: {
    ui: enUI,
    content: { projects: enProjects, site: enSite, images: enImages },
  },
};
export type Language = keyof typeof resources;
