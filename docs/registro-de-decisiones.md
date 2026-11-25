# Registro de decisiones técnicas

Sitio web del Instituto Robles (Nivel Superior) · TP9, parte B · 16/11/2026 · actualizado el 25/11/2026

Para: quien herede el mantenimiento del sitio y necesite saber por qué está hecho así. Es el mismo contenido de la sección 15 del [informe técnico final](informe-tecnico-final.md). Las referencias a defectos (DEF), pendientes (P) y riesgos (R) remiten a ese informe.

**Estados posibles:** vigente · revisada · se revertiría.

Ocho decisiones. Las seis primeras no se registraron cuando se tomaron: las fechas salen del historial y el fundamento es el que el equipo sostiene hoy. D-07 y D-08 se registraron el mismo día. **D-02 es la que hoy se revertiría**; D-06 se revisó.

| # | Decisión | Fecha | Estado |
|---|---|---|---|
| D-01 | Sitio estático, sin base de datos ni servidor | 08/07/2026 | Vigente |
| D-02 | Menú copiado a mano en cada página | 02/09/2026 | **Se revertiría** |
| D-03 | Mesas de examen guardadas dentro del HTML | 30/09/2026 | Vigente |
| D-04 | Publicación en Vercel, automática desde `main` | 19/10/2026 | Vigente, con condición |
| D-05 | Desactivar la preinscripción en línea hasta que funcione | 26/10/2026 | Vigente |
| D-06 | Construir sin diagnóstico ni alcance escritos | 01/07/2026 | Revisada |
| D-07 | Página de contacto sin formulario, con WhatsApp, correo y teléfono | 18/11/2026 | Vigente |
| D-08 | Sitio en la carpeta `public/`, con las mismas direcciones | 25/11/2026 | Vigente |

### D-01 · Sitio estático, sin base de datos ni servidor

| Campo | Contenido |
|---|---|
| Decisión | Construir el sitio con HTML, CSS (una hoja compartida más Tailwind desde un CDN) y JavaScript, sin base de datos ni servidor propio |
| Fecha | 08/07/2026 (primer commit de la página de inicio) |
| Contexto | El pedido era una página institucional de contenido casi todo informativo, para una institución sin presupuesto ni personal técnico |
| Alternativas consideradas | (a) Gestor de contenidos como WordPress. (b) Aplicación con framework de JavaScript y base de datos |
| Fundamento | Era la tecnología que los cuatro integrantes ya manejaban. No necesita servidor, no cuesta dinero y no tiene base de datos que proteger ni actualizar. El contenido cambia pocas veces por año |
| Consecuencias | A favor: costo cero, nada que mantener en un servidor. Se resigna: que el Instituto edite desde un panel. Cada cambio exige editar un archivo, y las nueve páginas dependen de un CDN para sus estilos |
| Estado | Vigente |

### D-02 · Menú copiado a mano en cada página (hoy se revertiría)

| Campo | Contenido |
|---|---|
| Decisión | Escribir el menú de navegación y el pie completos dentro de cada archivo HTML |
| Fecha | 02/09/2026 (al agregar la segunda página) |
| Contexto | Cada integrante construía una página en su propia rama y necesitaba que funcionara sola |
| Alternativas consideradas | (a) Un único archivo de menú que todas las páginas cargan con JavaScript. (b) Un generador de sitios estáticos con plantillas |
| Fundamento | Era lo más rápido y permitía trabajar en paralelo sin depender del archivo de otro. Con dos páginas no parecía un problema |
| Consecuencias | Con nueve páginas, cada enlace nuevo obliga a editar nueve archivos: se vio otra vez el 18/11, cuando agregar Contacto al menú tocó las nueve. Produjo menús distintos y enlaces rotos (DEF-01 y DEF-03) y llevó unas 14 horas unificarlos. El menú sigue repetido |
| Por qué se revertiría | El costo apareció tarde y fue mayor que el ahorro inicial. Un menú único se cambia una sola vez. Revertirla cuesta 6,5 horas (P5), menos de la mitad de lo que ya costó no haberlo hecho |
| Estado | Se revertiría |

### D-03 · Mesas de examen guardadas dentro del HTML

| Campo | Contenido |
|---|---|
| Decisión | Guardar cada mesa como una fila de tabla dentro de `mesasexamen.html` (hoy en `public/`), con buscador y ordenamiento en JavaScript |
| Fecha | 30/09/2026 (prototipo) y 07/10/2026 (buscador y filtros) |
| Contexto | Hacía falta mostrar las mesas por carrera y año, con búsqueda, sin base de datos (D-01) |
| Alternativas consideradas | (a) Archivo de datos JSON o CSV leído por JavaScript. (b) Planilla de Google publicada e incrustada. (c) Publicar el PDF del Instituto |
| Fundamento | Un solo archivo, sin pasos intermedios, que funciona aunque falle cualquier servicio externo. Con poco más de 90 filas por turno el tamaño es manejable |
| Consecuencias | A favor: simple y sin dependencias. Se resigna: que cargue las mesas una persona no técnica sin ayuda; por eso existe la guía rápida. Cargar un turno son unas dos horas. La alternativa (b) queda como mejora si el Instituto prefiere editar una planilla |
| Estado | Vigente |

### D-04 · Publicación en Vercel, automática desde `main`

| Campo | Contenido |
|---|---|
| Decisión | Publicar en Vercel, plan gratuito, con despliegue automático en cada cambio de la rama `main` |
| Fecha | 19/10/2026 |
| Contexto | Había que mostrar el sitio funcionando al docente y al Instituto, sin costo |
| Alternativas consideradas | (a) GitHub Pages. (b) Netlify. (c) Alojamiento pago con dominio propio |
| Fundamento | Se conecta al repositorio en minutos, publica solo, da una vista previa por rama y permite volver a un despliegue anterior. Un integrante ya lo conocía |
| Consecuencias | A favor: publicación inmediata y gratuita. Se resigna: control previo, porque todo lo que entra a `main` sale publicado (así estuvieron en línea un formulario sin terminar y fechas de mesa de prueba). El plan gratuito está pensado para uso personal no comercial y la cuenta es de un integrante |
| Estado | Vigente, con condición: confirmar el plan y traspasar la cuenta. Si el plan no admite uso institucional, se pasa a GitHub Pages. Al 25/11 el sitio responde además en el dominio `www.institutosparroquiales.com`; falta confirmar quién lo renueva |

### D-05 · Desactivar la preinscripción en línea hasta que funcione

| Campo | Contenido |
|---|---|
| Decisión | Desactivar el formulario de preinscripción (unos 40 campos y cuatro adjuntos, enviado por FormSubmit), dejarlo como comentario en el código y publicar mientras tanto los requisitos, la casilla de correo y la entrega presencial |
| Fecha | 26/10/2026 (PR #21) |
| Contexto | El formulario se había publicado el 21/10 y todavía no funcionaba de punta a punta. Además, se le pidió al equipo retirarlo. Terminado, recogería DNI, domicilio, obra social y documentos por un servicio externo |
| Alternativas consideradas | (a) Dejarlo visible y terminarlo sobre la marcha. (b) Borrarlo del código y rehacerlo cuando haga falta. (c) Reemplazarlo por un formulario de Google |
| Fundamento | Un formulario que no funciona no se publica: el aspirante cree que se inscribió y nadie recibe nada. Se dejó comentado, y no se borró, porque el equipo prevé terminarlo más adelante y así no se pierden las 16 horas invertidas |
| Consecuencias | A favor: el sitio no muestra nada roto ni recoge datos personales, y el trabajo queda listo para retomarse. Se resigna: la comodidad del aspirante por ahora. El código comentado se ve con "Ver código fuente", casilla de destino incluida (DEF-15). Para activarlo hacen falta aviso de privacidad, consentimiento y una casilla oficial (P6) |
| Estado | Vigente. Se revisa cuando el formulario funcione y la dirección autorice la preinscripción en línea |

### D-06 · Construir sin diagnóstico ni alcance escritos

| Campo | Contenido |
|---|---|
| Decisión | Empezar a construir el sitio a partir del pedido verbal del docente, sin relevamiento, sin FODA y sin documento de alcance |
| Fecha | 01/07/2026 |
| Contexto | El pedido llegó de manera informal y el equipo quería mostrar resultados pronto |
| Alternativas consideradas | (a) Entrevistar a una persona del Instituto y escribir el alcance antes de la primera página. (b) Diseñar el sitio completo y aprobarlo antes de programar |
| Fundamento | Parecía un proyecto chico y conocido: "una página para la escuela". Planificar se sentía como demora |
| Consecuencias | A favor: hubo sitio publicado en tres meses y medio. Se resigna: el alcance creció sin control (mesas, preinscripción, directivos), se publicó un formulario que todavía no funcionaba, se usaron fechas de prueba sin marcarlas, nadie validó el contenido y no hay estimación contra la cual medirse. Los TP1 a TP7 se escribieron al cierre |
| Estado | Revisada. En un próximo proyecto, el equipo escribe el alcance y consigue un referente antes de programar; el modo incremental se mantiene |

### D-07 · Página de contacto sin formulario

| Campo | Contenido |
|---|---|
| Decisión | Crear `contacto.html` con dirección, teléfono, correo, horario, redes y mapa, y con enlaces directos a WhatsApp y al correo, sin formulario. Sumar un botón flotante de WhatsApp en todas las páginas |
| Fecha | 18/11/2026 |
| Contexto | Cinco enlaces de "Contacto" esperaban esta sección (DEF-10, P1). Los formularios de consulta de las carreras muestran un aviso y no envían nada (DEF-11) |
| Alternativas consideradas | (a) Reactivar la sección oculta de `directivos.html`, que trae un formulario que no envía. (b) Un formulario conectado a un servicio externo como FormSubmit. (c) Una página propia con enlaces directos a los canales que el Instituto ya usa |
| Fundamento | El mismo criterio de D-05: no se publica lo que no funciona. Un enlace a WhatsApp o al correo siempre llega, y el sitio sigue sin recoger datos personales |
| Consecuencias | A favor: la consulta llega por un canal que alguien ya atiende y no hay nada que mantener. Se resigna: reunir las consultas en una sola casilla. Depende de que el número de WhatsApp y el correo sean los oficiales (DEF-12, P3). El menú pasó a estar copiado en nueve archivos (D-02). El 19/11 se actualizaron el teléfono y el correo, pero no en todos los pies (DEF-12) |
| Estado | Vigente |

### D-08 · Sitio en la carpeta `public/`, con las mismas direcciones

| Campo | Contenido |
|---|---|
| Decisión | Reunir lo que se publica en `public/`, con las páginas en el primer nivel y estilos, imágenes, íconos y planes en `assets/`. Las páginas conservan su nombre y su dirección |
| Fecha | 25/11/2026 |
| Contexto | Las páginas, imágenes y planes convivían con el README en la raíz. Vercel publicaba la raíz entera, incluida la carpeta `docs/` |
| Alternativas consideradas | (a) Dejar todo en la raíz. (b) Dejar las páginas en la raíz y agrupar solo estilos, imágenes y planes. (c) Una carpeta `public/` con todo el sitio |
| Fundamento | Con (c) el repositorio separa el sitio de la documentación y no hay paso de compilación. `public` es el nombre de carpeta que Vercel publica por defecto: no hay que configurar nada |
| Consecuencias | A favor: no cambia la dirección de ninguna página, se abren con doble clic en la computadora y `docs/` deja de ser pública en el sitio. Se resigna: las direcciones directas anteriores de las imágenes y de los planes en PDF dejan de funcionar (los enlaces del sitio ya apuntan a las nuevas), y pasar a GitHub Pages (D-04) exige indicarle la carpeta `public/` |
| Estado | Vigente |
