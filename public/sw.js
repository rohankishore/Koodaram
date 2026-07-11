const CACHE_NAME = 'koodaram-cache-v1';
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/logo.png'
];

// Install Event: pre-cache critical shell files
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    }).then(() => self.skipWaiting())
  );
});

// Activate Event: clean up old caches
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch Event: handle caching policies
self.addEventListener('fetch', (e) => {
  const url = new URL(e.request.url);

  // Only handle GET requests
  if (e.request.method !== 'GET') return;

  // 1. Network-first strategy for GitHub Data API queries (hostel data)
  if (url.hostname.includes('api.github.com') || url.hostname.includes('raw.githubusercontent.com')) {
    e.respondWith(
      fetch(e.request)
        .then((response) => {
          if (response.status === 200) {
            const resClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, resClone);
            });
          }
          return response;
        })
        .catch(() => {
          // Fall back to cache if offline
          return caches.match(e.request);
        })
    );
    return;
  }

  // 2. Stale-while-revalidate strategy for standard static assets (HTML, CSS, JS, images, fonts)
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      const fetchPromise = fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse.status === 200) {
            const resClone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(e.request, resClone);
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Ignore fetch errors (e.g. offline)
          return cachedResponse;
        });

      return cachedResponse || fetchPromise;
    })
  );
});
