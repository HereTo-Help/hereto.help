import type deUI from '../locales/de/ui.json';
import type { resources } from './resources';

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'ui';
    resources: { ui: typeof deUI; content: typeof resources.de.content };
    returnNull: false;
  }
}
