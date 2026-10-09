import { useTranslation } from 'react-i18next';
import { Printer, Download, Info } from 'lucide-react';
import { Button, Callout } from '@radix-ui/themes';
import { getStatutes } from '../services/statutes';

export function StatutesPage() {
  const { t } = useTranslation();
  const statutes = getStatutes();
  const preparedDate = new Intl.DateTimeFormat('de-CH', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(`${statutes.preparedOn}T00:00:00Z`));
  return (
    <article className="container statutes-page" lang="de-CH">
      <header className="statutes-heading">
        <span className="eyebrow">VEREIN HERE TO HELP · {statutes.seat}</span>
        <h1>{statutes.title}</h1>
        <p className="statutes-meta">
          Version {statutes.version} · {statutes.status} · Stand: {preparedDate}
        </p>
        <p
          className="statutes-language"
          lang={t('common.statutesLanguageCode')}
        >
          {t('common.statutesLanguageNote')}
        </p>
        <div className="statutes-actions">
          <Button onClick={() => window.print()} variant="soft">
            <Printer size={17} />
            Drucken / als PDF speichern
          </Button>
          <a
            className="text-link"
            href={`${import.meta.env.BASE_URL}governance/statuten.de.md`}
            download
          >
            <Download size={17} />
            Statuten herunterladen (Markdown)
          </a>
        </div>
      </header>
      <Callout.Root color="amber" size="3">
        <Callout.Icon>
          <Info size={20} />
        </Callout.Icon>
        <Callout.Text>{statutes.notice}</Callout.Text>
      </Callout.Root>
      <div className="statutes-layout">
        <nav
          className="statutes-toc"
          aria-label="Inhaltsverzeichnis der Statuten"
        >
          <h2>Inhalt</h2>
          {statutes.articles.map((article) => (
            <a
              key={article.id}
              href={`#/statuten`}
              onClick={(event) => {
                event.preventDefault();
                document
                  .getElementById(article.id)
                  ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                document
                  .getElementById(article.id)
                  ?.focus({ preventScroll: true });
              }}
            >
              {article.title}
            </a>
          ))}
        </nav>
        <div className="statutes-body">
          {statutes.articles.map((article) => (
            <section key={article.id}>
              <h2 id={article.id} tabIndex={-1}>
                {article.title}
              </h2>
              <ol>
                {article.paragraphs.map((paragraph) => (
                  <li key={paragraph}>{paragraph}</li>
                ))}
              </ol>
            </section>
          ))}
          <section className="statutes-adoption">
            <h2>Vor der Annahme</h2>
            <p>Diese Hinweise sind kein Bestandteil der Statuten.</p>
            <ul>
              {statutes.adoptionNotes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </section>
          <section>
            <h2>Rechtsgrundlagen</h2>
            <ul>
              {statutes.sources.map((source) => (
                <li key={source.url}>
                  <a href={source.url} target="_blank" rel="noreferrer">
                    {source.label}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </article>
  );
}
