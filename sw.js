const C='gielda-v5-board-1';
const A=['./','./index.html','./404.html','./manifest.webmanifest','./apple-touch-icon.svg','./icon-192.svg','./icon-512.svg'];
self.addEventListener('install',e=>{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(A)))});
self.addEventListener('activate',e=>e.waitUntil(Promise.all([self.clients.claim(),caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==C).map(k=>caches.delete(k))))])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;e.respondWith(fetch(e.request).then(r=>{let q=r.clone();caches.open(C).then(c=>c.put(e.request,q));return r}).catch(()=>caches.match(e.request).then(r=>r||caches.match('./index.html'))))});
