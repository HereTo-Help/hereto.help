import { useTranslation } from 'react-i18next';
import { Badge } from '@radix-ui/themes';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../types/content';
import { ProjectPhotography } from './Photography';

export function ProjectCard({ project }: { project: Project }) {
  const { t } = useTranslation();

  return (
    <article className={`project-card ${project.theme}`}>
      <a
        className="project-image-link"
        href={`#/projekte/${project.id}`}
        aria-label={`${t('common.discover')}: ${project.name}`}
      >
        <ProjectPhotography id={project.id} />
      </a>
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
          <a href={`#/projekte/${project.id}`}>{project.name}</a>
        </h3>
        <h4>{project.headline}</h4>
        <p>{project.summary}</p>
        <a className="text-link" href={`#/projekte/${project.id}`}>
          {t('projectCard.discover')}
          <ArrowUpRight size={19} />
        </a>
      </div>
    </article>
  );
}
