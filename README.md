# Cuaderno de oficio — Portafolio estático Y2K

Portafolio personal bajo la filosofía de El Arquitecto Esbelto.

## Estructura

```

/
├── index.html      # Única página, semántica y asimétrica
├── styles.css      # Textura, scanlines, bordes orgánicos, animaciones transform-only
├── script.js       # Reveal con IntersectionObserver (1 KB)
├── favicon.svg     # Sello local, cero request externo
└── fonts/          # (opcional) Coloca aquí tus woff2 variables

```

## Despliegue en GitHub Pages

1. Sube este repo a GitHub con nombre `TU_USUARIO.github.io`.
2. Ve a **Settings → Pages**.
3. En **Source** elige la rama `main` y carpeta `/ (root)`.
4. Guarda. Tu sitio estará en `https://TU_USUARIO.github.io/`.

No hay build, no hay Action, no hay dependencias. Pages sirve los archivos tal cual.

## Tipografía variable autoalojada

El CSS incluye fallbacks del sistema. Para activar tipografía variable real:

1. Descarga fuentes con licencia OFL, por ejemplo:
   - **Unbounded** (display): https://github.com/NaN-xyz/Unbounded
   - **Space Grotesk** (texto): https://github.com/floriankarsten/space-grotesk
2. Copia los archivos `.woff2` a `fonts/`.
3. Descomenta los bloques `@font-face` en `styles.css`.

Nunca uses Google Fonts CDN: viola el requisito de privacidad y añade latencia de red.

## Decisiones de diseño

- **Y2K/old internet**: fondo negro tinta, ácidos (lima/magenta/cyan), scanlines CRT, ruido SVG.
- **Asimetría**: grids 2fr/1fr y 1fr/2fr alternados, piezas desplazadas, bordes blob.
- **Rendimiento**: solo `transform` y `opacity` en animaciones; curvas `cubic-bezier` custom.
- **Anti-IA**: variables narrativas (`showcase_conduit`, `artifact_marginalia`) y comentarios con contexto humano.
