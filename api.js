/**
 * Módulo de integración con la API pública del Instituto Robles (v1).
 * Documentación: https://instituto-robles-api.onrender.com/docs/
 *
 * Se incluye en cualquier página con <script src="api.js"></script>
 * ANTES del script propio de la página, y deja disponible el objeto RoblesAPI.
 */
const API_BASE_URL = "https://instituto-robles-api.onrender.com/api/publico/v1";

// El servidor (Render, plan gratuito) se "duerme" si nadie lo usa y el primer
// pedido puede tardar hasta un minuto. Esperamos 70 s antes de darnos por vencidos.
const API_TIMEOUT_MS = 70000;

/**
 * Realiza una petición GET genérica a la API.
 * @param {string} endpoint - Ejemplo: '/mesas', '/carreras', '/profesores'
 * @returns {Promise<any|null>} Los datos (JSON ya convertido a objeto) o null si falla
 */
async function consumirAPI(endpoint) {
    // AbortController permite cancelar el fetch si tarda demasiado.
    const controlador = new AbortController();
    const temporizador = setTimeout(() => controlador.abort(), API_TIMEOUT_MS);

    try {
        const respuesta = await fetch(`${API_BASE_URL}${endpoint}`, { signal: controlador.signal });

        if (respuesta.status === 429) {
            throw new Error("Límite de peticiones excedido (60/min). Reintentá en un minuto.");
        }
        if (!respuesta.ok) {
            throw new Error(`Error en el servidor: HTTP ${respuesta.status}`);
        }

        return await respuesta.json();
    } catch (error) {
        console.error(`[API Error] No se pudo obtener ${endpoint}:`, error);
        return null;
    } finally {
        clearTimeout(temporizador);
    }
}

/**
 * Convierte una fecha ISO (YYYY-MM-DD) a formato latino (DD/MM/YYYY).
 * Evita desfasajes de zona horaria al no usar new Date().
 * @param {string|null} fechaISO
 * @returns {string} Fecha formateada o '-' si es nula/vacía
 */
function formatearFecha(fechaISO) {
    if (!fechaISO || fechaISO.trim() === "") return "-";
    const partes = fechaISO.split("-");
    if (partes.length !== 3) return fechaISO;
    const [a, m, d] = partes;
    return `${d}/${m}/${a}`;
}

/**
 * Escapa un texto para insertarlo de forma segura dentro de HTML.
 * Los datos vienen de una base de datos: si alguien cargara "<script>..." como
 * nombre de materia, sin esto el navegador lo ejecutaría (ataque XSS).
 * @param {any} texto
 * @returns {string}
 */
function escaparHTML(texto) {
    return String(texto ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
}

// Servicios expuestos al resto de las páginas
const RoblesAPI = {
    getCarreras: () => consumirAPI('/carreras'),
    getMesas: () => consumirAPI('/mesas'),
    getProfesores: () => consumirAPI('/profesores'),
    formatearFecha,
    escaparHTML,
    // La API solo acepta pedidos desde el dominio del instituto o localhost.
    // Abriendo el .html con doble clic (file://) el navegador bloquea el pedido.
    abiertoComoArchivo: () => window.location.protocol === "file:"
};
