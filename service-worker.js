const CACHE_NAME = "delicias-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/src/styles/styles.css",
  "/src/styles/testimonials.css",
  "/src/styles/menu.css",
  "/src/styles/home.css",
  "/src/styles/header.css",
  "/src/styles/footer.css",
  "/src/javascript/script.js",
  "/src/images/hero.webp",
  "/src/images/dish.webp",
  "/src/images/dish2.webp",
  "/src/images/dish3.webp",
  "/src/images/dish4.webp",
  "/src/images/avatar.webp",
  "/src/images/chef.webp",
  "/src/images/prato.webp"

];
const cacheableExtensions = [".css", ".js", ".webp", ".svg"];


self.addEventListener("install", event => {
    event.waitUntil(
      caches.open(CACHE_NAME).then(cache => {
        return cache.addAll(urlsToCache);
      })
    );
  });
  
  self.addEventListener("fetch", event => {
    event.respondWith(
      caches.match(event.request).then(response => {
        if (response) {
          return response;
        }
  
        return fetch(event.request).then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            const url = event.request.url;
            const isCacheable = cacheableExtensions.some(ext => url.endsWith(ext));
  
            if (isCacheable) {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        });
      })
    );
  });
  
  self.addEventListener("activate", event => {
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cache => {
            if (cache !== CACHE_NAME) {
              return caches.delete(cache);
            }
          })
        );
      })
    );
  });