import { useSyncExternalStore } from 'react';
import { readLocation } from '../services/routes';

function subscribe(callback: () => void) {
  window.addEventListener('popstate', callback);
  window.addEventListener('hashchange', callback);
  window.addEventListener('routechange', callback);
  return () => {
    window.removeEventListener('popstate', callback);
    window.removeEventListener('hashchange', callback);
    window.removeEventListener('routechange', callback);
  };
}
function snapshot() {
  const { path, params } = readLocation(new URL(window.location.href));
  return path + (params.size ? '?' + params.toString() : '');
}
export function useRoute(initialRoute = '/') {
  const route = useSyncExternalStore(subscribe, snapshot, () => initialRoute);
  const [path, query = ''] = route.split('?');
  return { path, params: new URLSearchParams(query) };
}
