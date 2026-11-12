// El único fichero que habla con la API. Las pantallas solo llaman a
// estas funciones.
// La API (dam-fake-api) está publicada en Vercel: si cambiara de
// dirección, solo cambia esta línea.
const BASE = 'https://dam-fake-api.vercel.app/api/ludoteca'

// La API habla en inglés y con su forma; la app, con la de
// docs/datos.md.
// Esta función traduce un juego de la API al modelo de la app.
function aJuego(juegoApi) {
  const { min, max } = juegoApi.players
  return {
    id: juegoApi.id,
    nombre: juegoApi.title,
    autoria: juegoApi.author,
    jugadores: min === max ? `${min}` : `${min}-${max}`,
    duracion: juegoApi.duration_min,
    color: juegoApi.cover_color,
    editorial: {
      nombre: juegoApi.publisher.name,
      pais: juegoApi.publisher.country,
    },
    valoracion: juegoApi.rating,
    categoria: juegoApi.category,
    descripcion: juegoApi.description,
    novedad: juegoApi.is_new,
  }
}

export async function pedirJuegos() {
  const respuesta = await fetch(`${BASE}/games?limit=100`)
  if (!respuesta.ok) {
    throw new Error(`La API respondió ${respuesta.status}`)
  }
  const datos = await respuesta.json()
  return datos.results.map(aJuego)
}
