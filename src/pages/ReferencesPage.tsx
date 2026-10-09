import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  Cloud,
  Flag,
  Radio,
  Check,
  PawPrint,
  Scissors,
  Camera,
} from 'lucide-react';
import { PageIntro } from '../components/SharedSections';
import { LinkButton } from '../components/LinkButton';
import { getReferences } from '../services/references';
import { Photo } from '../components/Photo';
import { PortfolioNavigation } from '../components/PortfolioNavigation';

const icons = {
  'ycl-cloud': Cloud,
  'ycl-regatta': Flag,
  'bethlehem-communications': Radio,
  'sirius-adoption': PawPrint,
  'atelier-schnittpunkt': Scissors,
  lucouture: Camera,
};

export function ReferencesPage() {
  const { t } = useTranslation();
  return (
    <>
      <PageIntro
        label={t('portfolio.eyebrow')}
        title={t('portfolio.title')}
        text={t('portfolio.text')}
      />
      <PortfolioNavigation active="references" />
      <div className="container portfolio-section-heading">
        <h2 className="portfolio-section-title">{t('referencesPage.title')}</h2>
        <p className="portfolio-section-intro">{t('referencesPage.text')}</p>
      </div>
      <section
        className="container references-list"
        aria-label={t('layout.references')}
      >
        {getReferences().map((reference, index) => {
          const Icon = icons[reference.id as keyof typeof icons];
          return (
            <article className="reference-card" key={reference.id}>
              <figure className="reference-visual">
                <div className="reference-image-wrap">
                  <Photo
                    image={reference.image}
                    className="reference-photo"
                    priority={index === 0}
                    sizes="(max-width: 1280px) 100vw, 1200px"
                  />
                  {reference.logo ? (
                    <div className="reference-logo-panel">
                      <img
                        src={`${import.meta.env.BASE_URL}images/logos/${reference.logo}`}
                        alt={`${t('referencesPage.logoLabel')} ${reference.organisation}`}
                        loading="lazy"
                        decoding="async"
                      />
                    </div>
                  ) : (
                    <div
                      className="reference-logo-panel reference-symbol-panel"
                      role="img"
                      aria-label={`${t('referencesPage.symbolLabel')} ${reference.organisation}`}
                    >
                      <Icon size={58} strokeWidth={1.5} aria-hidden="true" />
                    </div>
                  )}
                </div>
                <figcaption>{t('referencesPage.imageCaption')}</figcaption>
              </figure>
              <div className="reference-body">
                <div className="reference-heading">
                  <span className="reference-icon">
                    <Icon size={30} strokeWidth={1.5} />
                  </span>
                  <span className="eyebrow">{reference.kind}</span>
                  <span className="reference-number">0{index + 1}</span>
                </div>
                <div className="reference-columns">
                  <div>
                    <p className="reference-organisation">
                      {reference.organisation}
                    </p>
                    <h2>{reference.title}</h2>
                    <p className="reference-summary">{reference.summary}</p>
                    <p>{reference.context}</p>
                    {reference.organisationUrl && (
                      <a
                        className="text-link"
                        href={reference.organisationUrl}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {t('referencesPage.organisationLink')}
                        <ArrowUpRight size={17} />
                      </a>
                    )}
                  </div>
                  <div className="reference-detail">
                    <h3>{t('referencesPage.workTitle')}</h3>
                    <ul>
                      {reference.work.map((item) => (
                        <li key={item}>
                          <Check size={18} />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                    {reference.technologies.length > 0 && (
                      <>
                        <h3>{t('referencesPage.technologyTitle')}</h3>
                        <ul className="reference-technologies">
                          {reference.technologies.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
                {reference.motivation && (
                  <div className="reference-motivation">
                    <span className="eyebrow">
                      {t('referencesPage.motivationLabel')}
                    </span>
                    <p>{reference.motivation}</p>
                  </div>
                )}
              </div>
            </article>
          );
        })}
      </section>
      <section className="container references-contact">
        <LinkButton href="#/kontakt?thema=services">
          {t('referencesPage.contactAction')}
        </LinkButton>
      </section>
    </>
  );
}
