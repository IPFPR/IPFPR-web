/**
 * Equipo Docente de las páginas de carrera, cargado desde la API pública.
 *
 * Uso (en interfazanalista.html, interfazpsicopedagogia.html, interfazedinicial.html):
 *   1. La grilla de docentes lleva id="grilla-docentes" y data-id-carrera="N"
 *      (1 = Análisis de Sistemas, 2 = Psicopedagogía, 3 = Educación Inicial).
 *   2. Al final de la página: <script src="api.js"></script> y después <script src="docentes.js"></script>
 *
 * Mientras carga, la grilla muestra "Cargando docentes..." y, si la API falla,
 * un mensaje de error.
 */
(function () {
    const grilla = document.getElementById('grilla-docentes');
    if (!grilla || typeof RoblesAPI === 'undefined') return;

    const idCarrera = Number(grilla.dataset.idCarrera);
    if (!idCarrera) return;

    // Descarta partes que son solo puntuación (en la base hay cargas como "., Flores").
    const limpiar = (texto) => String(texto ?? '').trim().replace(/^[\s.,\-]+$/, '');

    const nombreVisible = (profesor) =>
        [limpiar(profesor.apellido), limpiar(profesor.nombre)].filter(Boolean).join(' ');

    const dictaEnEstaCarrera = (m) => Number(m.idCarrera) === idCarrera;

    function crearTarjeta(profesor) {
        const esc = RoblesAPI.escaparHTML;
        const partes = [limpiar(profesor.apellido), limpiar(profesor.nombre)].filter(Boolean);
        const iniciales = partes.map(parte => parte.charAt(0).toUpperCase()).join('');

        // Materias que dicta en ESTA carrera, visibles al pasar el mouse.
        // (Set: sin repetir, p. ej. "Teologia" se dicta en varios años.)
        const materias = [...new Set(profesor.materias.filter(dictaEnEstaCarrera).map(m => m.nombre))].join(' · ');

        return `
                <div class="bg-white p-4 rounded-xl border border-gris-200 text-center shadow-sm hover:border-oro-400 transition-colors" title="${esc(materias)}">
                    <div class="w-10 h-10 rounded-full bg-bordo-100 text-bordo-800 font-bold mx-auto mb-2 flex items-center justify-center text-sm">${esc(iniciales)}</div>
                    <div class="font-bold text-gris-800 text-sm">${esc(nombreVisible(profesor))}</div>
                    <div class="text-xs text-oro-600">Docente</div>
                </div>`;
    }

    const mensaje = (texto) => `<div class="col-span-full text-center text-gris-500 text-sm italic py-6">${texto}</div>`;

    async function cargarDocentes() {
        const datos = await RoblesAPI.getProfesores();
        if (!datos || !Array.isArray(datos.profesores)) {
            grilla.innerHTML = mensaje(RoblesAPI.abiertoComoArchivo()
                ? 'Abriste la página como archivo: usá un servidor local (por ejemplo, Live Server).'
                : 'No se pudieron cargar los docentes. Probá de nuevo en unos minutos.');
            return;
        }

        const docentes = datos.profesores
            .filter(p => Array.isArray(p.materias) && p.materias.some(dictaEnEstaCarrera))
            // Orden alfabético por el nombre que se muestra (ya sin los "." de relleno).
            .sort((a, b) => nombreVisible(a).localeCompare(nombreVisible(b), 'es', { sensitivity: 'base' }));

        grilla.innerHTML = docentes.length
            ? docentes.map(crearTarjeta).join('')
            : mensaje('Todavía no hay docentes cargados para esta carrera.');
    }

    cargarDocentes();
})();
