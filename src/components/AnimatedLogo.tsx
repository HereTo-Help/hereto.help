import { useEffect, useId, useMemo, useRef } from 'react';
import {
  createLogoMarkup,
  createLogoPlayback,
  getLogoPose,
} from './logoAnimation';
import '../styles/animated-logo.css';

export function AnimatedLogo() {
  const id = useId();
  const markup = useMemo(() => createLogoMarkup(id), [id]);
  const link = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const element = link.current!;
    const svg = element.querySelector('svg')!;
    const to = svg.querySelector('[data-logo-word="to"]')!;
    const help = svg.querySelector('[data-logo-word="help"]')!;
    const dot = svg.querySelector('circle')!;
    const desktop = window.matchMedia('(min-width: 1051px)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let hovered = element.matches(':hover');
    let focused = document.activeElement === element;
    const playback = createLogoPlayback((progress) => {
      const pose = getLogoPose(progress);
      to.setAttribute('transform', `translate(${pose.to} 0)`);
      help.setAttribute('transform', `translate(${pose.help} 0)`);
      dot.setAttribute('transform', `translate(${pose.dotX} ${pose.dotY})`);
    });
    const update = () =>
      playback.setActive(
        desktop.matches && !reducedMotion.matches && (hovered || focused),
        !desktop.matches || reducedMotion.matches,
      );
    const enter = () => {
      hovered = true;
      update();
    };
    const leave = () => {
      hovered = false;
      update();
    };
    const focus = () => {
      focused = true;
      update();
    };
    const blur = () => {
      focused = false;
      update();
    };
    element.addEventListener('pointerenter', enter);
    element.addEventListener('pointerleave', leave);
    element.addEventListener('focus', focus);
    element.addEventListener('blur', blur);
    desktop.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    update();
    return () => {
      playback.dispose();
      element.removeEventListener('pointerenter', enter);
      element.removeEventListener('pointerleave', leave);
      element.removeEventListener('focus', focus);
      element.removeEventListener('blur', blur);
      desktop.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, [markup]);

  return (
    <a
      className="brand animated-logo"
      href="#/"
      aria-label="Here to Help"
      ref={link}
    >
      <span
        className="animated-logo-artwork"
        aria-hidden="true"
        dangerouslySetInnerHTML={{ __html: markup }}
      />
      <img
        className="brand-logo animated-logo-mobile"
        src={`${import.meta.env.BASE_URL}logos/logo-heretohelp-light.svg`}
        alt=""
      />
    </a>
  );
}
