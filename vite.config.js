import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Rutas relativas: la app funciona en cualquier carpeta, también en
  // https://<usuario>.github.io/<repositorio>/ (con HashRouter, las
  // pantallas van detrás del #)
  base: './',
})
