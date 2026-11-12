import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Carrusel from '../components/Carrusel.jsx'
import Destacado from '../components/Destacado.jsx'
import ListaJuegos from '../components/ListaJuegos.jsx'
import Chips from '../components/Chips.jsx'
import { filtrarPorDuracion } from '../utils/juegos.js'

const DURACIONES = ['Todas', 'Partida rápida', 'Partida media', 'Partida larga']

// Los juegos llegan por props desde App, que es quien los pide a la API
export default function Inicio({ juegos }) {
  const [duracion, setDuracion] = useState('Todas')
  const navigate = useNavigate()
  const novedades = juegos.filter((juego) => juego.novedad)
  const filtrados = filtrarPorDuracion(juegos, duracion)

  // Efecto: el título de la pestaña sigue al filtro.
  // document.title no lo pinta React: se cambia en un efecto.
  useEffect(() => {
    const filtro = duracion === 'Todas' ? '' : ` · ${duracion}`
    document.title = `Ludoteca${filtro} (${filtrados.length})`
  }, [duracion, filtrados.length])

  // Al pulsar: un juego cualquiera, y a su pantalla
  function irAUnJuegoAlAzar() {
    const juego = juegos[Math.floor(Math.random() * juegos.length)]
    navigate(`/juego/${juego.id}`)
  }

  return (
    <>
      <button type="button" className="btn" onClick={irAUnJuegoAlAzar}>
        🎲 Un juego al azar
      </button>
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
