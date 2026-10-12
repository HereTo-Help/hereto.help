import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { build } from 'vite';

const root = process.cwd();
const output = path.resolve(root, 'dist');
const server = path.resolve(root, 'tmp/prerender');
await build({
  build: {
    ssr: 'src/prerender.tsx',
    copyPublicDir: false,
    outDir: server,
    emptyOutDir: true,
    rollupOptions: { output: { entryFileNames: 'render.mjs' } },
  },
});
const {
  render,
  getPageMetadata,
  getPublishedPaths,
  localizedPath,
  siteOrigin,
  getAgentContent,
} = await import(pathToFileURL(path.join(server, 'render.mjs')).href);
const template = await fs.readFile(path.join(output, 'index.html'), 'utf8');
const escape = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (c) =>
      ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[
        c
      ],
  );
const meta = (key, value, attribute = 'name') =>
  '<meta ' + attribute + '="' + key + '" content="' + escape(value) + '" />';
const link = (rel, href, extra = '') =>
  '<link rel="' + rel + '" href="' + escape(href) + '" ' + extra + '/>';
const paths = getPublishedPaths();
const sitemap = [];
const index = [
  '# Here to Help',
  '',
  '> Technology for social and human needs. German and English public content, with explicit project status and legal limitations.',
  '',
  'Association formation is being prepared. The German statutes remain a draft. No confirmed tax exemption or online payment acceptance is claimed. Photographs are AI-generated illustrations.',
  '',
  '## Public pages',
];
for (const language of ['de', 'en']) {
  for (const route of [...paths, '/404']) {
    const metadata = getPageMetadata(route, language);
    const markup = await render(route, language);
    const tags = [
      meta('description', metadata.description),
      meta(
        'robots',
        metadata.found
          ? 'index,follow,max-image-preview:large'
          : 'noindex,follow',
      ),
      link('canonical', metadata.url),
      ...metadata.alternates.map((item) =>
        link('alternate', item.url, 'hreflang="' + item.language + '" '),
      ),
      link('alternate', metadata.alternates[0].url, 'hreflang="x-default" '),
      meta('og:type', 'website', 'property'),
      meta('og:site_name', 'Here to Help', 'property'),
      meta('og:title', metadata.title, 'property'),
      meta('og:description', metadata.description, 'property'),
      meta('og:url', metadata.url, 'property'),
      meta('og:image', metadata.image, 'property'),
      meta('og:image:width', '1200', 'property'),
      meta('og:image:height', '630', 'property'),
      meta('og:image:alt', metadata.imageAlt, 'property'),
      meta('og:locale', language === 'de' ? 'de_CH' : 'en_GB', 'property'),
      meta(
        'og:locale:alternate',
        language === 'de' ? 'en_GB' : 'de_CH',
        'property',
      ),
      meta('twitter:card', 'summary_large_image'),
      meta('twitter:title', metadata.title),
      meta('twitter:description', metadata.description),
      meta('twitter:image', metadata.image),
      meta('twitter:image:alt', metadata.imageAlt),
      '<script id="structured-data" type="application/ld+json">' +
        JSON.stringify(metadata.structuredData).replace(/</g, '\u003c') +
        '</script>',
    ];
    let html = template.replace(
      /<html lang="[^"]*"/,
      '<html lang="' + (language === 'de' ? 'de-CH' : 'en') + '"',
    );
    html = html.replace(
      /<title>[^<]*<\/title>/,
      () => '<title>' + escape(metadata.title) + '</title>',
    );
    html = html.replace(/<meta\s+name="description"[^>]*>/, '');
    html = html.replace('</head>', () => tags.join('\n') + '\n</head>');
    html = html.replace(
      '<div id="root"></div>',
      () => '<div id="root">' + markup + '</div>',
    );
    const destination =
      route === '/404' && language === 'de'
        ? path.join(output, '404.html')
        : path.join(output, localizedPath(route, language), 'index.html');
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.writeFile(destination, html);
    if (metadata.found) {
      sitemap.push(
        '<url><loc>' +
          escape(metadata.url) +
          '</loc>' +
          metadata.alternates
            .map(
              (item) =>
                '<xhtml:link rel="alternate" hreflang="' +
                item.language +
                '" href="' +
                escape(item.url) +
                '" />',
            )
            .join('') +
          '<xhtml:link rel="alternate" hreflang="x-default" href="' +
          escape(metadata.alternates[0].url) +
          '" /></url>',
      );
      index.push(
        '- [' +
          metadata.title +
          '](' +
          metadata.url +
          '): ' +
          metadata.description,
      );
    }
  }
}
await fs.writeFile(
  path.join(output, 'sitemap.xml'),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n' +
    sitemap.join('\n') +
    '\n</urlset>\n',
);
await fs.writeFile(
  path.join(output, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: ' + siteOrigin + '/sitemap.xml\n',
);
await fs.writeFile(
  path.join(output, 'CNAME'),
  new URL(siteOrigin).hostname + '\n',
);
await fs.mkdir(path.join(output, 'content'), { recursive: true });
const full = [];
for (const language of ['de', 'en']) {
  const content = getAgentContent(language);
  await fs.writeFile(
    path.join(output, 'content', language + '.json'),
    JSON.stringify(content, null, 2) + '\n',
  );
  const lines = [
    '# Here to Help (' + language + ')',
    '',
    content.description,
    '',
    content.legalStatus,
    content.fundingNotice,
    content.fairPay,
    content.contactNotice,
    content.privacy,
    content.imageDisclosure,
    '',
    '## Services',
    content.servicesScope,
  ];
  for (const service of content.site.services)
    lines.push('### ' + service.title, service.summary, service.description);
  lines.push('## Approach for small budgets');
  for (const step of content.site.budgetSteps)
    lines.push('### ' + step.title, step.text);
  lines.push('## Questions about working together');
  for (const faq of content.site.serviceFAQs)
    lines.push('### ' + faq.question, faq.answer);
  lines.push('## Projects');
  for (const project of content.projects) {
    lines.push(
      '### ' + project.name,
      'URL: ' + siteOrigin + localizedPath('/projekte/' + project.id, language),
      'Status: ' + project.status,
      project.description,
      project.notice,
      ...project.goals.map((goal) => '- ' + goal),
    );
    for (const feature of project.features || [])
      lines.push('#### ' + feature.title, feature.text);
    if (project.research) lines.push(project.research);
  }
  lines.push(
    '## Personal project experience (not current contracts or endorsements)',
  );
  for (const reference of content.references)
    lines.push(
      '### ' + reference.organisation,
      reference.summary,
      reference.context,
      ...reference.work.map((item) => '- ' + item),
    );
  const markdown = lines.join('\n\n') + '\n';
  await fs.writeFile(path.join(output, 'content', language + '.md'), markdown);
  full.push(markdown);
}
index.push(
  '',
  '## Plain-text and structured content',
  '- [German content](' + siteOrigin + '/content/de.md)',
  '- [English content](' + siteOrigin + '/content/en.md)',
  '- [German JSON](' + siteOrigin + '/content/de.json)',
  '- [English JSON](' + siteOrigin + '/content/en.json)',
  '- [All content](' + siteOrigin + '/llms-full.txt)',
  '- [German draft statutes](' + siteOrigin + '/governance/statuten.de.md)',
  '',
);
await fs.writeFile(path.join(output, 'llms.txt'), index.join('\n'));
await fs.writeFile(path.join(output, 'llms-full.txt'), full.join('\n'));
console.log(
  'Pre-rendered ' +
    sitemap.length +
    ' indexable pages plus noindex error pages; generated sitemap, robots and agent content.',
);
