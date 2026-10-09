import { useTranslation } from 'react-i18next';
import {
  ArrowUpRight,
  HeartHandshake,
  Lightbulb,
  MessageCircle,
  Users,
  FlaskConical,
} from 'lucide-react';
import { PageIntro } from '../components/SharedSections';
import { getSiteContent } from '../services/content';
import { LinkButton } from '../components/LinkButton';

const icons = [MessageCircle, Lightbulb, FlaskConical, Users, HeartHandshake];
export function JoinPage() {
  const { t } = useTranslation();

  return (
    <>
      <PageIntro
        label={t('joinPage.eyebrow')}
        title={t('joinPage.title')}
        text={t('joinPage.text')}
      />
      <section className="container participation-grid">
        {getSiteContent().participation.map((item, index) => {
          const Icon = icons[index];
          return (
            <article className="participation-card" key={item.title}>
              <Icon size={28} strokeWidth={1.5} />
              <h2>{item.title}</h2>
              <p>{item.text}</p>
              <a
                className="text-link"
                href={`#/kontakt?thema=${encodeURIComponent(item.topic)}`}
              >
                {t('joinPage.talk')}
                <ArrowUpRight size={18} />
              </a>
            </article>
          );
        })}
      </section>
      <section className="section container two-column">
        <div>
          <span className="eyebrow">{t('joinPage.fundingEyebrow')}</span>
          <h2>
            {t('joinPage.fundingFirst')}
            <br />
            {t('joinPage.fundingSecond')}
          </h2>
        </div>
        <div className="prose">
          <p>{t('joinPage.fundingModel')}</p>
          <p>{t('joinPage.fairPay')}</p>
          <p className="content-note">{t('joinPage.fundingNotice')}</p>
          <LinkButton href="#/kontakt?thema=support">
            {t('joinPage.fundingAction')}
          </LinkButton>
        </div>
      </section>
    </>
  );
}
