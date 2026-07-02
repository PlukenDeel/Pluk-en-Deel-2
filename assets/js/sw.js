const CACHE = 'pluk-en-deel-v1';
const URLS = [
  '/',
  '/index.html',
  '/assets/css/main.css',
  '/assets/js/main.js'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(URLS)));
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => res || fetch(e.request))
      .catch(() => caches.match('/index.html'))
  );
});
