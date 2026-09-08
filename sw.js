/* ============================================================
   AI App Coder v2 — Service Worker (Offline-First)
   Strategie: Cache-First für eigene Dateien,
   Network-First für externe API-Aufrufe (z. B. Wetter, KI-API)
   ============================================================ */
const CACHE_NAME = 'ai-app-coder-v2.2';

// Alle App-Dateien, die offline verfügbar sein sollen
const ASSETS = [
  './',
  './index.html',
  './landing.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-192.png',
  './icons/icon-maskable-512.png'
];

/* Install: App-Dateien vorab cachen.
   KEIN automatisches skipWaiting — die App entscheidet per
   Update-Benachrichtigung (SKIP_WAITING-Message), wann die neue
   Version aktiviert wird. */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS))
  );
});

/* Message: App signalisiert „Jetzt aktualisieren" */
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/* Activate: alte Caches aufräumen */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

/* Fetch: Cache-First für lokale Dateien, Network-First für Externes */
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  // Nur GET-Requests behandeln (KI-API-POSTs etc. direkt durchlassen)
  if (event.request.method !== 'GET') return;

  // Externe APIs (Wetter, Geocoding, KI): Network-First mit Cache-Fallback
  if (url.origin !== self.location.origin) {
    event.respondWith(
      fetch(event.request)
        .then((res) => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
          return res;
        })
        .catch(() => caches.match(event.request))
    );
    return;
  }

  // Eigene Dateien: Cache-First, Netzwerk als Fallback (und nachcachen)
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((res) => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE_NAME).then((c) => c.put(event.request, clone));
        }
        return res;
      });
    })
  );
});
