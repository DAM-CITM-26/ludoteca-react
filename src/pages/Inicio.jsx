import { useEffect, useState } from 'react'
import Carrusel from '../components/Carrusel.jsx'
import Destacado from '../components/Destacado.jsx'
import ListaJuegos from '../components/ListaJuegos.jsx'
import Chips from '../components/Chips.jsx'
import Cargando from '../components/Cargando.jsx'
import ErrorCarga from '../components/ErrorCarga.jsx'
import { pedirJuegos } from '../data/api.js'
import { filtrarPorDuracion } from '../utils/juegos.js'

const DURACIONES = ['Todas', 'Partida rápida', 'Partida media', 'Partida larga']

export default function Inicio() {
  // Los tres estados de la carga, y los datos cuando llegan
  const [juegos, setJuegos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  // Cada clic en «Reintentar» suma uno, y el efecto vuelve a pedir los
  // datos
  const [intento, setIntento] = useState(0)
  const [duracion, setDuracion] = useState('Todas')

  useEffect(() => {
    let cancelado = false
    async function cargar() {
      setCargando(true)
      setError(null)
      try {
        const lista = await pedirJuegos()
        if (!cancelado) setJuegos(lista)
      } catch (e) {
        if (!cancelado) setError(e.message)
      } finally {
        if (!cancelado) setCargando(false)
      }
    }
    cargar()
    // Limpieza: si la pantalla se va antes de que llegue la respuesta,
    // se ignora
    return () => {
      cancelado = true
    }
  }, [intento])

  const novedades = juegos.filter((juego) => juego.novedad)
  const filtrados = filtrarPorDuracion(juegos, duracion)

  // Efecto: el título de la pestaña sigue al filtro.
  // document.title no lo pinta React: se cambia en un efecto.
  useEffect(() => {
    const filtro = duracion === 'Todas' ? '' : ` · ${duracion}`
    document.title = `Ludoteca${filtro} (${filtrados.length})`
  }, [duracion, filtrados.length])

  if (cargando) return <Cargando texto="Cargando juegos…" />
  if (error) {
    return (
      <ErrorCarga
        mensaje={error}
        onReintentar={() => setIntento((prev) => prev + 1)}
      />
    )
  }

  return (
    <>
      <section className="seccion">
        <h2>Juego del momento</h2>
        <Destacado juegos={novedades} />
      </section>
      <section className="seccion">
        <h2>Novedades</h2>
        <Carrusel juegos={novedades} />
      </section>
      <section className="seccion stack">
        <h2>Todos los juegos</h2>
        <Chips opciones={DURACIONES} valor={duracion} onCambio={setDuracion} />
        <ListaJuegos juegos={filtrados} />
      </section>
    </>
  )
}
