# Rutas

El árbol de rutas de `src/App.jsx`. Todas cuelgan de `Layout`, que pinta la cabecera, las pestañas y, en `<Outlet />`, la pantalla de la dirección.

| Dirección | Pantalla | Pestaña | De la referencia |
|---|---|---|---|
| `/` | `Inicio` | 🏠 Inicio | `#/` · `PantallaInicio` |
| `/catalogo` | `Catalogo` | 🎲 Catálogo | `#/catalogo` · `PantallaCatalogo` |
| `/juego/:id` | `Juego` | — | `#/juego/7` · `PantallaJuego` |
| `*` (cualquier otra) | `NoEncontrada` | — | `PantallaNoEncontrada` |

Un juego que no existe (`/juego/99`) también enseña `NoEncontrada`: la API responde 404.
