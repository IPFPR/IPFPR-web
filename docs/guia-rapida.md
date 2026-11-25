# Guía rápida: actualizar las mesas de examen

**Para:** la persona del Instituto que actualiza el sitio · **Tiempo:** 5 a 10 minutos por cambio; unas 2 horas para un turno completo  
**Necesita:** una cuenta de GitHub con acceso a <https://github.com/IPFPR/IPFPR-web>. No hay que instalar nada.

Las mesas están en un solo archivo: **`public/mesasexamen.html`**. Cada mesa es una línea como esta:

```html
<tr><td class="... col-materia text-left">Bases de Datos</td><td class="p-4 col-fecha text-center">01/12/2026</td><td class="p-4 text-center">2°</td><td class="p-4 col-profesor text-center">Lazzaro Pablo</td></tr>
```

Solo se cambia el texto que está **entre `>` y `<`**: materia, fecha, curso y docente. Lo demás no se toca. Si una materia se rinde en varios años, va una línea por año (Formación Religiosa I, II y III son tres líneas).

## Tarea 1 · Cambiar la fecha o el docente de una mesa

1. En GitHub abra la carpeta `public`, después `mesasexamen.html`, y pulse el lápiz (**Edit this file**).
2. Pulse `Ctrl + F` y escriba el nombre de la materia. Si aparece más de una vez, mire el año y la carrera del título que está arriba.
3. Cambie la fecha, siempre con el formato `01/12/2026` (día/mes/año con barras). Con otro formato, el orden por fecha deja de funcionar.
4. Siga en "Guardar el cambio".

## Tarea 2 · Agregar o quitar una mesa

1. Busque una mesa del mismo año y de la misma carrera.
2. **Agregar:** copie la línea entera, de `<tr` a `</tr>`, péguela debajo y cambie los cuatro datos.
3. **Quitar:** borre la línea entera, de `<tr` a `</tr>`.
4. Siga en "Guardar el cambio".

## Tarea 3 · Cargar un turno nuevo

1. Cambie el nombre del turno: busque `Turno Diciembre 2026` y reemplácelo las 12 veces que aparece (una en el encabezado y una por cada año de cada carrera).
2. Recorra las tres carreras, año por año, y actualice cada mesa con las tareas 1 y 2.
3. Haga todo en un solo cambio. No borre las fechas viejas antes de tener las nuevas: la página quedaría vacía.

## Guardar el cambio

1. Pulse **Commit changes**.
2. Escriba qué cambió. Ejemplo: `Cambio la fecha de Bases de Datos al 03/12`.
3. Elija **Create a new branch** y pulse **Propose changes** y después **Create pull request**.
4. Avise a quien revisa. Hoy es Valentino Plescia; después del traspaso, la persona que designe el Instituto. Esa persona lo aprueba con **Merge pull request**.
5. Espere dos minutos, abra <https://www.institutosparroquiales.com/mesasexamen.html> y compruebe que el dato nuevo aparece.

> **Si algo sale mal.** Si la página se ve rota, casi siempre falta un `<` o un `>`. No intente arreglarlo a ciegas: avise a quien revisa. Se vuelve a la versión anterior en un minuto y no se pierde nada.
