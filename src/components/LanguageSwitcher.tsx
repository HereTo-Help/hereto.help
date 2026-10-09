import { useTranslation } from 'react-i18next';
import { changeLanguage, getLanguage } from '../i18n';

export function LanguageSwitcher() {
  const { t } = useTranslation();
  const language = getLanguage();
  return (
    <div
      className="language-switcher"
      role="group"
      aria-label={t('common.language')}
    >
      <button
        type="button"
        lang="de"
        aria-label="Deutsch"
        aria-pressed={language === 'de'}
        onClick={() => void changeLanguage('de')}
      >
        DE
      </button>
      <button
        type="button"
        lang="en"
        aria-label="English"
        aria-pressed={language === 'en'}
        onClick={() => void changeLanguage('en')}
      >
        EN
      </button>
    </div>
  );
}
