import { useTranslation } from 'react-i18next';
import { MessageCircle, Wallet, Target, Users } from 'lucide-react';
import { getSiteContent } from '../services/content';
import { LinkButton } from './LinkButton';

const icons = [MessageCircle, Wallet, Target, Users];

export function BudgetApproach() {
  const { t } = useTranslation();
  return (
    <section
      className="container section budget-approach"
      aria-labelledby="budget-approach-title"
    >
      <span className="eyebrow">{t('budgetApproach.eyebrow')}</span>
      <h2 id="budget-approach-title">{t('budgetApproach.title')}</h2>
      <p className="budget-intro">{t('budgetApproach.text')}</p>
      <ol className="budget-steps">
        {getSiteContent().budgetSteps.map((step, index) => {
          const Icon = icons[index];
          return (
            <li key={step.id} className="budget-step">
              <div className="budget-step-top">
                <Icon size={26} strokeWidth={1.5} />
                <span>{String(index + 1).padStart(2, '0')}</span>
              </div>
              {step.optional && (
                <span className="budget-optional">
                  {t('budgetApproach.optional')}
                </span>
              )}
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          );
        })}
      </ol>
      <div className="budget-next">
        <p>{t('budgetApproach.note')}</p>
        <LinkButton href="#/kontakt?thema=services">
          {t('budgetApproach.action')}
        </LinkButton>
      </div>
    </section>
  );
}
