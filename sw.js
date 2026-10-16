const V='cb-v1',SHELL=['./','index.html','app.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'];
const put=(r,n)=>{if(n.status===200){const c=n.clone();caches.open(V).then(x=>x.put(r,c)).catch(()=>{})}return n};
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim())));
/* models and icons: cache first. Everything else (pages, lib): network first, cache as offline fallback. */
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 e.respondWith(/\/(models|icons)\//.test(u.pathname)?caches.match(r).then(h=>h||fetch(r).then(n=>put(r,n))):fetch(r).then(n=>put(r,n)).catch(()=>caches.match(r)))});
