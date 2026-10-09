import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { SegmentedControl } from '@radix-ui/themes';
import { ProjectCard } from '../components/ProjectCard';
import { JoinSection, PageIntro } from '../components/SharedSections';
import { getProjects } from '../services/content';
import { PortfolioNavigation } from '../components/PortfolioNavigation';

export function ProjectsPage() {
  const { t } = useTranslation();

  const [filter, setFilter] = useState('all');
  const projects = getProjects().filter(
    (project) => filter === 'all' || project.stage === filter,
  );
  return (
    <>
      <PageIntro
        label={t('portfolio.eyebrow')}
        title={t('portfolio.title')}
        text={t('portfolio.text')}
      />
      <PortfolioNavigation active="projects" />
      <section className="container project-list-section">
        <h2 className="portfolio-section-title">{t('projectsPage.title')}</h2>
        <p className="portfolio-section-intro">{t('projectsPage.text')}</p>
        <SegmentedControl.Root
          size={{ initial: '1', sm: '3' }}
          value={filter}
          onValueChange={setFilter}
          aria-label={t('projectsPage.filterLabel')}
        >
          <SegmentedControl.Item value="all">
            {t('projectsPage.all')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="existing">
            {t('projectsPage.existing')}
          </SegmentedControl.Item>
          <SegmentedControl.Item value="idea">
            {t('projectsPage.ideas')}
          </SegmentedControl.Item>
        </SegmentedControl.Root>
        <p className="filter-count" aria-live="polite">
          {t('common.projectCount', { count: projects.length })}
        </p>
        <div className="project-grid">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
        <p className="content-note">{t('projectsPage.notice')}</p>
      </section>
      <JoinSection />
    </>
  );
}
