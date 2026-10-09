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
      <a
        href="#/projekte"
        aria-current={active === 'projects' ? 'page' : undefined}
      >
        {t('portfolio.projects')}
      </a>
      <a
        href="#/referenzen"
        aria-current={active === 'references' ? 'page' : undefined}
      >
        {t('portfolio.references')}
      </a>
    </nav>
  );
}
