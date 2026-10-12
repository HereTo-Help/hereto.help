import fs from 'node:fs/promises';
import path from 'node:path';
import assert from 'node:assert/strict';
const root = path.resolve('dist');
const sitemap = await fs.readFile(path.join(root, 'sitemap.xml'), 'utf8');
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(
  (match) => new URL(match[1]),
);
assert(urls.length >= 30, 'Missing bilingual pages');
for (const url of urls) {
  const html = await fs.readFile(
    path.join(root, url.pathname, 'index.html'),
    'utf8',
  );
  assert(html.includes('<h1'), 'No pre-rendered heading: ' + url);
  assert(!html.includes('href="#/'), 'Hash-only link: ' + url);
  assert(
    html.includes('rel="canonical" href="' + url.href + '"'),
    'Incorrect canonical: ' + url,
  );
  assert(
    html.includes('hreflang="de-CH"') && html.includes('hreflang="en"'),
    'Missing alternates: ' + url,
  );
  const schema = html.match(
    /<script id="structured-data" type="application\/ld\+json">([^<]+)<\/script>/,
  );
  assert(schema, 'Missing JSON-LD: ' + url);
  JSON.parse(schema[1]);
  const image = html.match(/property="og:image" content="([^"]+)"/);
  assert(image, 'Missing social image: ' + url);
  await fs.access(path.join(root, new URL(image[1]).pathname));
  for (const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const local = path.join(root, match[1]);
    await fs.access(
      match[1].endsWith('/') ? path.join(local, 'index.html') : local,
    );
  }
}
const error = await fs.readFile(path.join(root, '404.html'), 'utf8');
assert(error.includes('noindex,follow'), '404 must not be indexed');
for (const language of ['de', 'en']) {
  const content = JSON.parse(
    await fs.readFile(path.join(root, 'content', language + '.json'), 'utf8'),
  );
  assert.equal(content.site.contactEmail, '');
  assert(
    content.projects.find((project) => project.id === 'stammbeiz-li').notice,
  );
  assert(
    content.projects.find((project) => project.id === 'family-butler').notice,
  );
}
console.log(
  'Discovery checks passed for ' +
    urls.length +
    ' pages, local links, JSON-LD, social images and status exports.',
);
