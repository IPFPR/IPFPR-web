const API_URL = 'http://localhost:3001';

document.addEventListener('DOMContentLoaded', () => {
    const formConsulta = document.getElementById('form-consulta');

    if (formConsulta) {
        formConsulta.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Capturamos los valores ingresados en los inputs
            const nuevaConsulta = {
                nombre: document.getElementById('nombre').value.trim(),
                telefono: document.getElementById('telefono').value.trim(),
                email: document.getElementById('email').value.trim(),
                mensaje: document.getElementById('mensaje').value.trim(),
                fecha: new Date().toLocaleString('es-AR')
            };

            try {
                // Petición POST a JSON Server (genera el ID automático por defecto)
                const respuesta = await fetch(`${API_URL}/consultas`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(nuevaConsulta)
                });

                if (respuesta.ok) {
                    const resultado = await respuesta.json();
                    alert('¡Consulta enviada con éxito!');
                    console.log('Consulta registrada en la API:', resultado);
                    formConsulta.reset(); // Limpia los campos del formulario
                } else {
                    alert('Hubo un problema al enviar la consulta a la API.');
                }
            } catch (error) {
                console.error('Error de conexión con la API:', error);
                alert('No se pudo conectar con la API. Asegurate de tener corriendo json-server.');
            }
        });
    }
});