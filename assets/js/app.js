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