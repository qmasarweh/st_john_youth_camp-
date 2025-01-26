const CACHE_NAME = 'st-john-youth-camp-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/main.html',
  '/admin.html',
  '/day1.html',
  '/day2.html',
  '/day3.html',
  '/games.html',
  '/css/style.css',
  'photos/web-app-manifest-192x192',
  'photos/web-app-manifest-512x512',
  '/photos/f1.jpg'
];

// Install event: Cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(ASSETS_TO_CACHE))
  );
});

// Fetch event: Serve cached assets
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});