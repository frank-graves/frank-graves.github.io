// ---------------------------------------------------------------------------
// CUADERNO DE OFICIO — Micro-interacciones
// ---------------------------------------------------------------------------
// Solo animamos transform y opacity. IntersectionObserver dispara el reveal
// una única vez; después se desconecta para no desperdiciar CPU en scroll.
// Si el visitante prefiere movimiento reducido, no hacemos nada: el CSS ya
// fuerza el estado visible y este script se autodesactiva.

(() => {
  'use strict';

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;

  const piezas = document.querySelectorAll('[data-reveal]');
  if (!('IntersectionObserver' in window) || piezas.length === 0) {
    // Fallback estoico: si no hay IO, mostramos todo sin drama.
    piezas.forEach((pieza) => pieza.classList.add('es_visible'));
    return;
  }

  const observador = new IntersectionObserver(
    (entradas, obs) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('es_visible');
          // Lo retiramos tras el primer vistazo: no volverá a intersectar.
          obs.unobserve(entrada.target);
        }
      });
    },
    {
      // El umbral bajo hace que la pieza entre antes de ser completamente visible.
      threshold: 0.12,
      // Un pequeño margen negativo evita que aparezca de golpe al cargar.
      rootMargin: '0px 0px -8% 0px',
    }
  );

  piezas.forEach((pieza) => observador.observe(pieza));
})();
