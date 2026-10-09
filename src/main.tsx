import React from 'react';
import './i18n';
import ReactDOM from 'react-dom/client';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import '@fontsource-variable/inter';
import './styles/index.css';
import './styles/photos.css';
import './styles/i18n.css';
import './styles/services.css';
import './styles/statutes.css';
import './styles/references.css';
import './styles/budget-approach.css';
import { App } from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Theme accentColor="teal" grayColor="slate" radius="large" scaling="100%">
      <App />
    </Theme>
  </React.StrictMode>,
);
