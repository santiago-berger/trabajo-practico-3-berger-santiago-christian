// Constantes de la API

// guarda las URL en constantes para no repetirlas en todo el codigo
const URL_API = "https://thesimpsonsapi.com/api/characters";
const URL_CDN = "https://cdn.thesimpsonsapi.com/500";

// va a guardar todos los personajes que trae la API
// se usa let porque se le va a asignar un valor más adelante
let personajes = [];

// Referencias al DOM

// busca los elementos del HTML una sola vez al inicio y los guarda en variables para reutilizarlos
const contenedor = document.querySelector("#contenedor");
const inputBuscador = document.querySelector("#inputBuscador");
const botonBuscar = document.querySelector("#btnBuscar");
const botonLimpiar = document.querySelector("#btnLimpiar");
const mensajeEstado = document.querySelector("#mensajeEstado");

// Funciones para consultar la API

// trae todos los personajes de la primera pagina de la API
const obtenerPersonajes = async () => {
  try {
    const respuesta = await fetch(URL_API);

    // si la respuesta no es ok lanza un error
    if (!respuesta.ok) throw new Error("Error en la respuesta de la API");

    // se convierte la respuesta a JSON
    const data = await respuesta.json();

    // la API devuelve un objeto con la propiedad results que contiene el arreglo
    return data.results;
  } catch (error) {
    // si algo falla se muestra el error en la consola
    console.log(error);
    mostrarMensaje("Error al cargar los personajes.", "error");
    return [];
  }
};
