// La cabecera de la referencia (index.html) y, debajo, la pantalla.
// La barra de pestañas llega en el Sprint 2, con React Router.
import FichaJuego from './components/FichaJuego.jsx'
import { JUEGOS } from './data/juegos.js'

export default function App() {
  return (
    <>
      <header className="cabecera">
        <h1>Ludoteca</h1>
      </header>
      <main>
        {/* Provisional: una tarjeta para comprobar que se ve como en la referencia */}
        <FichaJuego juego={JUEGOS[0]} />
      </main>
    </>
  )
}
