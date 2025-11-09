const CACHE_NAME = 'myapp-v1';

// 预缓存关键文件（安装时缓存）
const FILES_TO_PRECACHE = [
  '/ge32/labs/GeSeed/v2/index.html',
  '/manifest.json',
  '/app/icons/icon.png',
];

// 安装 Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(FILES_TO_PRECACHE))
  );
  self.skipWaiting();
});

// 激活 Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key); // 删除旧缓存
          }
        })
      )
    )
  );
  self.clients.claim();
});

// 动态缓存访问过的资源
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        return cachedResponse; // 缓存有，直接返回
      }
      return fetch(event.request).then(networkResponse => {
        // 把网络请求的文件缓存起来
        return caches.open(CACHE_NAME).then(cache => {
          // 这里 clone 一份给缓存，另一份给浏览器用
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      }).catch(() => {
        // 离线访问时，如果缓存里也没有，可以返回一个默认 fallback
        if (event.request.destination === 'document') {
          return caches.match('/ge32/labs/GeSeed/v2/index.html');
        }
      });
    })
  );
});
