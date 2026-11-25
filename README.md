# izandelacruz.dev.ar

Mi portafolio: una sola página en la que el punto de la «i» cae, crece y se convierte en la marea de cada proyecto.

**[Ver la web](https://izandelacruz.dev.ar)** · [Resumen en texto](https://izandelacruz.dev.ar/resumen)

## Qué tiene

- Animación ligada al scroll con SVG y `clip-path`, sin librerías de animación.
- Una ficha por proyecto y un resumen en una sola página.
- Modo día y noche, y tres idiomas: español, catalán e inglés.
- Con `prefers-reduced-motion` la animación empieza pausada, y se puede activar con un botón.
- Las páginas se generan como HTML al compilar, así que se leen sin JavaScript.

## Tecnologías

Vue 3, Vue Router, Vue I18n y Vite. Publicado en GitHub Pages.

## En local

```sh
cd frontend/personal-site
npm install
npm run dev
```

`npm run build` compila la web y genera el HTML de cada página. `npm run deploy` la publica en la rama `gh-pages`.

## Dónde está cada cosa

| Ruta | Contenido |
|---|---|
| `src/landing/` | El motor de la animación y los dibujos de cada proyecto |
| `src/views/` | La portada, las fichas y el resumen |
| `src/locales/` | Los textos en los tres idiomas |
| `scripts/prerender.mjs` | Genera el HTML, el mapa del sitio y `robots.txt` |
