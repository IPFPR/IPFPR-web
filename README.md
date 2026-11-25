<div align="center">

<img src="public/assets/img/escudo_instituto.png" alt="Escudo del Instituto" width="110">

# Sitio web del Instituto Robles · Nivel Superior

Sitio institucional del **Instituto Parroquial Francisco de Paula Robles** (Dolores, Buenos Aires):
carreras, planes de estudio, mesas de examen, preinscripción, biblioteca y autoridades.

**[Ver el sitio publicado → www.institutosparroquiales.com](https://www.institutosparroquiales.com)** · dirección alternativa: [ipfpr-web.vercel.app](https://ipfpr-web.vercel.app)

![Estado](https://img.shields.io/badge/estado-publicado-success)
![Versión](https://img.shields.io/badge/versión-1.0-821C20)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white)

</div>

---

## Qué es

Un sitio estático de nueve páginas que reúne la información del Nivel Superior del Instituto. Lo construyó un equipo de estudiantes de 2.º año de la Tecnicatura Superior en Análisis de Sistemas como proyecto integrador de **Prácticas Profesionalizantes II** (ciclo 2026), a pedido del docente de la cátedra.

**¿A quién le sirve este README?** A quien llega al repositorio y necesita entender qué hay, cómo se publica y cómo se cambia algo.

| Si usted… | Vaya a |
|---|---|
| tiene que actualizar las mesas de examen | [Guía rápida](docs/guia-rapida.md) |
| dirige el Instituto y tiene que decidir | [Resumen ejecutivo](docs/resumen-ejecutivo.md) |
| va a mantener o modificar el sitio | Este README y el [registro de decisiones](docs/registro-de-decisiones.md) |
| evalúa el proyecto | [Informe técnico final](docs/informe-tecnico-final.md) |

## Qué tiene el sitio

| Página | Dirección | Contenido |
|---|---|---|
| Inicio | `/` | Presentación, oferta académica, acceso a preinscripción y mapa |
| Análisis de Sistemas | `/interfazanalista.html` | Materias por año, docentes y plan de estudios (Res. 6790/19) |
| Psicopedagogía | `/interfazpsicopedagogia.html` | Materias por año, docentes y plan de estudios (Res. 2460/11) |
| Educación Inicial | `/interfazedinicial.html` | Materias por año, docentes y plan de estudios (Res. 4154/07) |
| Mesas de examen | `/mesasexamen.html` | 93 mesas del turno de diciembre de 2026, con buscador por materia o docente (con botón para borrar la búsqueda), selector de carrera y ordenamiento |
| Contacto | `/contacto.html` | Dirección, teléfono, correo, horario, accesos a WhatsApp y correo, redes y mapa |
| Preinscripción | `/preinscripciones.html` | Documentación requerida, correo de envío y horario de entrega presencial |
| Biblioteca | `/biblioteca.html` | Información y contacto de la biblioteca |
| Directivos | `/directivos.html` | Autoridades con nombre y cargo |

Cada dirección corresponde a un archivo con el mismo nombre dentro de `public/`. La carpeta no aparece en la dirección.

Todas las páginas comparten el mismo menú, el escudo como ícono y un botón flotante de WhatsApp abajo a la derecha, se adaptan a celulares y usan la misma identidad visual (bordó y dorado).

## Tecnología

| Qué | Con qué | Por qué |
|---|---|---|
| Páginas | HTML5 | Contenido informativo que cambia pocas veces por año |
| Estilos | [Tailwind CSS](https://tailwindcss.com) por CDN + `styles.css` | Diseño consistente sin paso de compilación |
| Interacción | JavaScript sin librerías | Buscador y orden de mesas; menú para celulares |
| Íconos y fuentes | Font Awesome · Google Fonts (Plus Jakarta Sans) | — |
| Publicación | [Vercel](https://vercel.com), plan gratuito | Publica solo con cada cambio en `main` |

No hay base de datos, servidor propio ni paso de compilación. El fundamento de cada elección está en el [registro de decisiones](docs/registro-de-decisiones.md).

## Estructura del repositorio

```text
IPFPR-web/
├── public/                           Todo lo que se publica
│   ├── index.html                    Inicio
│   ├── biblioteca.html               Biblioteca
│   ├── contacto.html                 Contacto
│   ├── directivos.html               Directivos
│   ├── interfazanalista.html         Análisis de Sistemas
│   ├── interfazedinicial.html        Educación Inicial
│   ├── interfazpsicopedagogia.html   Psicopedagogía
│   ├── mesasexamen.html              Mesas de examen
│   ├── preinscripciones.html         Preinscripción
│   ├── favicon.ico                   Escudo como ícono (16, 32 y 48 px)
│   └── assets/
│       ├── css/styles.css            Hoja de estilos compartida
│       ├── img/                      Logo y escudo
│       │   └── iconos/               Escudo en 48, 96 y 192 px, y 180 px para iPhone
│       └── planes-de-estudio/        Un PDF por carrera
├── docs/                             Documentación del proyecto (no se publica)
│   ├── informe-tecnico-final.md
│   ├── resumen-ejecutivo.md
│   ├── registro-de-decisiones.md
│   └── guia-rapida.md
└── README.md
```

Se publica solo la carpeta `public/` (D-08): no hay que cambiarle el nombre. Mover o renombrar un archivo de adentro cambia su dirección, y la anterior deja de funcionar.

## Verlo en su computadora

No hay nada que instalar.

```bash
git clone https://github.com/IPFPR/IPFPR-web.git
cd IPFPR-web
```

Abra `public/index.html` con doble clic. Si prefiere un servidor local:

```bash
cd public
python -m http.server 8000
# y abra http://localhost:8000
```

Hace falta conexión a internet: los estilos, las fuentes y los íconos se cargan desde un CDN.

## Cómo se publica

```mermaid
flowchart LR
    A[Rama propia] -->|pull request| B[Revisión de otro integrante]
    B -->|merge| C[main]
    C -->|automático, 1 a 2 min| D[www.institutosparroquiales.com]
```

Todo lo que entra a `main` sale publicado. Por eso **nadie integra lo que escribió**. Vercel genera una vista previa por cada rama: quien revisa la abre antes de aprobar.

Para volver atrás: revertir el commit en GitHub, o promover un despliegue anterior desde el panel de Vercel.

### Dominio y Google

- **Dominio:** `www.institutosparroquiales.com`, y el sitio sigue respondiendo también en `ipfpr-web.vercel.app`. Vence el **03/04/2027**: si no se renueva, la dirección deja de funcionar.
- **Google Search Console:** el sitio está verificado desde el 25/11/2026 con la etiqueta `google-site-verification` de `public/index.html`. **No hay que borrarla:** si se quita, se pierde el acceso.
- **Ícono en los resultados de Google:** sale de `public/favicon.ico` y de `public/assets/img/iconos/`, enlazados en las nueve páginas. Conviene no cambiarles el nombre. Google lo actualiza por su cuenta y puede tardar semanas.

## Cómo contribuir

```bash
git checkout main
git pull
git checkout -b mi-cambio            # una rama por cambio
# ...editar...
git add .
git commit -m "Corrijo los enlaces de contacto del pie"
git push origin mi-cambio
```

Después, abra un pull request en GitHub y pida revisión.

**Reglas del repositorio**

1. Todo cambio entra por pull request.
2. Aprueba otra persona, nunca el autor.
3. El mensaje del commit dice qué cambió.
4. Si cambia lo que el sitio hace, se actualiza `docs/` en el mismo pull request.
5. Nombres de archivo en minúsculas y sin espacios: Vercel distingue mayúsculas.

**Antes de pedir revisión, tenga en cuenta**

- El menú, el pie, los enlaces del ícono y el botón de WhatsApp están copiados en las nueve páginas. Un enlace nuevo se agrega en las nueve. La posición del botón se cambia una sola vez, en `.wsp-float` de `styles.css`.
- Los enlaces entre páginas llevan el nombre del archivo (`contacto.html`). Las imágenes y los estilos van con ruta relativa (`assets/...`). Un script nuevo va en `public/assets/js/`: lo que queda fuera de `public/` no se publica.
- Las mesas son filas de tabla dentro de `public/mesasexamen.html`. La fecha va como `dd/mm/aaaa` o el orden por fecha deja de funcionar.
- El año de inscripción está escrito a mano en `index.html` y `preinscripciones.html`.

## Estado y pendientes

Versión **1.0** (noviembre de 2026). Publicado y en uso. Pendientes conocidos:

| Pendiente | Detalle |
|---|---|
| Formularios de consulta de las carreras | Muestran un aviso de envío y no envían nada |
| Nombre institucional, correos y teléfonos | Hay variantes entre páginas; falta que el Instituto confirme los oficiales |
| Dominio y Search Console | Confirmar quién renueva el dominio y sumar una cuenta del Instituto como propietaria en Search Console |
| Menú único | Hoy está repetido en nueve archivos |
| Preinscripción en línea | El formulario está comentado en `preinscripciones.html` hasta que funcione. Para activarlo hacen falta aviso de privacidad y consentimiento (Ley 25.326) y una casilla oficial |

El detalle, con severidad y horas estimadas, está en el [Anexo A del informe](docs/informe-tecnico-final.md#anexo-a-registro-de-defectos).

## Equipo

| Integrante | Rol |
|---|---|
| **Valentino Plescia** | Project manager · QA · gestión de tiempos y recursos · aseguramiento de la calidad |
| **Germán Lauria** | Programador junior · project manager 2.0 · tester |
| **Tiago Bertoglio** | Analista funcional |
| **Anastasia Oldoni** | Diseñadora UX/UI |

Tecnicatura Superior en Análisis de Sistemas · Prácticas Profesionalizantes II · Ciclo 2026

## Sobre el contenido

Los textos, el escudo, el logo y los planes de estudio pertenecen al Instituto Parroquial Francisco de Paula Robles. El código es un trabajo académico del equipo. El sitio no recoge datos personales.

**Instituto:** Aristóbulo del Valle 350, Dolores, Buenos Aires · roblessuperior@gmail.com
