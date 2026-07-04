const CACHE_NAME = 'hamza-cache-v2';
self.addEventListener('install', e => e.waitUntil(caches.open(CACHE_NAME)));
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => {
            return res || fetch(e.request).then(networkRes => {
                return caches.open(CACHE_NAME).then(cache => {
                    cache.put(e.request, networkRes.clone());
                    return networkRes;
                });
            });
        })
    );
});
