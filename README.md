# Here to Help

## Vereinsstatuten und Agentenleitplanken

Der Entwurf Version 0.2 präzisiert marktgerechte und angemessene Vergütung für Projektarbeit, freiwillige Mitarbeit, Sponsoring und Fördergelder. Ertragsüberschüsse dürfen zweckdienliche Förderprojekte und Vorhaben im Aufbau quersubventionieren. Der Vorstand entscheidet innerhalb von Budget und Zweckbindungen; Mittelübertragungen werden nachvollziehbar dokumentiert. Das Vergütungsziel ersetzt keine individuellen Verträge. Die ordentliche Vorstandstätigkeit bleibt ehrenamtlich.

Die vorerst nur deutschen Statuten sind über den Footer unter `#/statuten` erreichbar. Sitz ist Ebikon (LU); vorgesehen sind eine einheitliche beitragsfreie Mitgliedschaft und ein Vorstand mit zwei bis fünf Personen. Die Fassung ist ausdrücklich ein **Gründungsentwurf**. Die Annahme, Wahl der Organe und Unterzeichnung erfolgen durch Menschen an der Gründungsversammlung. Steuerbefreiung und Handelsregisterpflicht werden separat anhand der tatsächlichen Tätigkeit geprüft.

Die einzige Textquelle ist `public/governance/statuten.de.json`. Die Website liest sie über `src/services/statutes.ts` und lädt die Statutenseite bei Bedarf nach. `npm run governance:generate` erzeugt daraus `public/governance/statuten.de.md` zum Download und für Agenten. `npm run governance:check` prüft die Übereinstimmung und läuft auch vor dem Build. Druckansicht bzw. PDF-Speicherung erfolgen über den Browser. Hinweise zur Annahme sind vom eigentlichen Statutentext getrennt.

`AGENTS.md` und `.github/copilot-instructions.md` übersetzen die Statuten in Arbeitsvorgaben für Codex und GitHub Copilot. Bei Statutenänderungen auch diese Vorgaben prüfen. Sie sind Projektinstructions, ersetzen keine Vereinsbeschlüsse und verleihen Agenten keine Organ- oder Vertretungsbefugnis. Die bisherigen Produkt- und Datenschutzangaben behalten ihren tatsächlichen Status.

Rechtsgrundlagen: [ZGB, Art. 60–79](https://www.fedlex.admin.ch/eli/cc/24/233_245_233/de) und [Luzerner Steuerbuch](https://steuerbuch.lu.ch/band2/unternehmenssteuerrecht/steuerbefreiung_juristischer_personen). Die Gründungsfassung sollte vor ihrer Annahme schweizerisch rechtlich geprüft werden; eine automatisch bestätigte Rechtsgültigkeit oder Steuerbefreiung wird nicht behauptet.

A static, responsive German/English React website based on `here-to-help-website-konzept.pdf`. Built with TypeScript, Vite, Radix Themes, i18next, react-i18next and Lucide icons. Editorial AI-generated photography and the Inter font are bundled locally. No external image services, remote fonts, analytics, cookies, database or browser storage.

## Development

Use Node.js 22.13+, 24.x or 26+.

```sh
npm install
npm run dev
```

```sh
npm run lint
npm test
npm run build
npm run preview
```

## Structure

```text
src/
  components/   Shared layout, UI and responsive photography
  i18n/         Translation setup, typed keys and completeness tests
  locales/      German/English JSON dictionaries and editorial content
  hooks/        Static-host-friendly hash routing
  pages/        Page-level components
  services/     Content access boundary and content integrity tests
  styles/       Theme, layout, responsive and accessibility rules
  types/        Content contracts
public/         Static favicon and optimised local photographs
```

The website includes a home page, commissioned services, project listing with filters, four project detail views, working principles, participation, about, contact, transparency and a not-found view. Hash routes work on ordinary static hosts without server rewrites. Radix supplies buttons, badges, accessible dialogs, segmented controls, callouts and form controls.

The main navigation has four entries: services, projects & references, participation and about. Projects and references share one introductory area and `PortfolioNavigation`, with separate linked views at the existing `#/projekte` and `#/referenzen` routes so direct links and browser history remain usable. Own initiatives and founder-contributed experience stay explicitly distinguished. Working principles remain accessible from About and the footer; the full small-budget process is presented on Services, with a short link from the working-method page instead of a duplicate process.

## Editing content

- `src/locales/{de,en}/references.json`: six examples of personal project experience contributed to Here to Help (YCL cloud infrastructure, a regatta administration prototype, redundant communications for Children’s Relief Bethlehem, website consulting plus an animal adoption prototype for Sirius, and photography/website work for Atelier Schnittpunkt Stans and LuCouture Luzern). Access through `src/services/references.ts`; the references page is loaded separately. No dates, uptime guarantees, endorsements or current contracts are inferred. Organisation names and Microsoft product terminology are checked against official sources; project contributions are supplied by the founder.

- `src/locales/{de,en}/ui.json`: all page copy, interface labels, accessibility labels, captions and form feedback.
- `src/locales/{de,en}/projects.json`: project names, status, copy, goals and optional external product URLs.
- `src/locales/{de,en}/images.json`: photographic image descriptions and crop positions. Local WebP files and image provenance are in `public/images/`.
- `src/locales/{de,en}/site.json`: navigation, commissioned services, principles, process, participation options and contact address. `budgetSteps` supplies the four-step approach for early-stage organisations on the services and working-method pages: understand the need, discuss the budget, maximise practical value and optionally involve the network for additional funding or voluntary contributions. Shared presentation lives in `BudgetApproach`; headings and labels live in `ui.json`.

`src/services/content.ts` is the only entry point for content. Replace this boundary with a typed API repository if a backend is needed later; the current app intentionally has no backend. JSON is bundled at build time: rebuild after changing it. A future asynchronous data source will also require loading/error state in the consumers.

## Contact without storage

The concept does not supply a verified email address, so `contactEmail` is empty. The contact page explains this and lets visitors prepare and copy a draft. Set the same verified address in both languages' `site.json` files to enable opening the draft in the visitor's mail application. The visitor sends it themselves. No form submissions are claimed, sent to a server or persisted. Clipboard copying requires HTTPS or localhost.

## Languages

The header's DE/EN switch changes the language in place, preserving the current route, active project filter and unsent contact form. German is the default and fallback. The preference is part of the URL (`?lang=en#/arbeitsweise` or `?lang=de#/arbeitsweise`), so shared links and refreshes retain it without cookies or browser storage. Browser Back/Forward restores language changes.

Both languages are bundled with the static app: no runtime translation API or server is needed. The `ui` namespace holds interface translations; `content` holds editorial JSON. The translation keys are typed, and tests verify the same keys, interpolation placeholders, stable routes, project IDs and contact topic IDs in each language. Project counts use i18next plural forms.

For additional languages, create a corresponding locale directory, register it in `src/i18n/resources.ts`, update the supported language list/resolver and extend the switcher. Maintain translation key parity. Keep route paths, project IDs, image filename stems and topic IDs language-independent. Rebuild after edits.

The current application retains hash routing and one static HTML entry point. This provides multilingual application behaviour; it is not a pre-rendered, per-language SEO implementation. If independent indexed pages become a priority, add static pre-rendering and locale paths such as `/de/` and `/en/`. i18next can remain the translation layer.

## Publishing

`npm run build` produces `dist/`. Upload its contents to a static host. `base: './'` supports subdirectory hosting; hash routes do not require SPA fallbacks. For Azure Static Web Apps use app location `/`, leave API location blank and use output location `dist`. Do not deploy the development server.

Before public launch:

- Add Family Butler's verified product URL. Its core calendar and childcare module are described; the shared parenting module is labelled as being in beta testing. Recruitment targets beta testers, developers and Apple TV developers.
- Add the responsible operator, verified contact details, hosting privacy information and any required legal notice.
- Confirm legal form and financial support terms; the website accepts no payments and claims no tax deductibility.
- Keep Meet for Real and Safe Steps labelled as project ideas until their actual availability changes.
- Review the privacy/transparency text for the selected hosting provider.

## Concept review

The strongest direction in the concept is its clear human focus and emphasis on usefulness rather than screen time. The implementation uses a vivid teal, golden yellow, coral and blue palette with charcoal contrast, sans-serif Inter typography, distinct illustrations and visible development status. It retains the six proposed pages, transparent principles and participation paths. No app comparison results, team identities, commercial terms or nonprofit certifications are invented. The unresolved publishing details above remain explicit rather than appearing as finished services.

The original PDF is preserved unchanged.

## Current positioning

The website also incorporates the founder’s clarified mission: connect the right people and expertise, and make practical technology support accessible to smaller organisations working on social and human causes. Own projects invite advisory and development contributions. Commissioned services are presented separately: rapid prototyping, AI consulting, architecture reviews, concept reviews, advice and development, feasibility assessments, optimisation and security testing of existing solutions. Service IDs and enquiry topics remain stable across languages.

The Digital Media & Parenting project is an unpublished guideline initiative for parents of children using digital media. Its bilingual copy describes the intended scope and invites participation without presenting draft guidance as published recommendations.

## GitHub repository

The source repository is `https://github.com/HereTo-Help/hereto.help`.
Dependencies (`node_modules/`), build output (`dist/`), temporary files and local credentials are excluded from Git. Source code, content, local images, governance drafts and the original website concept are included.

For the prepared initial upload, run from this project folder:

```sh
git push -u origin main
```

For later updates, review `git diff`, run the project checks, then stage and commit the intended files before pushing. GitHub may ask you to sign in using Git Credential Manager.

### GitHub Pages

The workflow in `.github/workflows/pages.yml` installs dependencies, runs lint and tests, builds the website and deploys only `dist/`. It runs on pushes to `main` and can also be started manually.

One-time setup:

1. Open the repository Settings > Pages.
2. Under Build and deployment, select GitHub Actions as the Source.
3. Open Actions > Deploy website to GitHub Pages > Run workflow and choose `main` if the initial run occurred before Pages was enabled.
4. Wait for both build and deploy jobs to succeed.

The default website address is `https://hereto-help.github.io/hereto.help/`. The existing relative Vite base and hash routing support this repository subdirectory. A custom domain can be configured separately in Pages settings after DNS is ready.

After setup, pushes to `main` automatically update the published website. The launch prerequisites in the Publishing section still apply. `public/staticwebapp.config.json` is specific to Azure Static Web Apps; GitHub Pages does not apply its custom response headers.
