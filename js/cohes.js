// FUNCIÓN DE FLECHA PARA QUE EJECUTE EL CÓDIGO UNA VEZ HAYA CARGADO LA PÁGINA.

    document.addEventListener("DOMContentLoaded", () => {

        listarCochesAPI(); 

    });






// FUNCIÓN PARA CREAR LA URL DE LA API CON LOS FILTROS.

    function construirURL(baseURL, filtros) {

        let params = new URLSearchParams();

        for (let key in filtros) {

            if (filtros[key].length > 0) {

                // SEPARAR LOS VALORES POR COMAS.
                params.append(key, filtros[key].join(","));

            }

        }

        return `${baseURL}?${params.toString()}`;

    }






// FUNCIÓN PARA OBTENER LOS COCHES CON LOS FILTROS (SI TIENE), DE LA API Y MOSTRAR LOS COCHES EN PANTALLA.

    async function listarCochesAPI(filtros = {}) {

        try {

            const url = construirURL("https://initial-d-api.onrender.com/api/coches", filtros);
            const respuesta = await fetch(url);
            const coches = await respuesta.json();

            console.log(url);

            const listaCoches = document.getElementById("lista-coches");
            listaCoches.innerHTML = ""; 

            if (coches.length === 0) {

                listaCoches.innerHTML = "<p>No se encontraron coches con los filtros aplicados</p>";
                return;

            }

            coches.forEach(coche => {

    // CREAR UN DIV PARA CADA COCHE.
                const cocheCard = document.createElement("div");
                cocheCard.classList.add("coche-card");
                cocheCard.dataset.id = coche.id;

    // PONER LA FOTO Y LA MARCA + MODELO DE CADA COCHE.
                const img = document.createElement("img");
                img.src = coche.imagen;
                img.alt = `${coche.marca} ${coche.modelo}`;

                const titulo = document.createElement("p");
                titulo.textContent = `${coche.marca} ${coche.modelo}`;

    // AÑADIR LOS ELEMENTOS AL DIV DE CADA COCHE.
                cocheCard.appendChild(img);
                cocheCard.appendChild(titulo);

    // EVENTO DE CLICK PARA ABRIR LA INFO DEL COCHE.
                cocheCard.addEventListener("click", () => abrirModal(coche));

    // AÑADIR TODO AL DIV DEL HTML.
                listaCoches.appendChild(cocheCard);

            });

        } catch (error) {

            console.error("Error al obtener los datos:", error);

        }

    }






// MODAL PARA LOS FILTROS.

    document.addEventListener('DOMContentLoaded', function() {

        const abrirFiltroBtn = document.getElementById('abrirfiltro');
        const cerrarFiltroBtn = document.getElementById('cerrarfiltro');
        const modalFiltro = document.getElementById('modalFiltro');
        const overlay = document.getElementById('overlay');
        const resetFiltrosBtn = document.getElementById('resetFiltros');
        const aplicarFiltrosBtn = document.getElementById('aplicarFiltros');

    // FUNCIÓN PARA ABRIR EL MODAL.
        function abrirModalFiltro() {

            modalFiltro.classList.add('active');
            overlay.classList.add('active');

        }

    // FUNCIÓN PARA CERRAR EL MODAL.
        function cerrarModalFiltro() {

            modalFiltro.classList.remove('active');
            overlay.classList.remove('active');

        }

    // FUNCIÓN PARA LIMPIAR LOS FILTROS DE BUSQUEDA.
        function resetearFiltros() {

            document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
            listarCochesAPI();

        }

    // FUNCIÓN PARA APLICAR LOS FILTROS
        function aplicarFiltros() {

            const filtrosSeleccionados = {

                marca: Array.from(document.querySelectorAll('input[name="marca"]:checked')).map(cb => cb.value),
                equipo: Array.from(document.querySelectorAll('input[name="equipo"]:checked')).map(cb => cb.value),
                traccion: Array.from(document.querySelectorAll('input[name="traccion"]:checked')).map(cb => cb.value),

            };

    // APLICAR LOS FILTROS Y ACTUALIZAR LA LISTA DE COCHES.
            listarCochesAPI(filtrosSeleccionados);
            cerrarModalFiltro();

        }

    // EVENTO PARA ABRIR MODAL.
        abrirFiltroBtn.addEventListener('click', abrirModalFiltro);

    // EVENTO PARA CERRAR MODAL.
        cerrarFiltroBtn.addEventListener('click', cerrarModalFiltro);
        overlay.addEventListener('click', cerrarModalFiltro);

    // EVENTO PARA LIMPIAR FILTROS.
        resetFiltrosBtn.addEventListener('click', resetearFiltros);

    // EVENTO PARA APLICAR FILTROS.
        aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);

    });






// SELECCIONAR LOS ELEMENTOS PARA EL MODAL DE CADA COCHE.

    const modal = document.getElementById("vehicleModal");
    const overlayModal = document.getElementById("modalOverlay");
    const closeModalBtn = document.querySelector(".close-button");

// FUNCIÓN PARA ABRIR EL MODAL CON LOS DATOS.
    function abrirModal(coche) {

        document.getElementById("modalTitle").textContent = `${coche.marca} ${coche.modelo}`;
        document.getElementById("modalSubtitle").textContent = `Piloto: ${coche.piloto}`;
        document.getElementById("mainImage").src = coche.imagen;
        document.getElementById("marca").textContent = coche.marca;
        document.getElementById("modelo").textContent = coche.modelo;
        document.getElementById("piloto").textContent = coche.piloto;
        document.getElementById("traccion").textContent = coche.traccion;
        document.getElementById("description").textContent = coche.descripcion;

    // CREAR LAS ETIQUETAS PARA CADA EQUIPO DEL COCHE.
        const equipoTagsContainer = document.getElementById("equipoTags");
        equipoTagsContainer.innerHTML = "";

        coche.equipo.forEach(e => {

            const span = document.createElement("span");
            span.classList.add("team-tag");
            span.textContent = e;
            equipoTagsContainer.appendChild(span);

        });

    // CAMBIAR DISPLAY PARA MOSTRAR EL MODAL Y EL OVERLAY.
        modal.style.display = "block";
        overlayModal.style.display = "block";

    }

// FUNCIÓN PARA CERRAR EL MODAL.
    function cerrarModal() {

        modal.style.display = "none";
        overlayModal.style.display = "none";

    }

// EVENTOS PARA CERRAR EL MODAL.
    closeModalBtn.addEventListener("click", cerrarModal);
    overlayModal.addEventListener("click", cerrarModal);

    window.addEventListener("keydown", function (event) {
        if (event.key === "Escape") cerrarModal();
        
    });
