self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    const root = self.registration.scope;
    for (const k of await caches.keys()) if (k.endsWith(root)) await caches.delete(k);
    await self.registration.unregister();
    for (const c of await self.clients.matchAll({ type: 'window' }))
      if (!new URL(c.url).pathname.startsWith('/timss/')) c.navigate(c.url);
  })());
});