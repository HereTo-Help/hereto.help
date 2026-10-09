import source from '../../public/logo-heretohelp-light.svg?raw';

export const LOGO_DURATION = 650;
export const FIRST_JUMP_END = 0.64;

export function createLogoMarkup(prefix: string) {
  let letter = 0;
  return source
    .replace(/\bid="([^"]+)"/g, (_, id: string) => `id="${prefix}-${id}"`)
    .replace('aria-labelledby="title"', `aria-labelledby="${prefix}-title"`)
    .replace(/<path fill="[^"]+"[^>]+\/>/g, (path) => {
      const index = letter++;
      const word = index < 4 ? 'here' : index < 6 ? 'to' : 'help';
      const start =
        index === 0 || index === 4 || index === 6
          ? `<g data-logo-word="${word}">`
          : '';
      const end = index === 3 || index === 5 || index === 9 ? '</g>' : '';
      return `${start}${path}${end}`;
    });
}

function cubic(t: number, a: number, b: number, c: number, d: number) {
  const u = 1 - t;
  return u ** 3 * a + 3 * u ** 2 * t * b + 3 * u * t ** 2 * c + t ** 3 * d;
}

export function getLogoPose(progress: number) {
  const p = Math.max(0, Math.min(1, progress));
  const spacing = p * p * (3 - 2 * p);
  const help = 6 * spacing;
  const first = p <= FIRST_JUMP_END;
  const t = first
    ? p / FIRST_JUMP_END
    : (p - FIRST_JUMP_END) / (1 - FIRST_JUMP_END);
  // Original l: x=385.244..393.364, top=40.718. The dot's radius is 4.234.
  const x = first
    ? cubic(t, 309.51, 309.51, 360, 389.304)
    : cubic(t, 389.304, 415, 439.474, 439.474);
  const y = first
    ? cubic(t, 78.766, -16, 36, 36.484)
    : cubic(t, 36.484, 19, 29, 78.766);
  return { to: 12 * spacing, help, dotX: x + help - 309.51, dotY: y - 78.766 };
}

export function createLogoPlayback(render: (progress: number) => void) {
  let progress = 0;
  let origin = 0;
  let target = 0;
  let previous: number | undefined;
  let frame: number | undefined;

  function advance(now: number) {
    previous ??= now;
    const step = Math.max(0, now - previous) / LOGO_DURATION;
    progress =
      target > origin
        ? Math.min(target, origin + step)
        : Math.max(target, origin - step);
    render(progress);
  }

  function tick(now: number) {
    frame = undefined;
    advance(now);
    if (progress !== target) frame = requestAnimationFrame(tick);
  }

  return {
    setActive(active: boolean, immediate = false) {
      const nextTarget = active ? 1 : 0;
      if (!immediate && nextTarget === target) return;
      const now = performance.now();
      if (frame !== undefined && previous !== undefined) advance(now);
      origin = progress;
      previous =
        frame !== undefined && previous !== undefined ? now : undefined;
      target = nextTarget;
      if (immediate || progress === target) {
        if (frame !== undefined) cancelAnimationFrame(frame);
        frame = undefined;
        progress = target;
        render(progress);
      } else if (frame === undefined && progress !== target) {
        frame = requestAnimationFrame(tick);
      }
    },
    dispose() {
      if (frame !== undefined) cancelAnimationFrame(frame);
      frame = undefined;
    },
  };
}
