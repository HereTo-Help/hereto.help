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
  it('keeps an unconfirmed contact address unset', () => {
    const email = getSiteContent().contactEmail;
    expect(email === '' || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)).toBe(true);
  });
});
