// Captura de elementos del DOM
const inputNombre = document.getElementById("nombre");
const btnAnyadir = document.getElementById("botonAnyadir");
const panelAmigos = document.getElementById("panel");
const panelSolucion = document.getElementById("solucion");
const btnResuelve = document.getElementById("botonResuelve");

// Estructuras de datos para gestionar los participantes
let listaParticipantes = new Set(); // El Set garantiza que no haya nombres repetidos
let mapaSorteo = new Map(); // El Map almacena quién regala a quién

// Función para mostrar la lista de amigos actualizada
const actualizarLista = () => {
    panelAmigos.innerHTML = "";
    
    // Convertimos el Set a Array para poder ordenarlo alfabéticamente
    const nombresOrdenados = [...listaParticipantes].toSorted();

    nombresOrdenados.forEach(nombre => {
        // Generamos el HTML de cada fila con el botón de borrar
        panelAmigos.innerHTML += `
            <div class="item-amigo">
                <span>${nombre}</span>
                <button class="btn-eliminar" data-nombre="${nombre}">Borrar</button>
            </div>
        `;
    });
};

// Función para generar y mostrar la tabla de resultados
const mostrarTablaResultados = () => {
    panelSolucion.innerHTML = `
        <table>
            <thead>
                <tr><th>Regalador</th><th>Regala a</th></tr>
            </thead>
            <tbody id="cuerpo-tabla"></tbody>
        </table>
    `;
    const cuerpo = document.getElementById("cuerpo-tabla");
    
    // Recorremos el Map para rellenar las filas de la tabla
    mapaSorteo.forEach((receptor, regalador) => {
        cuerpo.innerHTML += `<tr><td>${regalador}</td><td>${receptor}</td></tr>`;
    });
};

// Algoritmo para realizar el sorteo aleatorio
const realizarReparto = () => {
    const nombres = [...listaParticipantes];
    if (nombres.length < 2) return true;

    let candidatos = [...nombres];
    mapaSorteo.clear(); // Vaciamos sorteos anteriores

    for (const emisor of nombres) {
        // Filtramos para evitar que alguien se regale a sí mismo
        const opcionesValidas = candidatos.filter(persona => persona !== emisor);

        // Si no quedan opciones válidas, el sorteo se ha bloqueado y debe repetirse
        if (opcionesValidas.length === 0) return false;

        const azar = Math.floor(Math.random() * opcionesValidas.length);
        const elegido = opcionesValidas[azar];

        mapaSorteo.set(emisor, elegido);
        
        // Eliminamos a la persona elegida de los posibles receptores restantes
        candidatos = candidatos.filter(persona => persona !== elegido);
    }
    return true;
};

// --- Gestión de Eventos ---

// Evento para añadir un nuevo amigo
btnAnyadir.addEventListener("click", (e) => {
    e.preventDefault();
    const valor = inputNombre.value.trim();
    if (valor) {
        listaParticipantes.add(valor); // Añadimos al conjunto de datos
        inputNombre.value = "";
        actualizarLista();
    }
});

// Evento para borrar un amigo (usando delegación de eventos)
panelAmigos.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
        const nombreParaBorrar = e.target.dataset.nombre;
        listaParticipantes.delete(nombreParaBorrar);
        actualizarLista();
    }
});

// Evento para ejecutar el sorteo
btnResuelve.addEventListener("click", () => {
    if (listaParticipantes.size < 2) {
        alert("Necesitas al menos 2 personas para el sorteo");
        return;
    }

    // Ejecutamos el reparto; si falla, lo reintentamos automáticamente
    let resultadoValido = realizarReparto();
    while (!resultadoValido) {
        resultadoValido = realizarReparto();
    }
    
    mostrarTablaResultados();
});


































































