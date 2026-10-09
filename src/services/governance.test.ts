import { describe, expect, it } from 'vitest';
import { getStatutes } from './statutes';
import { readFileSync } from 'node:fs';

describe('German statutes and agent governance', () => {
  it('keeps a single German source with unique section anchors and explicit draft status', () => {
    const statutes = getStatutes();
    expect(statutes.seat).toBe('Ebikon, Kanton Luzern');
    expect(statutes.adoptedOn).toBeNull();
    expect(statutes.status).toContain('Entwurf');
    expect(new Set(statutes.articles.map((article) => article.id)).size).toBe(
      statutes.articles.length,
    );
    for (const article of statutes.articles) {
      expect(article.id).toMatch(/^[a-z0-9-]+$/);
      expect(article.paragraphs.length).toBeGreaterThan(0);
    }
  });

  it('makes the same statutes source available to Codex and Copilot', () => {
    for (const path of ['AGENTS.md', '.github/copilot-instructions.md']) {
      const instructions = readFileSync(path, 'utf8');
      expect(instructions).toContain('public/governance/statuten.de.json');
      expect(instructions).toContain('governance:generate');
    }
    const downloaded = readFileSync('public/governance/statuten.de.md', 'utf8');
    for (const article of getStatutes().articles) {
      expect(downloaded).toContain(article.title);
      for (const paragraph of article.paragraphs)
        expect(downloaded).toContain(paragraph);
    }
  });
});
