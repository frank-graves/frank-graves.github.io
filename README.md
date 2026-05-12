# Proyecto Voto Joven

Prototipo web completo para el reto de MiBanco: **¿Cómo incentivamos a los jóvenes de manera más activa e informada?**

## Descripción

Este proyecto es una plataforma estática, moderna y orientada a jóvenes peruanos de 18 a 30 años. Permite conocer, comparar y entender rápidamente a los candidatos presidenciales y sus planes de gobierno con una experiencia interactiva, visual y mobile-first.

## Estructura del proyecto

- `index.html` — página principal del sitio.
- `README.md` — documentación y pasos para desplegar.
- `/assets/css/styles.css` — estilos personalizados y temas glass.
- `/assets/js/app.js` — lógica de la app, interacciones y animaciones.
- `/assets/data/candidatos.js` — datos demo de candidatos y planes.
- `/components/navbar.js` — comportamiento del navbar y scroll suave.
- `/components/cards.js` — renderizado de tarjetas y acordeones.
- `/components/comparador.js` — lógica de comparación de candidatos.
- `/components/charts.js` — generación de gráficos con Chart.js.
- `/assets/img/candidatos/` — retratos SVG de candidatos.

## Características

- Diseño dark moderno con glassmorphism.
- Responsive y optimizado para celulares.
- Navegación sticky y scroll suave.
- Secciones de candidato, comparador, planes, experiencia interactiva y CTA.
- Animaciones de entrada con AOS.
- Gráficos con Chart.js.
- Generador de QR para compartir la página.
- Funcionalidad de copiar enlace y back-to-top.

## Tecnologías usadas

- HTML5
- CSS3
- JavaScript Vanilla (ES Modules)
- TailwindCSS CDN
- AOS por CDN
- Chart.js por CDN
- Font Awesome por CDN
- QRCode.js por CDN

## Cómo usar

1. Abrir el proyecto en VS Code.
2. Abrir `index.html` en el navegador.
3. Para desplegar en GitHub Pages, subir el repositorio y activar Pages en la rama `main`.

## Despliegue en GitHub Pages

1. Subir todos los archivos al repositorio.
2. En GitHub, ir a **Settings > Pages**.
3. Seleccionar la rama `main` y la carpeta `/`.
4. Guardar y esperar unos minutos.

## Nota

Este prototipo usa datos demo realistas y mantiene neutralidad política. Está preparado para ser editado de manera fácil y escalable.
