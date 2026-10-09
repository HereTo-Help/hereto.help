import { useTranslation } from 'react-i18next';
import { Photo } from '../components/Photo';
import { JoinSection, PageIntro } from '../components/SharedSections';

export function AboutPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageIntro
        label={t('aboutPage.eyebrow')}
        title={t('aboutPage.title')}
        text={t('aboutPage.text')}
      />
      <section className="container about-story">
        <div className="about-photo">
          <Photo image="collaboration" />
          <span className="photo-label">{t('aboutPage.photoLabel')}</span>
        </div>
        <div className="prose">
          <h2>
            {t('aboutPage.storyFirst')}
            <br />
            {t('aboutPage.storySecond')}
          </h2>
          <p>{t('aboutPage.storyQuestion')}</p>
          <p>{t('aboutPage.storyExperts')}</p>
          <p>{t('aboutPage.storyApproach')}</p>
          <p>{t('aboutPage.storyResponsibility')}</p>
          <p>{t('aboutPage.storyProjects')}</p>
          <a href="#/arbeitsweise" className="text-link">
            {t('homePage.approachAction')}
          </a>
        </div>
      </section>
      <section className="container section two-column">
        <div>
          <span className="eyebrow">{t('referencesPage.motivationLabel')}</span>
          <h2>{t('referencesPage.originTitle')}</h2>
        </div>
        <div className="prose">
          <p>{t('referencesPage.originText')}</p>
          <a href="#/referenzen" className="text-link">
            {t('referencesPage.allReferences')}
          </a>
        </div>
      </section>
      <section className="container section two-column">
        <div>
          <span className="eyebrow">{t('aboutPage.statusEyebrow')}</span>
          <h2>
            {t('aboutPage.statusFirst')}
            <br />
            {t('aboutPage.statusSecond')}
          </h2>
        </div>
        <div className="prose">
          <p>{t('aboutPage.legalStatus')}</p>
          <p>{t('aboutPage.funding')}</p>
          <p>{t('aboutPage.transparency')}</p>
        </div>
      </section>
      <JoinSection />
    </>
  );
}
