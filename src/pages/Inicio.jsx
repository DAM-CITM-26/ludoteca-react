import Carrusel from '../components/Carrusel.jsx'
import ListaJuegos from '../components/ListaJuegos.jsx'
import { JUEGOS } from '../data/juegos.js'

export default function Inicio() {
  const novedades = JUEGOS.filter((juego) => juego.novedad)
  return (
    <>
      <section className="seccion">
        <h2>Novedades</h2>
        <Carrusel juegos={novedades} />
      </section>
      <section className="seccion stack">
        <h2>Todos los juegos</h2>
        <ListaJuegos juegos={JUEGOS} />
      </section>
    </>
  )
}
