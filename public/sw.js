// SERVICE WORKER · guarda lo que se descarga de la app, para que se
// pueda abrir sin conexión. Primero la red; si no hay, lo guardado.
// Si cambiáis este fichero, subid la versión.
const VERSION = 'ludoteca-react-v1'

self.addEventListener('install', () => self.skipWaiting())

self.addEventListener('activate', (evento) => {
  evento.waitUntil(
    caches
      .keys()
      .then((claves) => Promise.all(claves.filter((c) => c !== VERSION).map((c) => caches.delete(c))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('fetch', (evento) => {
  if (evento.request.method !== 'GET') return
  // Los datos de la API no se guardan: sin conexión, la app enseña
  // su estado de error
  if (new URL(evento.request.url).origin !== self.location.origin) return
  evento.respondWith(
    fetch(evento.request)
      .then((respuesta) => {
        const copia = respuesta.clone()
        caches.open(VERSION).then((cache) => cache.put(evento.request, copia))
        return respuesta
      })
      .catch(() => caches.match(evento.request)),
  )
})
