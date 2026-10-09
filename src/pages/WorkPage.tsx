import { useTranslation } from 'react-i18next';
import { JoinSection, PageIntro } from '../components/SharedSections';
import { getSiteContent } from '../services/content';
import { Photo } from '../components/Photo';
import { LinkButton } from '../components/LinkButton';

export function WorkPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageIntro
        label={t('workPage.eyebrow')}
        title={t('workPage.title')}
        text={t('workPage.text')}
      />
      <section className="container section section-no-top">
        <figure className="work-photo">
          <Photo
            image="collaboration"
            priority
            sizes="(max-width: 1300px) 100vw, 1200px"
          />
          <figcaption>
            <strong>{t('workPage.photoTitle')}</strong>
            <span>{t('workPage.photoDisclosure')}</span>
          </figcaption>
        </figure>
      </section>
      <section className="container references-preview">
        <h2>{t('budgetApproach.title')}</h2>
        <p>{t('budgetApproach.text')}</p>
        <LinkButton href="#/leistungen" secondary>
          {t('workPage.budgetAction')}
        </LinkButton>
      </section>
      <section className="principles-section section">
        <div className="container two-column">
          <div>
            <span className="eyebrow">{t('workPage.principlesEyebrow')}</span>
            <h2>
              {t('workPage.principlesFirst')}
              <br />
              <span className="emphasis">{t('workPage.principlesSecond')}</span>
            </h2>
            <p className="lead">{t('workPage.principlesText')}</p>
          </div>
          <div className="principles-list">
            {getSiteContent().principles.map((principle, index) => (
              <article key={principle.title}>
                <span>0{index + 1}</span>
                <div>
                  <h3>{principle.title}</h3>
                  <p>{principle.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className="container quote-section">
        <blockquote>{t('workPage.quote')}</blockquote>
        <span>{t('workPage.quoteCredit')}</span>
      </section>
      <JoinSection />
    </>
  );
}
