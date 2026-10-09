import { useTranslation } from 'react-i18next';
import { PageIntro } from '../components/SharedSections';
import { LinkButton } from '../components/LinkButton';

export function NotFoundPage() {
  const { t } = useTranslation();

  return (
    <section className="container not-found">
      <span className="eyebrow">{t('utilityPages.notFoundEyebrow')}</span>
      <h1>{t('utilityPages.notFoundTitle')}</h1>
      <p>{t('utilityPages.notFoundText')}</p>
      <LinkButton href="#/projekte">
        {t('utilityPages.notFoundAction')}
      </LinkButton>
    </section>
  );
}
export function PrivacyPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageIntro
        label={t('utilityPages.privacyEyebrow')}
        title={t('utilityPages.privacyTitle')}
        text={t('utilityPages.privacyText')}
      />
      <section className="container prose legal-content">
        <h2>{t('utilityPages.browserTitle')}</h2>
        <p>{t('utilityPages.browserText')}</p>
        <h2>{t('utilityPages.draftTitle')}</h2>
        <p>{t('utilityPages.draftText')}</p>
        <h2>{t('utilityPages.hostingTitle')}</h2>
        <p>{t('utilityPages.hostingText')}</p>
        <h2>{t('utilityPages.publishingTitle')}</h2>
        <p>{t('utilityPages.publishingText')}</p>
        <LinkButton href="#/kontakt" secondary>
          {t('utilityPages.contactAction')}
        </LinkButton>
      </section>
    </>
  );
}
