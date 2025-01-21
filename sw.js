const cacheName = '1.1.3';

// Installing Service Worker
self.addEventListener('install', (e) => {
  const contentToCache = [
    '/',
    '/index.html',
    '/app.js',
    '/style.css',
    '/manifest.json',
    '/favicon.ico',
    '/icons/android-chrome-192x192.png',
    '/icons/apple-touch-icon-76x76.png',
    '/icons/apple-touch-icon-120x120.png',
    '/icons/apple-touch-icon-152x152.png',
    '/icons/apple-touch-icon-180x180.png',
    '/icons/apple-touch-icon.png',
    '/icons/favicon-16x16.png',
    '/icons/favicon-32x32.png',
    '/icons/favicon.ico',
    '/icons/icon-32.png',
    '/icons/icon-64.png',
    '/icons/icon-76.png',
    '/icons/icon-96.png',
    '/icons/icon-120.png',
    '/icons/icon-128.png',
    '/icons/icon-152.png',
    '/icons/icon-168.png',
    '/icons/icon-192.png',
    '/icons/icon-256.png',
    '/icons/icon-512.png',
  ];
  e.waitUntil(caches.open(cacheName)
    .then((cache) => cache.addAll(contentToCache)));
});

// Fetching content using Service Worker
self.addEventListener('fetch', (e) => {
  e.respondWith(caches.match(e.request).then((r) => {
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`); // eslint-disable-line no-console
    return r || fetch(e.request).then((response) => caches.open(cacheName).then((cache) => {
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`); // eslint-disable-line no-console
      cache.put(e.request, response.clone());
      return response;
    }));
  }));
});
