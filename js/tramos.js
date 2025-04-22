// FUNCIÓN DE FLECHA PARA QUE EJECUTE EL CÓDIGO UNA VEZ HAYA CARGADO LA PÁGINA.

document.addEventListener("DOMContentLoaded", () => {

    listarTramosAPI(); 
    
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


// FUNCIÓN PARA OBTENER LOS TRAMOS CON EL FILTRO (SI TIENE), DE LA API Y MOSTRAR LOS TRAMOS EN PANTALLA.

async function listarTramosAPI(filtros = {}) {

    try {

        const url = construirURL("https://initial-d-api.onrender.com/api/tramos", filtros);
        const respuesta = await fetch(url);
        const tramos = await respuesta.json();

        console.log(url);
        console.log(tramos);
        const listaTramos = document.getElementById("lista-tramos");
        listaTramos.innerHTML = ""; 

        if (tramos.length === 0) {

            listaTramos.innerHTML = "<p>No se encontraron tramos con los filtros aplicados</p>";
            return;

        }

        tramos.forEach(tramo => {

// CREAR UN DIV PARA CADA TRAMO.
            const tramoCard = document.createElement("div");
            tramoCard.classList.add("tramo-card");
            tramoCard.dataset.id = tramo.id;

// PONER LA FOTO Y EL NOMBRE + NOMBRE EN JAPONES DE CADA TRAMO.
            const img = document.createElement("img");
            img.src = tramo.imagen;
            img.alt = `${tramo.nombre}`;

            const titulo = document.createElement("p");
            titulo.textContent = `${tramo.nombre}`;

            const subtitulo = document.createElement("span");
            subtitulo.textContent = `${tramo.nombre_japones}`;

// AÑADIR LOS ELEMENTOS AL DIV DE CADA TRAMO.
            tramoCard.appendChild(img);
            tramoCard.appendChild(titulo);
            tramoCard.appendChild(subtitulo);

// EVENTO DE CLICK PARA ABRIR LA INFO DEL TRAMO.
            tramoCard.addEventListener("click", () => abrirModal(tramo));

// AÑADIR TODO AL DIV DEL HTML.
            listaTramos.appendChild(tramoCard);

        });

    } catch (error) {

        console.error("Error al obtener los datos:", error);

    }

}

// SELECCIONAR LOS ELEMENTOS PARA EL MODAL DE CADA COCHE.

const modal = document.getElementById("tramoModal");
const overlayModal = document.getElementById("modalOverlay");
const closeModalBtn = document.querySelector(".close-button");

// FUNCIÓN PARA ABRIR EL MODAL CON LOS DATOS.
function abrirModal(tramo) {

    document.getElementById("modalTitle").textContent = `${tramo.nombre}`;
    document.getElementById("modalSubtitle").textContent = `${tramo.nombre_japones}`;
    document.getElementById("mainImage").src = tramo.imagen;
    document.getElementById("nombre").textContent = tramo.nombre;
    document.getElementById("nombre_japones").textContent = tramo.nombre_japones;
    document.getElementById("longitud").textContent = tramo.longitud;
    document.getElementById("puntos_clave").textContent = tramo.puntos_clave;
    document.getElementById("description").textContent = tramo.descripcion;

// CREAR LAS ETIQUETAS PARA CADA EQUIPO DEL COCHE.
    const prefecturaTagsContainer = document.getElementById("prefecturaTags");
    prefecturaTagsContainer.innerHTML = "";

    tramo.prefectura.forEach(e => {

        const span = document.createElement("span");
        span.classList.add("prefectura-tag");
        span.textContent = e;
        prefecturaTagsContainer.appendChild(span);

    });

    // const youtubeVideos = {
    //     "Monte Akagi": "K7hyxjigAOw?si=1ltNSfFVXo9nvpwR",
    //     "Monte Akina": "AlqZavsZwX4?si=Lxn5agBuVA8QShvw",
    //     "Enna Skyline": "LP9NGxvxdV0?si=5ebFB1bHMZQU1MSg",
    //     "Autopista de Hakone": "bsS7PFRBDXw?si=L_alPOn1hw_SxHsH",
    //     "Happogahara": "ja3Urrzk6e8?si=xXp5rpLPy4ALideT",
    //     "Irohazaka (descenso)":"fp7f4pWNLh8?si=7Crtv-_fx6h54KWH",
    //     "Paso de Maze":"EhA6zJHkwoA?si=KPqEditPWaZyQY43",
    //     "Momiji Line":"dUdBW1Bsf1M?si=oR-gotGiYfspMy8M",
    //     "Monte Myogi":"rdF0eOl0iUM?si=JR3qjT_LyiU1aDQk",
    //     "Paso de Nagao":"k_1Fd2czL2w?si=Q8QPWKSyByBRk1xi",
    //     "Nanamagari":"WFte0WkDPYA?si=FNhG-xxS8kgILKp1",
    //     "Paso de Sadamine":"-psUXR2bL0Y?si=wFZhkpmrLZLneuqf",
    //     "Paso de Shomaru":"Ji75qDFO-AE?si=pnt7AEZnSAhDuVVv",
    //     "Tsubaki Line":"yFHjH64ijeI?si=Tudp1FF9MEOqEIUR",
    //     "Paso de Tsuchisaka":"IvFixu3qDhI?si=YozIXuBFAIQh075z",
    //     "Tsukuba":"tLYhhSWNsog?si=Y8mOo0x6YlOYW76t",
    //     "Paso de Usui":"_0Xp3VydB9E?si=ZlbatYfZAvJuWkPx",
    //     "Paso de Yabitsu":"ceM6nhOXpUU?si=jPKAwTaMDAEmgG3I"    
    // };
    
    // const youtubeContainer = document.getElementById("youtubeContainer");
    // youtubeContainer.innerHTML = "";

    // const youtubeId = youtubeVideos[tramo.nombre];

    // if (youtubeId) {
    //     const iframe = document.createElement("iframe");
    //     iframe.src = `https://www.youtube.com/embed/${youtubeId}`;
    //     iframe.width = "100%";
    //     iframe.height = "315";
    //     iframe.allowFullscreen = true;
    //     iframe.setAttribute("frameborder", "0");
    //     iframe.setAttribute("allow", "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");

    //     youtubeContainer.appendChild(iframe);
    // }

    const videoSources = {
        "Monte Akagi": "../static/mp4/akagi.mp4",
        "Monte Akina": "../static/mp4/akina.mp4",
        "Enna Skyline": "../static/mp4/enna.mp4",
        "Autopista de Hakone": "../static/mp4/hakone.mp4",
        "Happogahara": "../static/mp4/happogahara.mp4",
        "Irohazaka (descenso)": "../static/mp4/irohazaka.mp4",
        "Paso de Maze": "../static/mp4/maze.mp4",
        "Momiji Line": "../static/mp4/momiji.mp4",
        "Monte Myogi": "../static/mp4/myogi.mp4",
        "Paso de Nagao": "../static/mp4/nagao.mp4",
        "Nanamagari": "../static/mp4/nanamagari.mp4",
        "Paso de Sadamine": "../static/mp4/sadamine.mp4",
        "Paso de Shomaru": "../static/mp4/shomaru.mp4",
        "Tsubaki Line": "../static/mp4/tsubaki.mp4",
        "Paso de Tsuchisaka": "../static/mp4/tsuchisaka.mp4",
        "Tsukuba": "../static/mp4/tsukuba.mp4",
        "Paso de Usui": "../static/mp4/usui.mp4",
        "Paso de Yabitsu": "../static/mp4/yabitsu.mp4"
    };
    
    const youtubeContainer = document.getElementById("youtubeContainer");
    youtubeContainer.innerHTML = "";
    
    const videoSrc = videoSources[tramo.nombre];
    
    if (videoSrc) {
        const video = document.createElement("video");
        video.src = videoSrc;
        video.style.width = "100%";
        video.height = 300;
        video.controls = true;
        video.setAttribute("preload", "metadata", "controls", "autoplay", "loop");
    
        youtubeContainer.appendChild(video);
    }

// CAMBIAR DISPLAY PARA MOSTRAR EL MODAL Y EL OVERLAY.
    modal.style.display = "block";
    //overlayModal.style.display = "block";

}

// FUNCIÓN PARA CERRAR EL MODAL.
function cerrarModal() {
    console.log("Cerrando modal y borrando video");

    modal.style.display = "none";
    //overlayModal.style.display = "none";
    const youtubeContainer = document.getElementById("youtubeContainer");
    if (youtubeContainer) {
        while (youtubeContainer.firstChild) {
            youtubeContainer.removeChild(youtubeContainer.firstChild);
        }
    }
}

// EVENTOS PARA CERRAR EL MODAL.
closeModalBtn.addEventListener("click", cerrarModal);
//overlayModal.addEventListener("click", cerrarModal);

window.addEventListener("keydown", function (event) {
    if (event.key === "Escape") cerrarModal();
    
});






// SELECCIONAR FILTRO SEGÚN EL CLICK EN LA ZONA DEL MAPA.

function filtrarTramos(prefectura) {
    const prefecturaFormateada = prefectura.charAt(0).toUpperCase() + prefectura.slice(1).toLowerCase();

    const filtrosSeleccionados = { prefectura: [prefecturaFormateada]};

    console.log("Filtros enviados:", filtrosSeleccionados);

    

    listarTramosAPI(filtrosSeleccionados);
}


// RESALTAR LA PREFECTURA SELECCIONADA DE AMARILLO.

const mapa = document.getElementById("mapa");

function resaltargunma() {
    mapa.innerHTML =  '<img src="../static/img/mapagunma.png" alt="Resaltado de Gunma" usemap="#mapainitiald">';
}
function resaltartochigi() {
    mapa.innerHTML =  '<img src="../static/img/mapatochigi.png" alt="Resaltado de Tochigi" usemap="#mapainitiald">';
}
function resaltarchiba() {
    mapa.innerHTML =  '<img src="../static/img/mapachiba.png" alt="Resaltado de Chiba" usemap="#mapainitiald">';
}
function resaltaribaraki() {
    mapa.innerHTML =  '<img src="../static/img/mapaibaraki.png" alt="Resaltado de Ibaraki" usemap="#mapainitiald">';
}
function resaltarkanagawa() {
    mapa.innerHTML =  '<img src="../static/img/mapakanagawa.png" alt="Resaltado de Kanagawa" usemap="#mapainitiald">';
}
function resaltarsaitama() {
    mapa.innerHTML =  '<img src="../static/img/mapasaitama.png" alt="Resaltado de Saitama" usemap="#mapainitiald">';
}
function resaltartokyo() {
    mapa.innerHTML =  '<img src="../static/img/mapatokyo.png" alt="Resaltado de Tokyo" usemap="#mapainitiald">';
}

function resetearmapa() {
    mapa.innerHTML =  '<img src="../static/img/mapa.png" alt="Mapa de Initial D" usemap="#mapainitiald">';
}


// RESETEAR FILTRO + MAPA Y PONERLO DEFAULT

const resetButton = document.getElementById("resetButton");
resetButton.addEventListener("click", resetearFiltros);
function resetearFiltros() {
    listarTramosAPI();
    resetearmapa();
}



