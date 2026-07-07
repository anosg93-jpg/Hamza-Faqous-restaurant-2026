const CACHE_NAME = 'hamza-v11'; // قم بتغيير الرقم في كل مرة ترفع فيها تحديثاً كبيراً

self.addEventListener('install', (event) => {
    self.skipWaiting();
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    return caches.delete(cache);
                })
            );
        })
    );
});

self.addEventListener('fetch', (event) => {
    // نجعل الطلب يمر مباشرة للشبكة بدون الرجوع للـ Cache للملفات الأساسية
    event.respondWith(
        fetch(event.request).catch(() => {
            return caches.match(event.request);
        })
    );
});
