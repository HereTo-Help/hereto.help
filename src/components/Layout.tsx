import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { Dialog, IconButton } from '@radix-ui/themes';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { getProject, getSiteContent } from '../services/content';
import { LinkButton } from './LinkButton';
import { LanguageSwitcher } from './LanguageSwitcher';
import { getLanguage } from '../i18n';
import { AnimatedLogo } from './AnimatedLogo';

export function Layout({
  path,
  children,
}: {
  path: string;
  children: ReactNode;
}) {
  const { t } = useTranslation();

  const site = getSiteContent();
  const main = useRef<HTMLElement>(null);
  useEffect(() => {
    const title =
      (path.startsWith('/projekte/')
        ? getProject(path.slice('/projekte/'.length))?.name
        : undefined) ??
      site.navigation.find(
        (item) =>
          path === item.path ||
          (item.path === '/projekte' && path === '/referenzen'),
      )?.label ??
      (path === '/kontakt'
        ? t('common.contact')
        : path === '/'
          ? 'Helpful technology for real life.'
          : path === '/statuten'
            ? 'Statuten'
            : path === '/arbeitsweise'
              ? t('workPage.eyebrow')
              : path === '/datenschutz'
                ? t('common.privacyTitle')
                : t('common.projectTitle'));
    document.title = `${title} — Here to Help`;
    document.documentElement.lang = getLanguage() === 'de' ? 'de-CH' : 'en';
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', t('common.metaDescription'));
  }, [path, site.navigation, t]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    main.current?.focus({ preventScroll: true });
  }, [path]);
  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        {t('layout.skip')}
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <AnimatedLogo />
          <nav className="desktop-nav" aria-label={t('layout.navigation')}>
            {site.navigation.map((item) => (
              <a
                key={item.path}
                href={`#${item.path}`}
                aria-current={
                  path.startsWith(item.path) ||
                  (item.path === '/projekte' && path === '/referenzen')
                    ? 'page'
                    : undefined
                }
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="header-cta">
            <LinkButton href="#/kontakt">{t('layout.speak')}</LinkButton>
          </div>
          <LanguageSwitcher />
          <Dialog.Root>
            <Dialog.Trigger>
              <IconButton
                className="mobile-menu"
                variant="ghost"
                aria-label={t('layout.openMenu')}
              >
                <Menu />
              </IconButton>
            </Dialog.Trigger>
            <Dialog.Content className="mobile-dialog" maxWidth="440px">
              <Dialog.Title>{t('layout.menuTitle')}</Dialog.Title>
              <Dialog.Description>
                {t('layout.menuDescription')}
              </Dialog.Description>
              <nav
                className="mobile-nav"
                aria-label={t('layout.mobileNavigation')}
              >
                {[
                  { label: t('common.home'), path: '/' },
                  ...site.navigation,
                  { label: t('common.contact'), path: '/kontakt' },
                ].map((item) => (
                  <Dialog.Close key={item.path}>
                    <a
                      href={`#${item.path}`}
                      aria-current={
                        path === item.path ||
                        (item.path !== '/' &&
                          path.startsWith(`${item.path}/`)) ||
                        (item.path === '/projekte' && path === '/referenzen')
                          ? 'page'
                          : undefined
                      }
                    >
                      {item.label}
                      <ArrowUpRight size={20} />
                    </a>
                  </Dialog.Close>
                ))}
              </nav>
              <Dialog.Close>
                <IconButton
                  className="dialog-close"
                  variant="ghost"
                  aria-label={t('layout.closeMenu')}
                >
                  <X />
                </IconButton>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Root>
        </div>
      </header>
      <main id="main" ref={main} tabIndex={-1}>
        {children}
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div>
              <a className="brand" href="#/">
                <img
                  className="brand-logo"
                  src={`${import.meta.env.BASE_URL}logos/logo-heretohelp-dark.svg`}
                  alt="Here to Help"
                />
              </a>
              <p>Helpful technology for real life.</p>
            </div>
            <div className="footer-nav">
              <a href="#/leistungen">{t('layout.services')}</a>
              <a href="#/projekte">{t('portfolio.menuLabel')}</a>
              <a href="#/arbeitsweise">{t('layout.approach')}</a>
              <a href="#/mitwirken">{t('layout.participate')}</a>
              <a href="#/kontakt">
                {t('layout.contact')}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>
          <p className="footer-image-note">{t('layout.imageDisclosure')}</p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Here to Help</span>
            <span>{t('layout.humanTagline')}</span>
            <a href="#/statuten">{t('layout.statutes')}</a>
            <a href="#/datenschutz">{t('layout.privacy')}</a>
          </div>
        </div>
      </footer>
    </>
  );
}
