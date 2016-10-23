var cacheName = 'todoPWA-1';
var filesToCache = [
  '/upload/pwa-todo-dev-onsen/',
  '/upload/pwa-todo-dev-onsen/index.html',
  '/upload/pwa-todo-dev-onsen/scripts/app.js',
  '/upload/pwa-todo-dev-onsen/scripts/controllers.js',
  '/upload/pwa-todo-dev-onsen/scripts/services.js',
  '/upload/pwa-todo-dev-onsen/scripts/time.js',
  '/upload/pwa-todo-dev-onsen/styles/inline.css'
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