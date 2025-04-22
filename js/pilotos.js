document.addEventListener("DOMContentLoaded", () => {
    listarPilotosAPI(); 
});

function construirURL(baseURL, filtros) {
    let params = new URLSearchParams();
    for (let key in filtros) {
        if (filtros[key].length > 0) {
            params.append(key, filtros[key].join(","));
        }
    }
    return `${baseURL}?${params.toString()}`;
}

async function listarPilotosAPI(filtros = {}) {
    try {
        const url = construirURL("https://initial-d-api.onrender.com/api/pilotos", filtros);
        const respuesta = await fetch(url);
        const pilotos = await respuesta.json();

        console.log(url);

        const listaPilotos = document.getElementById("lista-coches");
        listaPilotos.innerHTML = ""; 

        if (pilotos.length === 0) {
            listaPilotos.innerHTML = "<p>No se encontraron pilotos con los filtros aplicados</p>";
            return;
        }

        pilotos.forEach(piloto => {
            const pilotoCard = document.createElement("div");
            pilotoCard.classList.add("coche-card");
            pilotoCard.dataset.id = piloto.id;

            const img = document.createElement("img");
            img.src = piloto.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen";
            img.alt = `${piloto.nombre}`;

            const titulo = document.createElement("p");
            titulo.textContent = `${piloto.nombre}`;

            pilotoCard.appendChild(img);
            pilotoCard.appendChild(titulo);

            pilotoCard.addEventListener("click", () => abrirModal(piloto));

            listaPilotos.appendChild(pilotoCard);
        });

    } catch (error) {
        console.error("Error al obtener los datos:", error);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const abrirFiltroBtn = document.getElementById('abrirfiltro');
    const cerrarFiltroBtn = document.getElementById('cerrarfiltro');
    const modalFiltro = document.getElementById('modalFiltro');
    const overlay = document.getElementById('overlay');
    const resetFiltrosBtn = document.getElementById('resetFiltros');
    const aplicarFiltrosBtn = document.getElementById('aplicarFiltros');

    function abrirModalFiltro() {
        modalFiltro.classList.add('active');
        overlay.classList.add('active');
    }

    function cerrarModalFiltro() {
        modalFiltro.classList.remove('active');
        overlay.classList.remove('active');
    }

    function resetearFiltros() {
        document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => checkbox.checked = false);
        listarPilotosAPI();
    }

    function aplicarFiltros() {
        const filtrosSeleccionados = {
            marca: Array.from(document.querySelectorAll('input[name="marca"]:checked')).map(cb => cb.value),
            equipo: Array.from(document.querySelectorAll('input[name="equipo"]:checked')).map(cb => cb.value),
        };

        listarPilotosAPI(filtrosSeleccionados);
        cerrarModalFiltro();
    }

    abrirFiltroBtn.addEventListener('click', abrirModalFiltro);
    cerrarFiltroBtn.addEventListener('click', cerrarModalFiltro);
    overlay.addEventListener('click', cerrarModalFiltro);
    resetFiltrosBtn.addEventListener('click', resetearFiltros);
    aplicarFiltrosBtn.addEventListener('click', aplicarFiltros);
});

const modal = document.getElementById("vehicleModal");
const overlayModal = document.getElementById("modalOverlay");
const closeModalBtn = document.querySelector(".close-button");

function abrirModal(piloto) {
    document.getElementById("modalTitle").textContent = piloto.nombre;
    document.getElementById("modalSubtitle").textContent = piloto.nombre_japones || "";
    document.getElementById("mainImage").src = piloto.imagen || "https://via.placeholder.com/300x200?text=Sin+imagen";
    document.getElementById("piloto").textContent = piloto.nombre;
    document.getElementById("marca").textContent = piloto.marca;
    document.getElementById("modelo").textContent = piloto.modelo;
    document.getElementById("description").textContent = piloto.descripcion;

    const equipoTagsContainer = document.getElementById("equipoTags");
    equipoTagsContainer.innerHTML = "";
    piloto.equipo.forEach(e => {
        const span = document.createElement("span");
        span.classList.add("team-tag");
        span.textContent = e;
        equipoTagsContainer.appendChild(span);
    });

    modal.style.display = "block";
    overlayModal.style.display = "block";
}

function cerrarModal() {
    modal.style.display = "none";
    overlayModal.style.display = "none";
}

closeModalBtn.addEventListener("click", cerrarModal);
overlayModal.addEventListener("click", cerrarModal);
window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") cerrarModal();
});
