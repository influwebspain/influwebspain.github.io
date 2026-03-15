// 1. Selección de elementos (El Gancho)
const formulario = document.getElementById('flex-form');
const rangeInput = document.getElementById('number');
const rangeValue = document.getElementById('number-value');
const solucion = document.getElementById('solucion');
const fraseInput = document.getElementById('frase');

const alfabeto = "abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ0123456789áéíóúÁÉÍÓÚ@#$%^&*()_+|~`-={}[]:;'<>?,./ ";

// 2. Eventos (La Magia de la Interacción)

// Actualiza el número del paso en el span (Mini-reto 3.5) 
rangeInput.addEventListener('input', () => {
    rangeValue.textContent = rangeInput.value;
});

// Atendemos al envío del formulario 
formulario.addEventListener('submit', (e) => {
    // Evitamos que la página parpadee o se borre (OBLIGATORIO) 
    e.preventDefault();

    // Obtenemos los datos con .value 
    const textoOriginal = fraseInput.value;
    const paso = Number(rangeInput.value);

    // Ciframos y mostramos en el div usando innerHTML 
    solucion.innerHTML = cifrar(textoOriginal, paso);
});

/*
    Cifra una cadena usando un alfabeto y un paso de desplazamiento
*/
function cifrar(cadena, paso) {
    let resultado = "";
    
    for (let caracter of cadena) {
        const indiceActual = alfabeto.indexOf(caracter);

        if (indiceActual === -1) {
            resultado += caracter; // Si no está en el alfabeto, se queda igual
        } else {
            // Calculamos la nueva posición dentro del alfabeto
            let nuevoIndice = (indiceActual + paso) % alfabeto.length;
            resultado += alfabeto[nuevoIndice];
        }
    }
    return resultado;
}
