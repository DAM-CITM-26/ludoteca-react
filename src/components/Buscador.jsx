import { useState } from 'react'
import ListaJuegos from './ListaJuegos.jsx'
import Cargando from './Cargando.jsx'
import ErrorCarga from './ErrorCarga.jsx'
import { useBusqueda } from '../hooks/useBusqueda.js'

// Organismo: un buscador que pregunta a la API.
// Sus tres estados viven en useBusqueda: el resto de Inicio no se entera.
export default function Buscador() {
  const [texto, setTexto] = useState('')
  // La búsqueda, en un custom hook: Buscador solo tiene el campo y pinta
  const { resultados, cargando, error, reintentar } = useBusqueda(texto)

  return (
    <div className="stack">
      <label className="field" htmlFor="busqueda">
        Buscar juego
        <input
          id="busqueda"
          type="search"
          value={texto}
          placeholder="Nombre, autoría, editorial…"
          onChange={(evento) => setTexto(evento.target.value)}
        />
      </label>
      {texto !== '' && cargando && <Cargando texto="Buscando…" />}
      {texto !== '' && error && <ErrorCarga mensaje={error} onReintentar={reintentar} />}
      {texto !== '' && !cargando && !error && <ListaJuegos juegos={resultados} />}
    </div>
  )
}
