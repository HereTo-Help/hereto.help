import { useTranslation } from 'react-i18next';
import { ArrowUpRight, ArrowDown, Sprout } from 'lucide-react';
import { HeroTrailer } from '../components/Photography';
import { LinkButton } from '../components/LinkButton';
import { ProjectCard } from '../components/ProjectCard';
import { ServiceCards } from '../components/ServiceCards';
import {
  JoinSection,
  ValueStrip,
  WorkSteps,
} from '../components/SharedSections';
import { getProjects } from '../services/content';

export function HomePage() {
  const { t } = useTranslation();

  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="little-dot" />
            {t('homePage.heroEyebrow')}
          </span>
          <h1>
            {t('homePage.heroFirst')}
            <br />
            {t('homePage.heroSecond')}
            <br />
            <span>{t('homePage.heroThird')}</span>
          </h1>
          <p>{t('homePage.heroText')}</p>
          <div className="hero-actions">
            <LinkButton href="#/leistungen">
              {t('homePage.projectsAction')}
            </LinkButton>
            <a className="quiet-link" href="#/mitwirken">
              {t('homePage.joinAction')}
              <ArrowUpRight size={17} />
            </a>
          </div>
          <span className="hero-tagline">
            Helpful technology for real life.
          </span>
        </div>
        <HeroTrailer />
      </section>
      <ValueStrip />
      <section className="section container mission-section">
        <div>
          <span className="eyebrow">{t('homePage.missionEyebrow')}</span>
          <h2>
            {t('homePage.missionFirst')}
            <br />
            <span className="emphasis">{t('homePage.missionSecond')}</span>
          </h2>
        </div>
        <div className="mission-copy">
          <p>{t('homePage.missionLead')}</p>
          <p>{t('homePage.missionText')}</p>
          <p>{t('homePage.missionResponsibility')}</p>
          <a href="#/arbeitsweise" className="text-link">
            {t('homePage.approachAction')}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="services-preview section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t('servicesPage.eyebrow')}</span>
              <h2>{t('servicesPage.previewTitle')}</h2>
            </div>
            <p>{t('servicesPage.previewText')}</p>
          </div>
          <ServiceCards />
        </div>
      </section>
      <section className="projects-section section" id="projects">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">{t('homePage.projectsEyebrow')}</span>
              <h2>
                {t('homePage.projectsFirst')}
                <br />
                {t('homePage.projectsSecond')}
              </h2>
            </div>
            <div>
              <p>
                {t('homePage.projectsThemes')}
                <br />
                {t('homePage.projectsText')}
              </p>
              <a href="#/projekte" className="text-link">
                {t('homePage.allProjects')}
                <ArrowUpRight size={18} />
              </a>
            </div>
          </div>
          <div className="project-grid">
            {getProjects().map((project) => (
              <ProjectCard project={project} key={project.id} />
            ))}
          </div>
          <div className="project-footnote">
            <span className="little-dot" />
            {t('homePage.projectNotice')}
          </div>
        </div>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t('homePage.workEyebrow')}</span>
            <h2>
              {t('homePage.workFirst')}
              <br />
              <span className="emphasis">{t('homePage.workSecond')}</span>
            </h2>
          </div>
          <a
            className="round-link"
            href="#/arbeitsweise"
            aria-label={t('homePage.workLabel')}
          >
            <ArrowUpRight />
          </a>
        </div>
        <WorkSteps />
      </section>
      <JoinSection />
      <section className="closing-section container">
        <Sprout size={32} strokeWidth={1.5} />
        <span className="eyebrow">{t('homePage.closingEyebrow')}</span>
        <h2>{t('homePage.closingTitle')}</h2>
        <p>
          {t('homePage.closingFirst')}
          <br />
          {t('homePage.closingSecond')}
        </p>
        <LinkButton href="#/kontakt" secondary>
          {t('homePage.contactAction')}
        </LinkButton>
        <ArrowDown className="closing-arrow" size={18} />
      </section>
    </>
  );
}
