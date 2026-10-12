import { PassThrough } from 'node:stream';
import { renderToPipeableStream } from 'react-dom/server';
import { Theme } from '@radix-ui/themes';
import { App } from './App';
import i18n from './i18n';
import type { Language } from './i18n/resources';
import { getSiteContent, getProjects, getUIContent } from './services/content';
import { getReferences } from './services/references';
export { getPageMetadata, getPublishedPaths, siteOrigin } from './services/seo';
export { localizedPath } from './services/routes';

export function getAgentContent(language: Language) {
  const ui = getUIContent(language);
  return {
    language,
    name: 'Here to Help',
    description: ui.common.metaDescription,
    legalStatus: ui.aboutPage.legalStatus,
    funding: ui.joinPage.fundingModel,
    fundingNotice: ui.joinPage.fundingNotice,
    fairPay: ui.joinPage.fairPay,
    contactNotice: ui.contactPage.pendingAddress,
    privacy: ui.contactPage.privacy,
    imageDisclosure: ui.layout.imageDisclosure,
    servicesScope: ui.servicesPage.scope,
    site: getSiteContent(language),
    projects: getProjects(language),
    references: getReferences(language),
  };
}
export async function render(
  path: string,
  language: Language,
): Promise<string> {
  await i18n.changeLanguage(language);
  return new Promise((resolve, reject) => {
    const output = new PassThrough();
    const chunks: Buffer[] = [];
    output.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    output.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    output.on('error', reject);
    const stream = renderToPipeableStream(
      <Theme accentColor="teal" grayColor="slate" radius="large" scaling="100%">
        <App initialRoute={path} />
      </Theme>,
      {
        onAllReady() {
          stream.pipe(output);
        },
        onError: reject,
        onShellError: reject,
      },
    );
  });
}
