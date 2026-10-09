import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button, Callout, Select, TextArea, TextField } from '@radix-ui/themes';
import {
  ArrowUpRight,
  Check,
  Copy,
  Info,
  Mail,
  MessageCircle,
} from 'lucide-react';
import { PageIntro } from '../components/SharedSections';
import { getProjects, getSiteContent } from '../services/content';

const legacyTopics: Record<string, string> = {
  'Allgemeiner Austausch': 'general',
  'Family Butler': 'family-butler',
  'Meet for Real': 'meet-for-real',
  'Safe Steps': 'safe-steps',
  'Erfahrungen teilen': 'experience',
  'Fachwissen einbringen': 'expertise',
  'Angebot testen': 'testing',
  'Partnerschaft besprechen': 'partnership',
  'Projekt unterstützen': 'support',
};
function normalizeTopic(value: string) {
  const match = value.match(/^Mitwirken: (.*)$/);
  return match
    ? 'support:' + (legacyTopics[match[1]] || match[1])
    : legacyTopics[value] || value || 'general';
}
export function ContactPage({ initialTopic }: { initialTopic: string }) {
  const { t, i18n } = useTranslation();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState(normalizeTopic(initialTopic));
  const [feedback, setFeedback] = useState<'copied' | 'copyFailed' | ''>('');
  const contactEmail = getSiteContent().contactEmail;
  const availableTopics = [
    { id: 'general', label: t('common.generalTopic') },
    { id: 'services', label: t('common.servicesTopic') },
    ...getSiteContent().services.map((service) => ({
      id: `service:${service.id}`,
      label: service.title,
    })),
    ...getProjects().map((project) => ({
      id: project.id,
      label: project.name,
    })),
    ...getProjects().flatMap((project) =>
      (project.recruitment?.roles || []).map((role) => ({
        id: `recruitment:${project.id}:${role.id}`,
        label: t('common.recruitmentTopic', {
          project: project.name,
          role: role.title,
        }),
      })),
    ),
    ...getSiteContent().participation.map((item) => ({
      id: item.topic,
      label: item.title,
    })),
  ];
  if (!availableTopics.some((item) => item.id === topic)) {
    const project = getProjects().find(
      (item) => 'support:' + item.id === topic,
    );
    availableTopics.push({
      id: topic,
      label: project
        ? t('common.participationTopic', { project: project.name })
        : topic,
    });
  }
  const topicLabel = availableTopics.find((item) => item.id === topic)!.label;
  const draft = t('common.draft', { topic: topicLabel, name, email, message });
  async function copyDraft() {
    try {
      await navigator.clipboard.writeText(draft);
      setFeedback('copied');
    } catch {
      setFeedback('copyFailed');
    }
  }
  return (
    <>
      <PageIntro
        label={t('contactPage.eyebrow')}
        title={t('contactPage.title')}
        text={t('contactPage.text')}
      />
      <section className="container contact-grid">
        <div className="contact-aside">
          <MessageCircle size={38} strokeWidth={1.4} />
          <h2>{t('contactPage.asideTitle')}</h2>
          <p>{t('contactPage.asideText')}</p>
          {contactEmail ? (
            <a className="text-link" href={`mailto:${contactEmail}`}>
              <Mail size={17} />
              {contactEmail}
            </a>
          ) : (
            <Callout.Root color="gray">
              <Callout.Icon>
                <Info size={18} />
              </Callout.Icon>
              <Callout.Text>{t('contactPage.pendingAddress')}</Callout.Text>
            </Callout.Root>
          )}
          <p className="small-note">{t('contactPage.privacy')}</p>
        </div>
        <form
          className="contact-form"
          onSubmit={(event) => {
            event.preventDefault();
            if (contactEmail)
              window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(topicLabel)}&body=${encodeURIComponent(draft)}`;
            else void copyDraft();
          }}
        >
          <div className="form-row">
            <label>
              {t('contactPage.name')}
              <TextField.Root
                placeholder={t('contactPage.namePlaceholder')}
                value={name}
                onChange={(event) => setName(event.target.value)}
                autoComplete="name"
              />
            </label>
            <label>
              {t('contactPage.email')}
              <TextField.Root
                type="email"
                placeholder={t('contactPage.emailPlaceholder')}
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </label>
          </div>
          <label>
            {t('contactPage.topic')}
            <Select.Root
              key={i18n.resolvedLanguage}
              value={topic}
              onValueChange={setTopic}
            >
              <Select.Trigger aria-label={t('contactPage.topicLabel')}>
                {topicLabel}
              </Select.Trigger>
              <Select.Content>
                {availableTopics.map((item) => (
                  <Select.Item value={item.id} key={item.id}>
                    {item.label}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </label>
          <label>
            {t('contactPage.message')}
            <TextArea
              aria-label={t('contactPage.message')}
              placeholder={t('contactPage.messagePlaceholder')}
              required
              rows={6}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
            />
          </label>
          <Button size="3" type="submit" className="link-button">
            {contactEmail ? (
              <>
                <Mail size={17} />
                {t('contactPage.openEmail')}
                <ArrowUpRight size={17} />
              </>
            ) : (
              <>
                <Copy size={17} />
                {t('contactPage.copyDraft')}
              </>
            )}
          </Button>
          <p className="form-feedback" role="status">
            {feedback && (
              <>
                <Check size={16} />
                {t(
                  feedback === 'copied' ? 'common.copied' : 'common.copyFailed',
                )}
              </>
            )}
          </p>
        </form>
      </section>
    </>
  );
}
