import { useEffect, useState } from 'react'
import { LudotecaContext } from './ludoteca-context.js'
import { anadirJuego, buscarEntrada, quitarJuego } from '../utils/juegos.js'

const CLAVE = 'ludoteca'

// Lo guardado en el móvil, o una lista vacía la primera vez
// (como cargar() de la referencia)
function cargar() {
  const guardado = localStorage.getItem(CLAVE)
  return guardado ? JSON.parse(guardado) : []
}

// El Provider guarda «Mi ludoteca» y se la da a toda la app
export default function LudotecaProvider({ children }) {
  // Con una función, cargar() solo se llama la primera vez
  const [ludoteca, setLudoteca] = useState(cargar)

  // Efecto: cada vez que cambia, se guarda en el móvil
  // (como guardar() de la referencia)
  useEffect(() => {
    localStorage.setItem(CLAVE, JSON.stringify(ludoteca))
  }, [ludoteca])

  const valor = {
    ludoteca,
    estaGuardado: (juegoId) => buscarEntrada(ludoteca, juegoId) !== undefined,
    anadir: (juegoId) => setLudoteca((prev) => anadirJuego(prev, juegoId)),
    quitar: (juegoId) => setLudoteca((prev) => quitarJuego(prev, juegoId)),
  }
  return (
    <LudotecaContext.Provider value={valor}>
      {children}
    </LudotecaContext.Provider>
  )
}
