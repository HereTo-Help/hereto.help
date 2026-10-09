# Editorial photography

These are AI-generated illustrative scenes created for Here to Help, not photographs of actual employees, service users, testimonials or operational projects. The website discloses this in its footer and image alternative text.

- `family`: a family sharing an unhurried breakfast, for Family Butler and the home hero.
- `connection`: adults connecting at a neighbourhood cafe, for Meet for Real.
- `support`: an empathetic conversation around notes, for Safe Steps.
- `collaboration`: a group listening and developing ideas together, for the working process, about and participation sections.

Generated with the built-in image-generation tool on 2026-10-08. Local WebP variants at 600, 1200 and 1536 pixels preserve each composition. The original PNGs remain in the Codex generated-images directory; the website depends only on the assets here.

Descriptions, filename stems and object positions are configured in `src/locales/{de,en}/images.json`; projects select their image in each language's `projects.json`. To substitute an image, supply the three matching WebP sizes and update the metadata in both languages. Preserve accurate attribution if using licensed photographs later.

## Reference image worlds

Generated with the built-in image-generation tool on 2026-10-09. These illustrative scenes are explicitly labelled on each reference card in German and English; they do not document the actual projects or named organisations. The local deliverables are `reference-{sailing,communications,adoption,fashion}-{600,1200,1536}.webp`. Reference-to-image and logo assignments are editable in `src/locales/{de,en}/references.json`. Full prompts are recorded in `reference-prompts.md`.

Original organisation logos are saved unchanged in `logos/`; their official pages, original asset URLs and retrieval date are recorded in `logos/sources.json`. The project owner confirmed that Sirius has no organisation logo; its reference uses the Lucide PawPrint icon as requested. The accessible label identifies it as a symbol. No generated logos substitute for an organisation's original logo.
