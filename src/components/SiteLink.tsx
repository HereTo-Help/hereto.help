import type { ComponentPropsWithRef, MouseEvent } from 'react';
import { getLanguage } from '../i18n';
import { localizedPath } from '../services/routes';

export function SiteLink({
  href = '',
  onClick,
  ...props
}: ComponentPropsWithRef<'a'>) {
  const internal = href.startsWith('#/');
  const [path, query = ''] = internal ? href.slice(1).split('?') : ['', ''];
  const destination = internal
    ? localizedPath(path, getLanguage()) + (query ? '?' + query : '')
    : href;
  const click = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (
      !internal ||
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      props.target ||
      props.download
    )
      return;
    event.preventDefault();
    window.history.pushState(null, '', destination);
    window.dispatchEvent(new Event('routechange'));
  };
  return <a {...props} href={destination} onClick={click} />;
}
