# -*- coding: utf-8 -*-
"""Cruza api/servicios.json contra el precio visible de cada página."""
import json, re, html, sys, os
os.chdir(os.path.dirname(os.path.abspath(__file__)) if False else '.')
d = json.load(open('api/servicios.json', encoding='utf-8'))
fallos = []
def fmt(n): return f"{n:,}".replace(",", ".")

for s in d['servicios']:
    slug = s['id']; f = f"{slug}/index.html"
    if not os.path.exists(f): fallos.append(f"{slug}: no existe {f}"); continue
    txt = html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', open(f, encoding='utf-8').read())))
    p = s['precio']
    esperado = fmt(p['desde_eur_sin_iva']) + "€"
    if esperado not in txt:
        fallos.append(f"{slug}: la API dice {esperado} y la página no lo contiene")
    if 'cuota_mensual_eur_sin_iva' in p:
        cuota = f"{p['cuota_mensual_eur_sin_iva']}€/mes"
        if cuota not in txt: fallos.append(f"{slug}: la API dice {cuota} y la página no lo contiene")
    if 'hasta_eur_sin_iva' in p:
        tope = fmt(p['hasta_eur_sin_iva']) + "€"
        if tope not in txt: fallos.append(f"{slug}: la API dice hasta {tope} y la página no lo contiene")

home = html.unescape(re.sub(r'\s+', ' ', re.sub(r'<[^>]+>', ' ', open('index.html', encoding='utf-8').read())))
for pk in d['packs']:
    for campo, etiq in (('precio_eur_sin_iva','pack'), ('precio_suelto_eur_sin_iva','suelto')):
        v = fmt(pk[campo]) + "€"
        if v not in home: fallos.append(f"pack {pk['id']}: la API dice {v} ({etiq}) y la home no lo contiene")
    if pk['precio_suelto_eur_sin_iva'] - pk['precio_eur_sin_iva'] != pk['ahorro_eur']:
        fallos.append(f"pack {pk['id']}: el ahorro no cuadra con la resta")

if fallos:
    print("  DESAJUSTES:"); [print("   ·", x) for x in fallos]; sys.exit(1)
print(f"  {len(d['servicios'])} servicios y {len(d['packs'])} packs: todos los precios cuadran con las páginas")

# ── DNS-AID: el cap-sha256 del registro SVCB tiene que cuadrar con api-catalog ──
import hashlib, base64
cap = open('.well-known/api-catalog', 'rb').read()
dig = base64.urlsafe_b64encode(hashlib.sha256(cap).digest()).decode().rstrip('=')
doc = open('docs/dns-aid.md', encoding='utf-8').read()
if dig not in doc:
    print(f"  DESAJUSTE: el cap-sha256 de docs/dns-aid.md no cuadra con api-catalog.\n"
          f"   valor correcto: {dig}")
    sys.exit(1)
print(f"  cap-sha256 cuadra con api-catalog: {dig}")

# ── El índice de agentes no debe declarar agentes que no existen ──
idx = json.load(open('.well-known/agents.json', encoding='utf-8'))
for c in idx['capabilities']:
    ruta = c['href'].replace('https://ruiperezstudio.es/', '')
    if not os.path.exists(ruta):
        print(f"  DESAJUSTE: agents.json apunta a {c['href']} y no existe {ruta}")
        sys.exit(1)
print(f"  agents.json: {len(idx['capabilities'])} capacidades, todas existen · {len(idx['agents'])} agentes declarados")

# ── El markdown no puede quedarse desfasado del HTML ──
import subprocess
r = subprocess.run([sys.executable, 'scripts/genera-markdown.py', '--check'],
                   capture_output=True, text=True)
if r.returncode != 0:
    print("  DESAJUSTE: el markdown de md/ no coincide con el HTML.")
    print("   " + r.stdout.strip())
    print("   Ejecuta: python3 scripts/genera-markdown.py")
    sys.exit(1)
print("  md/: el markdown coincide con el HTML")

# ── El digest del índice de habilidades tiene que cuadrar con el SKILL.md ──
idx = json.load(open('.well-known/agent-skills/index.json', encoding='utf-8'))
for sk in idx['skills']:
    ruta = sk['url'].lstrip('/')
    if not os.path.exists(ruta):
        print(f"  DESAJUSTE: la habilidad «{sk['name']}» apunta a {sk['url']} y no existe")
        sys.exit(1)
    real = 'sha256:' + hashlib.sha256(open(ruta, 'rb').read()).hexdigest()
    if real != sk['digest']:
        print(f"  DESAJUSTE: el digest de «{sk['name']}» no cuadra.\n   correcto: {real}")
        sys.exit(1)
print(f"  agent-skills: {len(idx['skills'])} habilidad(es), digest correcto")

# ── Los manifiestos ARD no pueden apuntar a recursos que no existan ──
for man in ['.well-known/ai-catalog.json', '.well-known/ard.json']:
    m = json.load(open(man, encoding='utf-8'))
    for e in m['entries']:
        ruta = e['url'].replace('https://ruiperezstudio.es/', '')
        if not os.path.exists(ruta):
            print(f"  DESAJUSTE: {man} apunta a {e['url']} y no existe {ruta}")
            sys.exit(1)
        if not e['identifier'].startswith('urn:air:ruiperezstudio.es:'):
            print(f"  DESAJUSTE: identificador mal formado en {man}: {e['identifier']}")
            sys.exit(1)
    print(f"  {man.split('/')[-1]}: {len(m['entries'])} entradas, todas existen")
