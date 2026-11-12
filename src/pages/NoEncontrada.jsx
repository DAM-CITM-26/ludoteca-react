import { Link } from 'react-router'
import Vacio from '../components/Vacio.jsx'

// Pantalla: una dirección o un juego que no existe
// (PantallaNoEncontrada de la referencia)
export default function NoEncontrada() {
  return (
    <>
      <Vacio icono="🧭" texto="Esta página no existe." />
      <p className="centrado">
        <Link className="btn enlace-btn" to="/">
          Volver al inicio
        </Link>
      </p>
    </>
  )
}
