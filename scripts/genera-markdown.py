# -*- coding: utf-8 -*-
"""Genera md/*.md desde el HTML de cada página.

Se ejecuta a mano y el resultado se comitea. NO es un paso de build: este
proyecto no tiene ninguno y no se le añade. scripts/verifica-api.py vuelve a
ejecutarlo y falla si el resultado difiere de lo comiteado, que es lo que
evita que el markdown se quede desfasado respecto al HTML.
"""
import re, html, os, glob, sys

def limpia(t):
    t = re.sub(r'<br\s*/?>', ' ', t)
    t = re.sub(r'<[^>]+>', '', t)
    return re.sub(r'\s+', ' ', html.unescape(t)).strip()

def enfatiza(t):
    """Conserva <strong>/<em> como markdown antes de quitar el resto."""
    t = re.sub(r'<br\s*/?>', ' ', t)
    t = re.sub(r'<(?:strong|b)>(.*?)</(?:strong|b)>', r'**\1**', t, flags=re.S)
    t = re.sub(r'<(?:em|i)>(.*?)</(?:em|i)>', r'*\1*', t, flags=re.S)
    t = re.sub(r'<a [^>]*href="([^"]+)"[^>]*>(.*?)</a>', r'[\2](\1)', t, flags=re.S)
    t = re.sub(r'<[^>]+>', '', t)
    t = re.sub(r'\s+', ' ', html.unescape(t)).strip()
    return re.sub(r'\*\*\s*\*\*|\*\s*\*', '', t)

def convierte(ruta):
    s = open(ruta, encoding='utf-8').read()
    out = []

    tit = re.search(r'<title>(.*?)</title>', s, re.S)
    des = re.search(r'name="description" content="(.*?)"', s, re.S)
    can = re.search(r'rel="canonical" href="(.*?)"', s)

    h1 = re.search(r'<h1[^>]*>(.*?)</h1>', s, re.S)
    out.append(f"# {limpia(h1.group(1))}" if h1 else f"# {limpia(tit.group(1))}")
    out.append("")
    if des: out.append(f"> {limpia(des.group(1))}")
    if can: out.append(f">\n> Página: {can.group(1)}")
    out.append("")

    cuerpo = s[s.index('<main'):s.index('<footer')] if '<main' in s and '<footer' in s else s
    cuerpo = re.sub(r'<script.*?</script>', '', cuerpo, flags=re.S)
    cuerpo = re.sub(r'<svg.*?</svg>', '', cuerpo, flags=re.S)

    badge = re.search(r'class="hbadge"[^>]*>(.*?)</div>', cuerpo, re.S)
    if badge: out.append(f"*{limpia(badge.group(1))}*"); out.append("")
    sub = re.search(r'class="hsub"[^>]*>(.*?)</p>', cuerpo, re.S)
    if sub: out.append(enfatiza(sub.group(1))); out.append("")

    tr = re.search(r'class="htrust">(.*?)</div>\s*</div>', cuerpo, re.S)
    if tr:
        items = [enfatiza(x) for x in re.findall(r'<span>(.*?)</span>', tr.group(1), re.S)]
        if items:
            out.append("**De un vistazo**"); out.append("")
            out += [f"- {i}" for i in items if i]; out.append("")

    # Recorre las secciones en orden
    for m in re.finditer(r'<section[^>]*>(.*?)</section>', cuerpo, re.S):
        sec = m.group(1)
        if 'class="hero"' in m.group(0): continue
        # El FAQ se procesa aparte, al final. Si se recorre aquí también, las
        # respuestas salen dos veces.
        if 'id="faq"' in m.group(0): continue
        # Corta en el SIGUIENTE encabezado, no una ventana fija: si no, un h2
        # seguido de h3 se lleva los párrafos del h3 y salen duplicados.
        marcas = [(h.start(), h.end(), int(h.group(1)), limpia(h.group(2)))
                  for h in re.finditer(r'<h([2-4])[^>]*>(.*?)</h\1>', sec, re.S)]
        for i, (ini, fin, nivel, txt) in enumerate(marcas):
            if txt: out.append(f"\n{'#'*nivel} {txt}\n")
            corte = marcas[i+1][0] if i+1 < len(marcas) else len(sec)
            for p in re.findall(r'<p[^>]*>(.*?)</p>', sec[fin:corte], re.S)[:2]:
                t = enfatiza(p)
                if t and len(t) > 25: out.append(t); out.append("")
        for grupo in re.findall(r'class="inc[^"]*">(.*?)</div>\s*</div>', sec, re.S):
            items = [enfatiza(x) for x in re.findall(r'<span>(.*?)</span>', grupo, re.S)]
            for i in items:
                if i: out.append(f"- {i}")
            if items: out.append("")
        for amt, q in re.findall(r'class="p-amt">(.*?)</div>\s*(?:<div class="p-q">(.*?)</div>)?', sec, re.S):
            a = limpia(amt)
            if a: out.append(f"\n**Precio: {a}{' · ' + limpia(q) if q else ''}** (+ 21% IVA)\n")
        for li in re.findall(r'<li>(.*?)</li>', sec, re.S):
            t = enfatiza(li)
            if t and len(t) > 12: out.append(f"- {t}")

    faqs = re.findall(r'class="fq"[^>]*>(.*?)<span.*?<div class="fa"><p>(.*?)</p>', cuerpo, re.S)
    if faqs:
        out.append("\n## Preguntas frecuentes\n")
        for q, a in faqs:
            out.append(f"**{limpia(q)}**"); out.append(""); out.append(enfatiza(a)); out.append("")

    out.append("\n---\n")
    out.append("Ruipérez Studio · Álvaro Ruipérez · Cartagena, Región de Murcia.")
    out.append("Región de Murcia, Alicante, Almería y Valencia. WhatsApp: https://wa.me/34642084042")
    out.append("")
    out.append("Precios y plazos en JSON: https://ruiperezstudio.es/api/servicios.json")

    txt = "\n".join(out)
    txt = re.sub(r'\n{3,}', '\n\n', txt)
    return txt.strip() + "\n"

paginas = [p for p in glob.glob('index.html') + glob.glob('*/index.html') + glob.glob('lp/*/index.html')
           if '__a11y' not in p]
n = 0
for p in sorted(paginas):
    slug = os.path.dirname(p) or 'index'
    slug = slug.replace('/', '-')
    dest = f"md/{slug}.md"
    nuevo = convierte(p)
    anterior = open(dest, encoding='utf-8').read() if os.path.exists(dest) else None
    if anterior != nuevo:
        open(dest, 'w', encoding='utf-8').write(nuevo)
        if '--check' in sys.argv:
            print(f"  DESFASADO: {dest} no coincide con {p}"); sys.exit(1)
    n += 1
print(f"  {n} páginas convertidas a markdown")
