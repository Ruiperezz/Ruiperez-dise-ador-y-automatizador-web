# CLAUDE.md — Ruipérez Studio (ruiperez.dev)

## Contexto del proyecto

Portfolio personal y sitio de marca de Álvaro Ruipérez.
- **URL:** ruiperez.dev
- **Marca:** Ruipérez Studio (ruiperezstudio.es)
- **Stack:** Vanilla HTML + CSS + JavaScript · GSAP 3.12 + ScrollTrigger · Single-file
- **Deploy:** GitHub Pages / Vercel
- **Versión actual:** v6
- **Ubicación:** Cartagena, Murcia, España
- **Servicios:** Diseño web (950-2.500€) · Automatización (600€+) · Mantenimiento (90-150€/mes)

## Stack técnico

- GSAP 3.12 — animaciones principales
- ScrollTrigger — animaciones por scroll
- Lenis — smooth scroll
- Three.js — efectos 3D cuando aplica
- Vanilla JS — sin frameworks
- Sin npm — sin build step, deploy directo

## Efectos activos en v6

- Hero parallax
- Letter scramble effect
- 3D card tilt
- GSAP ScrollTrigger reveals
- Scroll progress bar
- Animaciones de entrada por sección

## Reglas de desarrollo

### Lo que NUNCA debes hacer
- No introducir frameworks (React, Vue, etc.)
- No dividir en múltiples archivos sin necesidad
- No usar efectos genéricos de AI
- No reducir la saturación visual
- No romper el scroll fluido de Lenis
- No actualizar GSAP sin testar primero

### Lo que siempre debes hacer
- Mantener GSAP 3.12 como versión fija
- Preservar el rendimiento de scroll
- Usar WebP para imágenes nuevas
- Testar en móvil
- Aplicar prefers-reduced-motion para accesibilidad
- Matar timelines GSAP al salir de sección

## Skills activas

### Skills globales
- frontend-design
- adrian-saenz-hostinger-premium-website
- file-reading
- pdf
- docx
- pptx
- xlsx

### Subagentes VoltAgent
- frontend-developer
- ui-designer
- ui-ux-tester
- performance-engineer
- seo-specialist
- code-reviewer
- documentation-engineer
- debugger

## Proyectos en portfolio

- Floristería Alameda — floristeriaalameda.com
- Casa del Sushi — casa-del-sushi.vercel.app
- Ñam Ñam — pizzería 4 locales Cartagena
- Zenconfort — ecommerce Shopify salud/bienestar
- Pedro — psicólogo (pedropsicologo.com)
- Tuktuk tourism startup Cartagena (en desarrollo)

## Servicios y precios

- Proyecto web básico: 950€ - 1.500€
- Proyecto web avanzado: 1.500€ - 2.500€
- Automatización: 600€+
- Mantenimiento mensual: 90€ - 150€/mes

## Comandos útiles

```bash
open index.html
npx vercel --prod
git add . && git commit -m "update" && git push origin main
```
