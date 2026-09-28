# DNS-AID · registro DNS pendiente de Álvaro

Estado: **el archivo ya está publicado, el registro DNS no.**
Lo del repositorio está hecho. Lo del DNS solo puede hacerlo quien entre en IONOS.

## Lo que ya está hecho y en producción

| Qué | Dónde |
|---|---|
| Índice de descubrimiento | `/.well-known/agents.json` |
| Descriptor de capacidades | `/.well-known/api-catalog` (RFC 9727) |
| Anunciado en la cabecera `Link` | `rel="service-meta"` (RFC 8631) |

**El índice declara que NO hay agentes** (`"agents": []`), porque no los hay: ni agente
A2A ni servidor MCP. Lo que hay es una API HTTP de solo lectura, y eso sí está listado.
Un índice que dice la verdad le ahorra al consumidor sondear el dominio. **Si algún día
hay un agente de verdad, se añade a ese array y se actualiza el `cap-sha256` de abajo.**

## El registro que falta

Panel de IONOS → Dominios → `ruiperezstudio.es` → DNS → Añadir registro.
Busca **SVCB** en el desplegable de tipo. Si no aparece, ver «Si IONOS no lo ofrece».

```
Nombre:     _index._agents
Tipo:       SVCB
TTL:        3600
Prioridad:  1
Destino:    ruiperezstudio.es.
Parámetros: alpn="h2,h3" well-known="/.well-known/agents.json" cap="/.well-known/api-catalog" cap-sha256="ta_hXprqj_Y8Ix6zRkdvcmwhRykmzs0cTT2IQOuMBzk"
```

En formato de archivo de zona, por si el panel pide pegarlo de una pieza:

```
_index._agents.ruiperezstudio.es. 3600 IN SVCB 1 ruiperezstudio.es. alpn="h2,h3" well-known="/.well-known/agents.json" cap="/.well-known/api-catalog" cap-sha256="ta_hXprqj_Y8Ix6zRkdvcmwhRykmzs0cTT2IQOuMBzk"
```

### De dónde sale cada parámetro

Los nombres están tomados del borrador `draft-mozleywilliams-dnsop-dnsaid-02`
(27/05/2026), tabla 1 de la sección 3.1. **No son inventados.**

- `alpn` — el borrador pone como ejemplo `mcp` o `a2a`, que aquí no aplican porque no
  hay ninguno de los dos. Se usa el valor de la RFC 9460, que es el protocolo real de
  transporte: HTTP/2 y HTTP/3.
- `well-known` — la ruta del descriptor. Apunta a `agents.json`.
- `cap` — el localizador del descriptor de capacidades: el `api-catalog`.
- `cap-sha256` — digest SHA-256 en base64url del contenido de `api-catalog`.
  **Si cambias `api-catalog`, este valor deja de cuadrar.** Se recalcula así:

```bash
python3 -c "import hashlib,base64;print(base64.urlsafe_b64encode(hashlib.sha256(open('.well-known/api-catalog','rb').read()).digest()).decode().rstrip('='))"
```

## DNSSEC: NO hace falta

El borrador dice **«SHOULD be DNSSEC-signed»**, sección 6.4. Es una recomendación, no un
requisito: el registro funciona sin firmar la zona.

⚠️ **No lo actives por este motivo.** Si la firma y el registro DS se desincronizan, el
dominio deja de resolver: se cae la web y se cae el correo. El riesgo es real y la
ganancia aquí es que un validador estricto vea el dato como autenticado. Para una web de
escaparate, mal cambio. Si algún día se activa, hazlo **otro día distinto** que este
registro, para saber qué rompió qué.

## Si IONOS no lo ofrece

El tipo SVCB está documentado en *IONOS Cloud DNS*, pero `ruiperezstudio.es` usa los
nameservers del panel de dominios normal (`ns*.ui-dns.*`), que es otro producto y puede
tener una lista más corta. Si SVCB no está en el desplegable, las opciones son:

1. **Dejarlo.** Es lo que recomiendo. Ver la sección siguiente.
2. Mover el DNS a Cloudflare o a Vercel, que sí lo soportan. Mover el DNS de un dominio
   en producción tiene su propio riesgo y **no se hace para esto**.

## Por qué esto vale poco, dicho claro

- Es un **borrador individual**, no un RFC. La propia ficha dice *«not endorsed by IETF»*
  y caduca el 28/11/2026.
- Sirve para **descubrir agentes**. Aquí no hay ninguno.
- Lo que anuncia ya es localizable por cinco caminos que sí funcionan hoy: la cabecera
  `Link`, `/.well-known/api-catalog`, `robots.txt`, `llms.txt` y `sitemap.xml`.

Se prepara porque Álvaro lo pidió y porque el archivo no cuesta nada ni estorba. **El
registro DNS queda a su decisión.**
