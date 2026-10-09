import { Layout } from './components/Layout';
import { lazy, Suspense } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from './hooks/useRoute';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectPage } from './pages/ProjectPage';
import { WorkPage } from './pages/WorkPage';
import { JoinPage } from './pages/JoinPage';
import { AboutPage } from './pages/AboutPage';
import { ServicesPage } from './pages/ServicesPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage, PrivacyPage } from './pages/UtilityPages';

const StatutesPage = lazy(() =>
  import('./pages/StatutesPage').then((module) => ({
    default: module.StatutesPage,
  })),
);
const ReferencesPage = lazy(() =>
  import('./pages/ReferencesPage').then((module) => ({
    default: module.ReferencesPage,
  })),
);

export function App() {
  const { t } = useTranslation();
  const { path, params } = useRoute();
  const pages: Record<string, React.ReactNode> = {
    '/': <HomePage />,
    '/leistungen': <ServicesPage />,
    '/referenzen': (
      <Suspense
        fallback={
          <p className="container" role="status">
            {t('layout.references')} …
          </p>
        }
      >
        <ReferencesPage />
      </Suspense>
    ),
    '/statuten': (
      <Suspense
        fallback={
          <p className="container" role="status" lang="de-CH">
            Statuten werden geladen …
          </p>
        }
      >
        <StatutesPage />
      </Suspense>
    ),
    '/projekte': <ProjectsPage />,
    '/arbeitsweise': <WorkPage />,
    '/mitwirken': <JoinPage />,
    '/ueber-uns': <AboutPage />,
    '/kontakt': (
      <ContactPage
        key={params.get('thema')}
        initialTopic={params.get('thema') || ''}
      />
    ),
    '/datenschutz': <PrivacyPage />,
  };
  const page =
    pages[path] ??
    (path.startsWith('/projekte/') ? (
      <ProjectPage id={path.slice('/projekte/'.length)} />
    ) : (
      <NotFoundPage />
    ));
  return <Layout path={path}>{page}</Layout>;
}
