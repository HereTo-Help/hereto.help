import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const source = new URL(
  '../public/governance/statuten.de.json',
  import.meta.url,
);
const output = new URL('../public/governance/statuten.de.md', import.meta.url);
const statutes = JSON.parse(fs.readFileSync(source, 'utf8'));
const text =
  [
    `# ${statutes.title}`,
    `Version ${statutes.version} · ${statutes.status} · erstellt am ${statutes.preparedOn}`,
    `Sitz: ${statutes.seat}`,
    statutes.adoptedOn
      ? `Beschlossen am: ${statutes.adoptedOn}`
      : 'Beschlussdatum: noch offen',
    statutes.notice,
    ...statutes.articles.flatMap((article) => [
      `## ${article.title}`,
      ...article.paragraphs.map(
        (paragraph, index) => `${index + 1}. ${paragraph}`,
      ),
    ]),
    '## Hinweise zur Annahme — kein Bestandteil der Statuten',
    ...statutes.adoptionNotes.map((note) => `- ${note}`),
    '## Rechtsgrundlagen',
    ...statutes.sources.map((source) => `- [${source.label}](${source.url})`),
  ].join('\n\n') + '\n';

if (process.argv.includes('--check')) {
  if (!fs.existsSync(output) || fs.readFileSync(output, 'utf8') !== text) {
    console.error(
      'Die herunterladbaren Statuten sind veraltet. npm run governance:generate ausführen.',
    );
    process.exitCode = 1;
  }
} else {
  fs.writeFileSync(output, text);
  console.log(`Statuten generiert: ${fileURLToPath(output)}`);
}
