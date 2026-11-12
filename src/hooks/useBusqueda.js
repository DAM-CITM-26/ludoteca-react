import { useEffect, useState } from 'react'
import { buscarJuegos } from '../data/api.js'

// Cuánto se espera sin escribir antes de preguntar a la API
const ESPERA = 400

// Custom hook: la búsqueda en la API, con sus tres estados.
// Recibe el texto; Buscador solo tiene el campo y pinta.
export function useBusqueda(texto) {
  const [resultados, setResultados] = useState([])
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    // Con el campo vacío no se pide nada (y no se toca el estado: lo
    // que se ve lo decide el render)
    if (texto === '') return
    let cancelado = false
    async function buscar() {
      setCargando(true)
      setError(null)
      try {
        const lista = await buscarJuegos(texto)
        // Si ya se ha escrito otra letra, esta respuesta llega tarde: se
        // ignora
        if (!cancelado) setResultados(lista)
      } catch (e) {
        if (!cancelado) setError(e.message)
      } finally {
        if (!cancelado) setCargando(false)
      }
    }
    // Debounce: no se pide a cada letra. Se espera a que se deje de
    // escribir; cada letra nueva ejecuta la limpieza, que cancela la
    // espera de la anterior
    const espera = setTimeout(buscar, ESPERA)
    return () => {
      cancelado = true
      clearTimeout(espera)
    }
  }, [texto, intento])

  function reintentar() {
    setIntento((prev) => prev + 1)
  }
  return { resultados, cargando, error, reintentar }
}
