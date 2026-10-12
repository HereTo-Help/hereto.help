import { SiteLink } from './SiteLink';
import { useTranslation } from 'react-i18next';
import { Badge } from '@radix-ui/themes';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/content';
import { ProjectPhotography } from './Photography';

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <article className={`project-card ${project.theme}`}>
      <SiteLink
        className="project-image-link"
        href={`#/projekte/${project.id}`}
        aria-label={`${t('common.discover')}: ${project.name}`}
      >
        <ProjectPhotography id={project.id} />
      </SiteLink>
      <div className="project-card-body">
        <div className="project-meta">
          <span>{project.category}</span>
          <Badge
            color={project.stage === 'existing' ? 'teal' : 'gray'}
            variant="soft"
          >
            {project.stage === 'existing'
              ? t('common.productName')
              : t('common.projectIdea')}
          </Badge>
        </div>
        <h3>
          <SiteLink href={`#/projekte/${project.id}`}>{project.name}</SiteLink>
        </h3>
        <h4>{project.headline}</h4>
        <p>{project.summary}</p>
        <SiteLink className="text-link" href={`#/projekte/${project.id}`}>
          {t('projectCard.discover')}
          <ArrowUpRight size={19} />
        </SiteLink>
      </div>
    </article>
  );
}
