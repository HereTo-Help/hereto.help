import { SiteLink } from './SiteLink';
import { useTranslation } from 'react-i18next';

export function PortfolioNavigation({
  active,
}: {
  active: 'projects' | 'references';
}) {
  const { t } = useTranslation();
  return (
    <nav
      className="container portfolio-navigation"
      aria-label={t('portfolio.navigation')}
    >
      <SiteLink
        href="#/projekte"
        aria-current={active === 'projects' ? 'page' : undefined}
      >
        {t('portfolio.projects')}
      </SiteLink>
      <SiteLink
        href="#/referenzen"
        aria-current={active === 'references' ? 'page' : undefined}
      >
        {t('portfolio.references')}
      </SiteLink>
    </nav>
  );
}
