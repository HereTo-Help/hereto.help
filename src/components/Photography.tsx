import { useTranslation } from 'react-i18next';
import { getProject } from '../services/content';
import { Photo } from './Photo';

export function HeroPhotography() {
  const { t } = useTranslation();

  return (
    <div className="hero-photography">
      <div className="hero-photo-main">
        <Photo image="collaboration" priority />
        <span className="photo-label">{t('photography.heroLabel')}</span>
      </div>
      <div className="hero-photo-pair">
        <Photo image="connection" />
        <Photo image="support" />
      </div>
      <span className="photo-credit">{t('photography.credit')}</span>
    </div>
  );
}

export function ProjectPhotography({
  id,
  large = false,
}: {
  id: string;
  large?: boolean;
}) {
  const project = getProject(id);
  if (!project) return null;
  return (
    <div
      className={`project-photography ${large ? 'large' : ''} ${project.theme}`}
    >
      <Photo
        image={project.image}
        sizes={
          large
            ? '(max-width: 600px) 100vw, 50vw'
            : '(max-width: 600px) 100vw, 33vw'
        }
      />
      <span className="project-photo-category">{project.category}</span>
    </div>
  );
}
