/**
 * Plan de estudios de las páginas de carrera, cargado desde la API pública.
 *
 * Uso (en interfazanalista.html, interfazpsicopedagogia.html, interfazedinicial.html):
 *   1. La grilla del plan lleva id="plan-materias" y data-id-carrera="N"
 *      (1 = Análisis de Sistemas, 2 = Psicopedagogía, 3 = Educación Inicial).
 *   2. Cada lista de materias lleva data-anio="1", "2", ... según el año.
 *   3. Al final de la página: <script src="api.js"></script> y después <script src="materias.js"></script>
 *
 * Solo se completan las listas de materias; los encabezados de cada año
 * (título y descripción) son parte del HTML. Mientras carga, cada lista
 * muestra "Cargando materias..." y, si la API falla, un mensaje de error.
 */
(function () {
    const plan = document.getElementById('plan-materias');
    if (!plan || typeof RoblesAPI === 'undefined') return;

    const idCarrera = Number(plan.dataset.idCarrera);
    if (!idCarrera) return;

    const listas = plan.querySelectorAll('ul[data-anio]');

    // "Formación Religiosa I" → "formacion religiosa i" (sin tildes ni signos), para reconocer tipos de materia.
    const normalizar = (texto) => String(texto ?? '')
        .normalize('NFD').replace(/[̀-ͯ]/g, '')
        .toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

    // Estilo de cada tipo de materia (mismos colores e íconos que tenía el diseño original).
    const ESTILOS = {
        comun:    { li: 'pt-2 flex items-center gap-2', icono: 'fa-solid fa-check text-xs text-oro-600' },
        practica: { li: 'pt-2 flex items-center gap-2 font-semibold text-oro-700 bg-oro-50/70 p-1.5 rounded', icono: 'fa-solid fa-briefcase text-xs text-oro-600' },
        religion: { li: 'pt-2 flex items-center gap-2', icono: 'fa-solid fa-cross text-xs text-bordo-800' },
        edi:      { li: 'pt-2 flex items-center gap-2', icono: 'fa-solid fa-puzzle-piece text-xs text-oro-600' }
    };
    const REGLAS = [
        { patron: /\bpractica|residencia/, estilo: 'practica' },              // Prácticas / Campo de la práctica
        { patron: /religios|teologia/, estilo: 'religion' },                  // Formación Religiosa / Teología
        { patron: /^e ?d ?i\b|espacio de definicion/, estilo: 'edi' }         // E.D.I.
    ];

    function crearItem(materia) {
        const esc = RoblesAPI.escaparHTML;
        const regla = REGLAS.find(r => r.patron.test(normalizar(materia.nombre)));
        const estilo = ESTILOS[regla ? regla.estilo : 'comun'];
        return `<li class="${estilo.li}"><i class="${estilo.icono}"></i> ${esc(materia.nombre)}</li>`;
    }

    const mensaje = (texto) => `<li class="pt-2 text-gris-500 italic">${texto}</li>`;

    async function cargarMaterias() {
        const datos = await RoblesAPI.getCarreras();

        // Number(): la documentación permite que los números lleguen como texto.
        const carrera = datos && Array.isArray(datos.carreras)
            ? datos.carreras.find(c => Number(c.idCarrera) === idCarrera)
            : null;

        if (!carrera || !Array.isArray(carrera.anios)) {
            const detalle = RoblesAPI.abiertoComoArchivo()
                ? 'Abriste la página como archivo: usá un servidor local (por ejemplo, Live Server).'
                : 'No se pudieron cargar las materias. Probá de nuevo en unos minutos.';
            listas.forEach(lista => lista.innerHTML = mensaje(detalle));
            return;
        }

        listas.forEach(lista => {
            const anio = carrera.anios.find(a => Number(a.anio) === Number(lista.dataset.anio));
            const materias = anio && Array.isArray(anio.materias) ? anio.materias : [];
            lista.innerHTML = materias.length
                ? materias.map(crearItem).join('')
                : mensaje('Todavía no hay materias cargadas para este año.');
        });
    }

    cargarMaterias();
})();
