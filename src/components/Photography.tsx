import { useTranslation } from 'react-i18next';
import { getProject } from '../services/content';
import { Photo } from './Photo';

export function HeroTrailer() {
  const { t } = useTranslation();

  return (
    <div className="hero-trailer">
      <video
        aria-label={t('homePage.trailerLabel')}
        controls
        playsInline
        preload="metadata"
      >
        <source src="/trailer_en.mp4" type="video/mp4" />
        {t('homePage.trailerUnsupported')}
      </video>
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
