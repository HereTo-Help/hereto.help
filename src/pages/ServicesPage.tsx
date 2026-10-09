import { useTranslation } from 'react-i18next';
import { PageIntro } from '../components/SharedSections';
import { BudgetApproach } from '../components/BudgetApproach';
import { ServiceCards } from '../components/ServiceCards';
import { Photo } from '../components/Photo';
import { LinkButton } from '../components/LinkButton';

export function ServicesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageIntro
        label={t('servicesPage.eyebrow')}
        title={t('servicesPage.title')}
        text={t('servicesPage.text')}
      />
      <section className="container services-intro">
        <div className="services-photo">
          <Photo image="collaboration" priority />
          <span className="photo-label">{t('servicesPage.photoLabel')}</span>
        </div>
        <div className="services-intro-copy">
          <h2>{t('servicesPage.previewTitle')}</h2>
          <p>{t('servicesPage.previewText')}</p>
          <LinkButton href="#/kontakt?thema=services">
            {t('servicesPage.discuss')}
          </LinkButton>
        </div>
      </section>
      <section className="container section">
        <ServiceCards detailed />
        <p className="services-scope">{t('servicesPage.scope')}</p>
      </section>
      <BudgetApproach />
      <section className="container references-preview">
        <span className="eyebrow">{t('referencesPage.eyebrow')}</span>
        <h2>{t('referencesPage.previewTitle')}</h2>
        <p>{t('referencesPage.previewText')}</p>
        <LinkButton href="#/referenzen" secondary>
          {t('referencesPage.allReferences')}
        </LinkButton>
      </section>
      <section className="container services-own">
        <div>
          <h2>{t('servicesPage.ownTitle')}</h2>
          <p>{t('servicesPage.ownText')}</p>
        </div>
        <LinkButton href="#/mitwirken" secondary>
          {t('servicesPage.ownAction')}
        </LinkButton>
      </section>
    </>
  );
}
