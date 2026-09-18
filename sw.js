/* PQM-Office service worker — precache the shell so the app opens
   offline after first install. Bump CACHE_VERSION whenever engine.js
   or index.html changes materially so users get the update on next open. */
const CACHE_VERSION = "pqmo-v17"; // bump on every engine.js / index.html change
const SHELL = [
  "./",
  "./index.html",
  "./engine.js",
  "./pixel-data.xml",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png",
  "./logo.png",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_VERSION).then((c) => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)))
  ).then(() => self.clients.claim()));
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // Only intercept same-origin GETs. Let CDN + XHR pass through untouched.
  if (e.request.method !== "GET" || url.origin !== self.location.origin) return;
  // Network-first with cache fallback — critical for a shipping product with
  // frequent updates. User always gets the freshest engine.js/index.html when
  // online; falls back to cache only when offline. Cache is topped up on every
  // successful fetch so offline mode stays warm.
  e.respondWith(
    fetch(e.request).then((res) => {
      if (res && res.status === 200) {
        const clone = res.clone();
        caches.open(CACHE_VERSION).then((c) => c.put(e.request, clone));
      }
      return res;
    }).catch(() => caches.match(e.request).then((cached) => cached || new Response("offline", { status: 503 })))
  );
});
