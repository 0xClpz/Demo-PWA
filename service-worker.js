const APP_CACHE = "weather-pwa-cache";
const DYNAMIC_CACHE = "weather-pwa-dynamic";

const PRECACHE = ["./", "index.html", "style.css", "main.js"];

/**
 * Called when the service worker is being installed
 */
self.addEventListener("install", event => {
  console.log("Registering service worker");
  caches.open(APP_CACHE).then(cache => {
    cache.addAll(PRECACHE);
  });
});

/**
 * Called when he browser makes a network request
 */
self.addEventListener("fetch", event => {
  const { url } = event.request;
  if (url.match("http://127.0.0.1:8080")) {
    // Network with cache fallback
    return event.respondWith(
      fetch(event.request).catch(() => {
        return caches.match(event.request);
      })
    );
  }
  // Network cached then access through main.js
  return event.respondWith(
    fetch(event.request).then(response => {
      return caches.open(DYNAMIC_CACHE).then(cache => {
        cache.put(event.request, response.clone());
        return response;
      });
    })
  );
});
