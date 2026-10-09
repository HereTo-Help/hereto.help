import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import source from '../../public/logo-heretohelp-light.svg?raw';
import {
  createLogoMarkup,
  createLogoPlayback,
  FIRST_JUMP_END,
  getLogoPose,
  LOGO_DURATION,
} from './logoAnimation';

describe('inline logo artwork', () => {
  it('preserves every original path, the circular dot, colors, and viewBox', () => {
    const markup = createLogoMarkup('logo-one');
    expect(markup.match(/<path[^>]+\/>/g)).toEqual(
      source.match(/<path[^>]+\/>/g),
    );
    expect(markup).toContain(
      '<circle cx="309.510" cy="78.766" r="4.234" fill="#007f73" id="logo-one-period-dot" />',
    );
    expect(markup).toContain('viewBox="0 0 580 128"');
    expect(markup).toContain(
      source.slice(
        source.indexOf('<g transform'),
        source.indexOf('<path fill'),
      ),
    );
    for (const [word, count] of [
      ['here', 4],
      ['to', 2],
      ['help', 4],
    ] as const) {
      const group = markup.match(
        new RegExp(`<g data-logo-word="${word}">(.*?)</g>`),
      )!;
      expect(group[1].match(/<path /g)).toHaveLength(count);
    }
    expect(markup).not.toMatch(/<text|<image/);
  });

  it('namespaces all IDs and their references for multiple instances', () => {
    const first = createLogoMarkup('one');
    const second = createLogoMarkup('two');
    const ids = [...`${first}${second}`.matchAll(/\bid="([^"]+)"/g)].map(
      (match) => match[1],
    );
    expect(new Set(ids).size).toBe(ids.length);
    expect(first).toContain('aria-labelledby="one-title"');
    expect(second).toContain('aria-labelledby="two-title"');
  });
});

describe('SVG-coordinate logo trajectory', () => {
  it('opens natural word spaces and ends with the original dot after p', () => {
    expect(getLogoPose(0)).toEqual({ to: 0, help: 0, dotX: 0, dotY: 0 });
    const end = getLogoPose(1);
    expect(end.to).toBe(12);
    expect(end.help).toBe(6);
    expect(end.dotY).toBe(0);
    expect(309.51 + end.dotX - 4.234).toBeGreaterThan(429.474 + end.help);
    expect(getLogoPose(-1)).toEqual(getLogoPose(0));
    expect(getLogoPose(2)).toEqual(end);
  });

  it('lands on l and immediately starts a smaller second jump', () => {
    const landing = getLogoPose(FIRST_JUMP_END);
    expect(309.51 + landing.dotX).toBeCloseTo(389.304 + landing.help);
    expect(78.766 + landing.dotY + 4.234).toBeCloseTo(40.718);
    const before = getLogoPose(FIRST_JUMP_END - 0.001);
    const after = getLogoPose(FIRST_JUMP_END + 0.001);
    expect(before.dotY).toBeLessThan(landing.dotY);
    expect(after.dotY).toBeLessThan(landing.dotY);
    expect(after.dotX).toBeGreaterThan(landing.dotX);
    expect(Math.abs(after.dotY - landing.dotY)).toBeLessThan(0.2);
    const firstApex = Math.min(
      ...Array.from({ length: 65 }, (_, i) => getLogoPose(i / 100).dotY),
    );
    const secondApex = Math.min(
      ...Array.from({ length: 37 }, (_, i) => getLogoPose(0.64 + i / 100).dotY),
    );
    expect(secondApex).toBeGreaterThan(firstApex);
  });

  it('clears he and p and keeps the dot inside the original viewBox', () => {
    for (let i = 0; i <= 1000; i++) {
      const pose = getLogoPose(i / 1000);
      const x = 309.51 + pose.dotX - pose.help;
      const y = 78.766 + pose.dotY;
      // Conservative bounding-box checks against the original outlined letters.
      for (const [left, right, top] of [
        [320.158, 347.65, 40.718],
        [351.686, 380.86, 51.158],
        [399.546, 429.474, 51.158],
      ]) {
        if (x + 4.234 > left && x - 4.234 < right) {
          expect(y + 4.234).toBeLessThanOrEqual(top);
        }
      }
      expect(y - 4.234).toBeGreaterThan(0);
      expect(y + 4.234).toBeLessThan(128);
      expect(x + pose.help + 4.234).toBeLessThan(580);
    }
  });
});

describe('reversible logo playback', () => {
  let now: number;
  let callbacks: Map<number, FrameRequestCallback>;
  let nextId: number;

  beforeEach(() => {
    now = 0;
    nextId = 0;
    callbacks = new Map();
    vi.spyOn(performance, 'now').mockImplementation(() => now);
    vi.stubGlobal('requestAnimationFrame', (callback: FrameRequestCallback) => {
      callbacks.set(++nextId, callback);
      return nextId;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => callbacks.delete(id));
  });
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });
  function frame(elapsed: number) {
    now += elapsed;
    const pending = [...callbacks.values()];
    callbacks.clear();
    pending.forEach((callback) => callback(now));
  }

  it('renders intermediate frames over 650 ms, holds, then plays backward', () => {
    const render = vi.fn();
    const playback = createLogoPlayback(render);
    playback.setActive(true);
    frame(0);
    for (let i = 1; i <= 10; i++) {
      frame(LOGO_DURATION / 10);
      expect(render).toHaveBeenLastCalledWith(expect.closeTo(i / 10));
    }
    expect(callbacks.size).toBe(0);
    playback.setActive(false);
    frame(0);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(0.5);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(0);
    expect(callbacks.size).toBe(0);
  });

  it('reverses from the current position without snapping during rapid changes', () => {
    const render = vi.fn();
    const playback = createLogoPlayback(render);
    playback.setActive(true);
    frame(0);
    frame(260);
    now += 65;
    playback.setActive(false);
    expect(render).toHaveBeenLastCalledWith(0.5);
    frame(65);
    expect(render).toHaveBeenLastCalledWith(0.4);
    playback.setActive(true);
    expect(render).toHaveBeenLastCalledWith(0.4);
    frame(65);
    expect(render).toHaveBeenLastCalledWith(0.5);
    playback.setActive(false);
    playback.setActive(true);
    expect(callbacks.size).toBe(1);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(1);
  });

  it('renders a full animation even when the first callback is delayed', () => {
    const render = vi.fn();
    const playback = createLogoPlayback(render);
    playback.setActive(true);
    frame(1000);
    expect(render).toHaveBeenLastCalledWith(0);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(0.5);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(1);
    playback.setActive(false);
    frame(1000);
    expect(render).toHaveBeenLastCalledWith(1);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(0.5);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(0);
  });

  it('handles entry and exit before the first frame without skipping motion', () => {
    const render = vi.fn();
    const playback = createLogoPlayback(render);
    playback.setActive(true);
    now += 1000;
    playback.setActive(false);
    playback.setActive(true);
    expect(render).not.toHaveBeenCalled();
    expect(callbacks.size).toBe(1);
    frame(1000);
    expect(render).toHaveBeenLastCalledWith(0);
    frame(325);
    expect(render).toHaveBeenLastCalledWith(0.5);
    playback.setActive(false, true);
    expect(render).toHaveBeenLastCalledWith(0);
    expect(callbacks.size).toBe(0);
  });

  it('cancels callbacks on cleanup and applies static states immediately', () => {
    const render = vi.fn();
    const playback = createLogoPlayback(render);
    playback.setActive(true);
    playback.dispose();
    frame(650);
    expect(render).not.toHaveBeenCalled();
    playback.setActive(true, true);
    expect(render).toHaveBeenLastCalledWith(1);
    playback.setActive(false, true);
    expect(render).toHaveBeenLastCalledWith(0);
    expect(callbacks.size).toBe(0);
  });
});
