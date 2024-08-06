document.addEventListener("DOMContentLoaded", function() {
    const botonMenu = document.getElementById("boton-menu");
    const menu = document.getElementById("menu");
    const links = document.querySelectorAll('.nav-link');

    // Mostrar las secciones activas al cargar
    document.querySelectorAll('.section').forEach(section => {
        if (section.classList.contains('active')) {
            section.style.display = 'block'; // Mostrar las secciones activas
        } else {
            section.style.display = 'none'; // Ocultar otras secciones
        }
    });

    botonMenu.addEventListener("click", function() {
        menu.classList.toggle("mostrar");
        botonMenu.innerHTML = menu.classList.contains("mostrar") 
            ? '<i class="fa-solid fa-xmark"></i>' 
            : '<i class="fa-solid fa-bars"></i>';
    });

    // Manejar clics en los enlaces del menú
    links.forEach(link => {
        link.addEventListener("click", function(event) {
            event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace

            // Ocultar todas las secciones
            document.querySelectorAll('.section').forEach(section => {
                section.style.display = 'none'; // Ocultar todas las secciones
            });

            // Mostrar la sección correspondiente
            const sectionId = link.getAttribute('data-section');
            const activeSection = document.getElementById(sectionId);
            if (activeSection) {
                activeSection.style.display = 'block'; // Mostrar la sección activa
            }

            // Cerrar el menú
            menu.classList.remove("mostrar");
            botonMenu.innerHTML = '<i class="fa-solid fa-bars"></i>';
        });
    });
});


function openModal(imageSrc) {
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    modal.style.display = "block";
    modalImg.src = imageSrc;
}

function closeModal() {
    const modal = document.getElementById("modal");
    modal.style.display = "none";
}


//PRECIOS
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vREjByDlXuqhLREj4ZAHeKDSHw-p3xqPert8wABwDmi_9AoiEGmyOSbOZwIufraBCH1w0t0xqls0f7y/pubhtml?gid=0&single=true';

$(document).ready(function() {
    $.get(SHEET_URL)
        .done(function(data) {
            // Utilizar jQuery para analizar el HTML y extraer los datos
            const $table = $(data).find('table');
            const rows = $table.find('tr');

            rows.each((index, row) => {
                const cols = $(row).find('td');

                // Omitir la primera fila si tiene encabezados
                if (index === 0) {
                    // Agregar encabezados manualmente
                    $('#precios').append(`
                        <div class="grid-item"><strong>Código</strong></div>
                        <div class="grid-item"><strong>Nombre/Descripción</strong></div>
                        <div class="grid-item"><strong>Precio</strong></div>
                    `);
                    return; // Salir de la iteración
                }

                // Verifica si la fila tiene el número esperado de columnas
                if (cols.length < 3) return;

                const codigo = $(cols[0]).text();
                const nombre = $(cols[1]).text();
                const precio = $(cols[2]).text();

                // Formatear el precio para evitar problemas de visualización
                const precioFormateado = precio.trim() ? precio.trim().replace('.', ',') : `<span class="consultar"><a href="https://wa.me/5493454490381" target="_blank">Consultar</a></span>`;
                $('#precios').append(`
                    <div class="grid-item">${codigo}</div>
                    <div class="grid-item">${nombre}</div>
                    <div class="grid-item">${precioFormateado}</div>
                `);
            });
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
            console.error("Error al cargar los datos:", textStatus, errorThrown);
            $('#precios').append('<div class="grid-item">Error al cargar los datos. Por favor contactanos.</div>');
        });
});