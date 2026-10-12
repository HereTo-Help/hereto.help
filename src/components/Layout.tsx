import { getPageMetadata, updateDocumentMetadata } from '../services/seo';
import { SiteLink } from './SiteLink';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';
import { Dialog, IconButton } from '@radix-ui/themes';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import type { ReactNode } from 'react';
import { getSiteContent } from '../services/content';
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
    updateDocumentMetadata(getPageMetadata(path, getLanguage()));
  }, [path, t]);
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    main.current?.focus({ preventScroll: true });
  }, [path]);
  return (
    <>
      <SiteLink
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          main.current?.focus();
        }}
      >
        {t('layout.skip')}
      </SiteLink>
      <header className="site-header">
        <div className="container header-inner">
          <AnimatedLogo />
          <nav className="desktop-nav" aria-label={t('layout.navigation')}>
            {site.navigation.map((item) => (
              <SiteLink
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
              </SiteLink>
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
                    <SiteLink
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
                    </SiteLink>
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
              <SiteLink className="brand" href="#/">
                <img
                  className="brand-logo"
                  src={`${import.meta.env.BASE_URL}logos/logo-heretohelp-dark.svg`}
                  alt="Here to Help"
                />
              </SiteLink>
              <p>Helpful technology for real life.</p>
            </div>
            <div className="footer-nav">
              <SiteLink href="#/leistungen">{t('layout.services')}</SiteLink>
              <SiteLink href="#/projekte">{t('portfolio.menuLabel')}</SiteLink>
              <SiteLink href="#/arbeitsweise">{t('layout.approach')}</SiteLink>
              <SiteLink href="#/mitwirken">{t('layout.participate')}</SiteLink>
              <SiteLink href="#/kontakt">
                {t('layout.contact')}
                <ArrowUpRight size={14} />
              </SiteLink>
            </div>
          </div>
          <p className="footer-image-note">{t('layout.imageDisclosure')}</p>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Here to Help</span>
            <span>{t('layout.humanTagline')}</span>
            <SiteLink href="#/statuten">{t('layout.statutes')}</SiteLink>
            <SiteLink href="#/datenschutz">{t('layout.privacy')}</SiteLink>
          </div>
        </div>
      </footer>
    </>
  );
}
