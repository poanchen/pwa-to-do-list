var cacheName = 'todoPWA-1';
var filesToCache = [
  '/pwa-to-do-list/',
  '/pwa-to-do-list/index.html',
  '/pwa-to-do-list/scripts/app.js',
  '/pwa-to-do-list/scripts/controllers.js',
  '/pwa-to-do-list/scripts/services.js',
  '/pwa-to-do-list/scripts/hash.js',
  '/pwa-to-do-list/scripts/time.js',
  '/pwa-to-do-list/styles/inline.css'
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', function(e) {
  console.log('[Service Worker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});