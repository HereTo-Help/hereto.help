import { useTranslation } from 'react-i18next';
import { ArrowUpRight, Heart, ScanHeart, ShieldCheck } from 'lucide-react';
import { getSiteContent } from '../services/content';
import { LinkButton } from './LinkButton';
import { Photo } from './Photo';

export function WorkSteps() {
  return (
    <div className="steps-grid">
      {getSiteContent().steps.map((step, index) => (
        <div className="work-step" key={step.title}>
          <span className="step-number">0{index + 1}</span>
          <h3>{step.title}</h3>
          <p>{step.text}</p>
        </div>
      ))}
    </div>
  );
}
export function JoinSection() {
  const { t } = useTranslation();

  return (
    <section className="join-section">
      <div className="container join-inner">
        <div className="join-photo">
          <Photo image="collaboration" />
          <span className="photo-label">{t('sharedSections.photoLabel')}</span>
        </div>
        <div>
          <span className="eyebrow">{t('sharedSections.joinEyebrow')}</span>
          <h2>
            {t('sharedSections.joinTitleFirst')}
            <br />
            {t('sharedSections.joinTitleSecond')}
          </h2>
          <p>{t('sharedSections.joinText')}</p>
          <LinkButton href="#/mitwirken">
            {t('sharedSections.joinAction')}
          </LinkButton>
        </div>
      </div>
    </section>
  );
}
export function PageIntro({
  label,
  title,
  text,
}: {
  label: string;
  title: string;
  text: string;
}) {
  return (
    <section className="page-intro container">
      <a className="breadcrumb" href="#/">
        Here to Help <ArrowUpRight size={13} />
      </a>
      <span className="eyebrow">{label}</span>
      <h1>{title}</h1>
      <p className="lead">{text}</p>
    </section>
  );
}
export function ValueStrip() {
  const { t } = useTranslation();

  return (
    <div className="value-strip">
      <div className="container value-strip-inner">
        <span>
          <ScanHeart size={19} />
          {t('sharedSections.people')}
        </span>
        <span>
          <ShieldCheck size={19} />
          {t('sharedSections.fair')}
        </span>
        <span>
          <Heart size={19} />
          {t('sharedSections.everyday')}
        </span>
        <span className="strip-note">{t('sharedSections.measure')}</span>
      </div>
    </div>
  );
}
