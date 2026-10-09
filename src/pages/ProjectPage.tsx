import { useTranslation } from 'react-i18next';
import { Badge, Callout } from '@radix-ui/themes';
import { ArrowLeft, Check, Info } from 'lucide-react';
import { ProjectPhotography } from '../components/Photography';
import { LinkButton } from '../components/LinkButton';
import { getProject } from '../services/content';
import { NotFoundPage } from './UtilityPages';

export function ProjectPage({ id }: { id: string }) {
  const { t } = useTranslation();

  const project = getProject(id);
  if (!project) return <NotFoundPage />;
  return (
    <>
      <section className={`project-detail container ${project.theme}`}>
        <a href="#/projekte" className="text-link back-link">
          <ArrowLeft size={16} />
          {t('projectPage.all')}
        </a>
        <div className="detail-grid">
          <div>
            <Badge size="2" color={project.stage === 'idea' ? 'gray' : 'teal'}>
              {project.status}
            </Badge>
            <span className="eyebrow">
              {project.name.toUpperCase()} ·{' '}
              {project.stage === 'idea'
                ? t('common.ideaPrefix')
                : t('common.existingPrefix')}{' '}
              {t('projectPage.brandSuffix')}
            </span>
            <h1>{project.title}</h1>
            <p className="lead">{project.description}</p>
            <LinkButton href={project.url || `#/kontakt?thema=${project.id}`}>
              {project.url
                ? t('common.visitProduct')
                : t('common.expressInterest')}
            </LinkButton>
          </div>
          <ProjectPhotography id={project.id} large />
        </div>
      </section>
      <section className="container detail-content">
        <Callout.Root color="gray" size="3">
          <Callout.Icon>
            <Info size={21} />
          </Callout.Icon>
          <Callout.Text>{project.notice}</Callout.Text>
        </Callout.Root>
        {project.features && (
          <section className="section">
            <span className="eyebrow">{t('projectPage.featuresEyebrow')}</span>
            <h2>{t('projectPage.featuresTitle')}</h2>
            <div className="project-feature-grid">
              {project.features.map((feature) => (
                <article className="project-feature" key={feature.title}>
                  <Check size={24} />
                  <h3>{feature.title}</h3>
                  <p>{feature.text}</p>
                </article>
              ))}
            </div>
          </section>
        )}
        <div className="two-column section">
          <div>
            <span className="eyebrow">{t('projectPage.goalsEyebrow')}</span>
            <h2>{t('projectPage.goalsTitle')}</h2>
          </div>
          <ul className="goal-list">
            {project.goals.map((goal) => (
              <li key={goal}>
                <Check size={20} />
                {goal}
              </li>
            ))}
          </ul>
        </div>
        {project.research && (
          <div className="research-box">
            <span className="eyebrow">{t('projectPage.researchEyebrow')}</span>
            <h3>{t('projectPage.researchTitle')}</h3>
            <p>{project.research}</p>
          </div>
        )}
        {project.recruitment ? (
          <section className="project-recruitment">
            <h2>{project.recruitment.title}</h2>
            <p>{project.recruitment.text}</p>
            <div className="project-feature-grid">
              {project.recruitment.roles.map((role) => (
                <article className="project-feature" key={role.id}>
                  <h3>{role.title}</h3>
                  <p>{role.text}</p>
                  <LinkButton
                    href={`#/kontakt?thema=recruitment:${project.id}:${role.id}`}
                    secondary
                  >
                    {t('projectPage.recruitmentAction')}
                  </LinkButton>
                </article>
              ))}
            </div>
          </section>
        ) : (
          <div className="detail-cta">
            <h2>{t('projectPage.joinTitle')}</h2>
            <p>{t('projectPage.joinText')}</p>
            <LinkButton href={`#/kontakt?thema=support:${project.id}`}>
              {t('projectPage.joinAction')}
            </LinkButton>
          </div>
        )}
      </section>
    </>
  );
}
