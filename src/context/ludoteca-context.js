import { createContext } from 'react'

// El Context de «Mi ludoteca»: lo que comparten varias pantallas.
// Aquí solo se crea; el valor lo pone LudotecaProvider.
export const LudotecaContext = createContext(null)
