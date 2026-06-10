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

// Funciones para mostrar la información

// dibuja las tarjetas de los personajes dentro del contenedor
const renderizarTarjetas = (listaPersonajes) => {
  limpiarResultados();

  if (listaPersonajes.length === 0) {
    mostrarMensaje("No se encontraron personajes.", "vacio");
    return;
  }

  listaPersonajes.forEach((personaje) => {
    const urlImagen = `${URL_CDN}${personaje.portrait_path}`;

    contenedor.innerHTML += `
      <div class="col">
        <div class="tarjeta-personaje">
          <img src="${urlImagen}" alt="${personaje.name}" class="tarjeta-imagen" />
          <div class="tarjeta-cuerpo">
            <h5 class="tarjeta-nombre">${personaje.name}</h5>
            <button class="btn btn-ver-detalle mt-auto" data-id="${personaje.id}">Ver detalle</button>
          </div>
        </div>
      </div>`;
  });
};

// borra todas las tarjetas del contenedor
const limpiarResultados = () => {
  contenedor.innerHTML = "";
};

// muestra un mensaje al usuario, como un error o informacion
const mostrarMensaje = (texto, tipo) => {
  mensajeEstado.innerHTML = `<div class="mensaje-${tipo}">${texto}</div>`;
};

// función que se ejecuta apenas se carga la página
const iniciarPagina = async () => {
  mostrarMensaje("Cargando personajes...", "info");
  personajes = await obtenerPersonajes();
  if (personajes.length > 0) {
    mensajeEstado.innerHTML = "";
    renderizarTarjetas(personajes);
  }
};

// arranca la página
iniciarPagina();
