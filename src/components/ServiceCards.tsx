import {
  ArrowUpRight,
  MessagesSquare,
  FlaskConical,
  ScanSearch,
  Gauge,
  ShieldCheck,
  Sparkles,
  Network,
  ClipboardCheck,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { getSiteContent } from '../services/content';

const icons = {
  consulting: MessagesSquare,
  prototyping: FlaskConical,
  'ai-consulting': Sparkles,
  'architecture-review': Network,
  'concept-review': ClipboardCheck,
  feasibility: ScanSearch,
  optimisation: Gauge,
  security: ShieldCheck,
};

export function ServiceCards({ detailed = false }: { detailed?: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="service-grid">
      {getSiteContent().services.map((service, index) => {
        const Icon = icons[service.id as keyof typeof icons] ?? MessagesSquare;
        return (
          <article className="service-card" key={service.id}>
            <div className="service-card-top">
              <Icon size={28} strokeWidth={1.5} />
              <span>{String(index + 1).padStart(2, '0')}</span>
            </div>
            <h3>{service.title}</h3>
            <p>{service.summary}</p>
            {detailed && (
              <p className="service-detail">{service.description}</p>
            )}
            <a
              className="text-link"
              href={
                detailed
                  ? `#/kontakt?thema=service:${service.id}`
                  : '#/leistungen'
              }
            >
              {t(detailed ? 'servicesPage.ask' : 'servicesPage.allServices')}
              <ArrowUpRight size={17} />
            </a>
          </article>
        );
      })}
    </div>
  );
}
