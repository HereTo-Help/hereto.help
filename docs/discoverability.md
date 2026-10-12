# Discoverability and publishing

## What the site provides

- Thirty public German and English HTML pages, generated from the same React components and JSON used by visitors. Text, headings and links are available without JavaScript. German lives at the domain root and English under /en/.
- Stable page URLs, individual titles and descriptions, self-canonical links and reciprocal de-CH/en/x-default language annotations. Query parameters used for contact drafts are excluded from canonical URLs.
- Open Graph and Twitter large-image cards with local 1200 × 630 JPEG exports. These are crops of the documented AI-generated editorial images, not documentary photographs. No social accounts or handles are invented.
- WebSite and WebPage JSON-LD. Project pages describe a CreativeWork with its real project status and notice, rather than claiming a released product, offer, rating, partnership or nonprofit certification.
- Generated sitemap.xml, permissive robots.txt, and a noindex 404.html. On GitHub Pages, missing URLs receive the host's HTTP 404. Hosts must serve the generated static files and return HTTP 404 for unknown pages; do not rewrite every path to a 200-status homepage.
- An optional llms.txt index, llms-full.txt and German/English Markdown and JSON exports under /content/. These derive from the published content and preserve legal, funding, contact and project caveats. They are convenience formats, not a requirement or promise of AI indexing. The German statutes stay a draft and are linked in their original language.
- Legacy #/ links still migrate to clean paths in JavaScript, including language and contact topics. Navigation remains in the app; language changes retain filters and unsent drafts. No analytics, cookies, backend or persistent browser storage were added.

## Domain and hosting

The project owner confirmed https://hereto.help as the public domain on 2026-10-12. It is the configured canonical origin. Change src/config/site.json if the public origin differs, then rebuild. The build generates a matching CNAME for GitHub Pages. Configure the custom domain, DNS and HTTPS in repository Settings → Pages; a CNAME file does not establish DNS or ownership. Domain-root deployment is required by the current Vite base. The GitHub repository subdirectory URL is no longer the target.

On Azure Static Web Apps, serve directory index files and configure the 404 response as appropriate for that host. The existing response headers remain. On other hosts, verify direct deep links and HTTPS before launch.

## Crawler policy

robots.txt permits all user agents to retrieve public content, including search and AI crawlers. This is an access policy, not an indexing guarantee. It does not separate AI search from model-training crawlers. If a separate training preference is desired, review and change the policy explicitly. OpenAI documents OAI-SearchBot for search separately from GPTBot for model-training use. Do not block a search crawler accidentally when changing training policy. Check CDN or host rules as well as robots.txt.

## Steps requiring account ownership

1. Finish DNS/HTTPS setup for the confirmed public domain, https://hereto.help. Confirm the real operator, hosting details and contact address before public launch; existing pending notices remain truthful.
2. Verify a domain property in Google Search Console using its supplied DNS TXT record. Submit https://hereto.help/sitemap.xml and inspect the home, services and representative project URLs after deployment. Do not commit a fabricated verification token.
3. Verify the site in Bing Webmaster Tools (or use its offered Search Console import), submit the same sitemap and inspect crawling. This needs no visitor analytics script.
4. Provide official social profile URLs before adding profile links or schema sameAs fields. Link those profiles to the public domain and use consistent name, description and identity. Share the canonical page URLs in relevant posts that describe the actual work and invite the appropriate audience. A website change does not create profiles, publish posts or secure placement in social feeds.
5. After deployment, inspect a services link and project link with LinkedIn Post Inspector and Facebook Sharing Debugger. Check titles, descriptions and image crops. Platforms can cache older previews; request a refresh after updates.
6. Monitor Search Console and Bing for indexing, queries and crawl problems. Revisit useful content as project status changes. Keep beta, historical and idea labels accurate; update source JSON and rebuild rather than editing generated output.

## Validation

Run npm run lint, npm test and npm run build. The build also runs governance consistency and scripts/check-discovery.mjs, checking all public output pages, local links, JSON-LD, social assets and language annotations. Check desktop/mobile routes, refresh, browser history, language switching, contact topics and old hash links in a browser. Do not treat a generated sitemap as evidence that a search engine has indexed the site.

## Sources

- Google JavaScript SEO: https://developers.google.com/search/docs/crawling-indexing/javascript/javascript-seo-basics
- Google AI features: https://developers.google.com/search/docs/appearance/ai-features
- Google multilingual pages: https://developers.google.com/search/docs/specialty/international/localized-versions
- Open Graph: https://ogp.me/
- OpenAI crawlers: https://developers.openai.com/api/docs/bots
- Search Console verification: https://support.google.com/webmasters/answer/9008080
- Bing Webmaster Tools: https://www.bing.com/webmasters/
- LinkedIn Post Inspector: https://www.linkedin.com/post-inspector/
- Facebook Sharing Debugger: https://developers.facebook.com/tools/debug/
