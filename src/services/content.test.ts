import { describe, expect, it } from 'vitest';
import { getImage, getProject, getProjects, getSiteContent } from './content';

describe('editable project content', () => {
  it('has unique route-safe IDs and required publishing information', () => {
    const projects = getProjects();
    expect(new Set(projects.map((project) => project.id)).size).toBe(
      projects.length,
    );
    for (const project of projects) {
      expect(project.id).toMatch(/^[a-z0-9-]+$/);
      expect(project.notice.length).toBeGreaterThan(0);
      expect(project.goals.length).toBeGreaterThan(0);
      expect(['existing', 'idea']).toContain(project.stage);
      expect(['sage', 'peach', 'lavender']).toContain(project.theme);
      expect(getImage(project.image).file).toBeTruthy();
      expect(getImage(project.image).alt).toContain('KI-generierte');
      if (project.stage === 'idea')
        expect(project.status).toContain('Projektidee');
      if (project.url) expect(new URL(project.url).protocol).toBe('https:');
    }
  });
  it('resolves project links and handles unknown projects', () => {
    for (const project of getProjects())
      expect(getProject(project.id)).toEqual(project);
    expect(getProject('missing')).toBeUndefined();
  });
  it('describes Safe Steps as a prevention and post-fraud project idea in both languages', () => {
    const german = getProject('safe-steps', 'de');
    const english = getProject('safe-steps', 'en');

    expect(german?.stage).toBe('idea');
    expect(german?.description).toMatch(/erkennen können/);
    expect(german?.description).toMatch(/zur Prävention/);
    expect(german?.description).toMatch(/nach einem Betrug/);

    expect(english?.stage).toBe('idea');
    expect(english?.description).toMatch(/recognise fraudulent tactics/);
    expect(english?.description).toMatch(/support prevention/);
    expect(english?.description).toMatch(/experienced fraud/);
  });
  it('describes stammbeiz.li as a historical project in both languages', () => {
    const german = getProject('stammbeiz-li', 'de');
    const english = getProject('stammbeiz-li', 'en');

    expect(german?.stage).toBe('existing');
    expect(german?.description).toMatch(/SpatialChat/);
    expect(german?.description).toMatch(/zwei Bars/);
    expect(german?.features?.map(({ text }) => text).join(' ')).toMatch(
      /Appenzeller.*nach Hause/,
    );
    expect(german?.features?.map(({ text }) => text).join(' ')).toMatch(
      /Burger.*abgeholt/,
    );
    expect(german?.notice).toMatch(/keine aktuellen Angebote/);

    expect(english?.stage).toBe('existing');
    expect(english?.description).toMatch(/SpatialChat/);
    expect(english?.description).toMatch(/two bars and restaurants/);
    expect(english?.features?.map(({ text }) => text).join(' ')).toMatch(
      /Appenzeller.*sent to participants at home/,
    );
    expect(english?.features?.map(({ text }) => text).join(' ')).toMatch(
      /Burgers.*pre-ordered.*collected/,
    );
    expect(english?.notice).toMatch(/not currently available/);
  });
  it('keeps an unconfirmed contact address unset', () => {
    const email = getSiteContent().contactEmail;
    expect(email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(true);
  });
});
