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
  // se borran las tarjetas anteriores
  limpiarResultados();
  
  // si la lista esta vacía muestra un mensaje y sale de la funcion
  if (listaPersonajes.length === 0) {
    mostrarMensaje("No se encontraron personajes.", "vacio");
    return;
  }

  // recorre cada personaje y arma su tarjeta
  listaPersonajes.forEach((personaje) => {
    // operadores ternarios:
    // si el personaje está vivo usa la clase verde, si no la roja
    const claseEstado = personaje.status === "Alive" ? "estado-alive" : "estado-deceased";
    // si esta vivo muestra "Vivo", si no "Fallecido"
    const textoEstado = personaje.status === "Alive" ? "Vivo" : "Fallecido";
    // si tiene ocupacion la usa, si no muestra "Sin información"
    const ocupacion = personaje.occupation ? personaje.occupation : "Sin información";
    // arma la URL completa de la imagen sumando el CDN y la ruta relativa
    const urlImagen = `${URL_CDN}${personaje.portrait_path}`;

    // crea el HTML de la tarjeta y se agrega al contenedor
    contenedor.innerHTML += `
      <div class="col">
        <div class="tarjeta-personaje">
          <img src="${urlImagen}" alt="${personaje.name}" class="tarjeta-imagen" />
          <div class="tarjeta-cuerpo">
            <h5 class="tarjeta-nombre">${personaje.name}</h5>
            <p class="tarjeta-ocupacion">${ocupacion}</p>
            <span class="tarjeta-estado ${claseEstado}">${textoEstado}</span>
            <button class="btn btn-ver-detalle mt-auto" data-id="${personaje.id}">Ver detalle</button>
          </div>
        </div>
      </div>`;
  });
};

// Funciones del buscador

// filtra los personajes según lo que escribió el usuario en el input
const filtrarPersonajes = () => {
  // Toma el texto del input, le saca espacios y lo pasa a minúsculas
  const textoBusqueda = inputBuscador.value.trim().toLowerCase();

  // valida que el campo no este vacío
  if (textoBusqueda === "") {
    mostrarMensaje("Ingresá un nombre para buscar.", "info");
    renderizarTarjetas(personajes);
    return;
  }

  // recorre el arreglo con forEach y guarda los personajes que coinciden
  const resultados = [];
  personajes.forEach((personaje) => {
    if (personaje.name.toLowerCase().includes(textoBusqueda)) {
      resultados.push(personaje);
    }
  });

  // borra cualquier mensaje anterior y muestra los resultados
  mensajeEstado.innerHTML = "";
  renderizarTarjetas(resultados);
};

// borra todas las tarjetas del contenedor
const limpiarResultados = () => {
  contenedor.innerHTML = "";
};

// muestra un mensaje al usuario, como un error o informacion
const mostrarMensaje = (texto, tipo) => {
  mensajeEstado.innerHTML = `<div class="mensaje-${tipo}">${texto}</div>`;
};

// Eventos

// click en el botón "Buscar"
botonBuscar.addEventListener("click", filtrarPersonajes);

// cuando presionan Enter dentro del input también dispara la búsqueda
inputBuscador.addEventListener("keydown", (e) => {
  if (e.key === "Enter") filtrarPersonajes();
});

// click en el botón "Limpiar" vacía el input y vuelve a mostrar todos los personajes
botonLimpiar.addEventListener("click", () => {
  inputBuscador.value = "";
  mensajeEstado.innerHTML = "";
  renderizarTarjetas(personajes);
});

// Inicio de la página

// función que se ejecuta apenas se carga la página
const iniciarPagina = async () => {
  mostrarMensaje("Cargando personajes...", "info");

  // trae los personajes y los guarda en la variable global
  personajes = await obtenerPersonajes();

  // si vinieron personajes correctamente limpia el mensaje y los muestra
  if (personajes.length > 0) {
    mensajeEstado.innerHTML = "";
    renderizarTarjetas(personajes);
  }
};

// arranca la página
iniciarPagina();
