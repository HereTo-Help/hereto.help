import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  return () => window.removeEventListener('hashchange', callback);
}
function snapshot() {
  return window.location.hash.slice(1) || '/';
}
export function useRoute() {
  const route = useSyncExternalStore(subscribe, snapshot, () => '/');
  const [path, query = ''] = route.split('?');
  return { path, params: new URLSearchParams(query) };
}
