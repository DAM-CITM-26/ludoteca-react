import { useRef } from 'react'

// Molécula: el campo de búsqueda de la referencia, controlado (valor +
// onCambio)
export default function BarraBusqueda({ valor, onCambio }) {
  // useRef: una referencia al <input>, sin document.querySelector
  const campo = useRef(null)

  function borrar() {
    onCambio('')
    // El botón se ha llevado el foco: se devuelve al campo para seguir
    // escribiendo
    campo.current.focus()
  }

  return (
    <div className="row">
      <label className="field" htmlFor="busqueda">
        Buscar juego
        <input
          ref={campo}
          id="busqueda"
          type="search"
          value={valor}
          placeholder="Nombre del juego..."
          onChange={(evento) => onCambio(evento.target.value)}
        />
      </label>
      {valor !== '' && (
        <button type="button" className="btn btn-secundario" onClick={borrar}>
          Borrar
        </button>
      )}
    </div>
  )
}
