const d = document;
const $formInicio = d.querySelector("#formInicio")
const $userInput = d.querySelector('#user')
const $passInput = d.querySelector('#pwd')
const $listFechas = d.querySelector("#list-date");
const $form = d.querySelector("#form");
const $dateInput = d.querySelector("#fecha");
const $descriptionInput = d.querySelector("#descripcion");
const $sendInput = d.querySelector("#enviar");
const $hiddenInput = d.querySelector("#hidden");
const template = d.querySelector("#template");
const templateMensaje = d.querySelector("#message-template");
const messageContainer = d.querySelector("#message-container");
const estadoTemplate = d.querySelector('#estado-template');
const estadoContainer = d.querySelector('#estado-respuesta');
const $btnEliminarUser = d.querySelector('#btn-eliminar-cuenta')
const fragment = d.createDocumentFragment();
let fechaObjetos = [];

const agregarFecha = (res) => {
  res.forEach((e) => {
    const fecha = {
      id: parseInt(e.FechaID),
      fecha: e.FechaDia.substring(0, 10),
      descripcion: e.FechaDescripcion,
    };
    fechaObjetos.push(fecha);
  });
  pintarFechas();
};
const pintarEstado = async (mensaje) => {
  try {
    estadoContainer.textContent = ''
    const clone = estadoTemplate.content.cloneNode(true)
    clone.querySelector('#estado-resp').textContent = mensaje
    fragment.appendChild(clone)
    setTimeout(() => {
      estadoContainer.textContent = "";
  }, 4000);
  } catch (error) {
    console.log("Error: ", error);
  }
}


const pintarFechas = () => {
    try {
        fechaObjetos.forEach((e) => {
            $listFechas.textContent = "";
            const clone = template.content.cloneNode(true);
            clone.querySelector("#date-template").textContent = e.fecha;
            clone.querySelector("#description-template").textContent = e.descripcion;
            clone.querySelector("#edit").dataset.id = e.id;
            clone.querySelector("#edit").dataset.fecha = e.fecha;
            clone.querySelector("#edit").dataset.descripcion = e.descripcion;
            clone.querySelector("#elim").dataset.id = e.id;
            fragment.appendChild(clone);
        });
        $listFechas.appendChild(fragment);
  } catch (error) {
    throw error;
  }
};

const procesarDatos = () => {
  try {
    const datos = new FormData($form);
    const datosProcesados = Object.fromEntries(datos.entries());
    $form.reset();
    return datosProcesados;
  } catch (error) {
    throw error;
  }
};

const validarData = async () => {
  try {
      elementoVacio($descriptionInput.value, "descripcion");
      elementoVacio($dateInput.value, "fecha");
      fechaActual($dateInput.value);
    caracteresMinimos($descriptionInput.value);
    caracteresMaximos($descriptionInput.value);
    numerosEnDescripcion($descriptionInput.value);
    descripcionConSignos($descriptionInput.value);
    dobleEspacios($descriptionInput.value);
  } catch (error) {
    throw error;
  }
};

const eleccion = async (e) => {
  e.preventDefault();
  try {
    await validarData();
    if ($sendInput.dataset.editar === "true") {
      await btnEditar(e);
      $sendInput.dataset.editar = "";
    } else {
      await btnGuardar(e);
    }
  } catch (error) {
    await pintarMensaje(messageContainer, templateMensaje, "#error-message", error.message);    
  }
};
 
d.addEventListener("DOMContentLoaded", traeData());
 
d.addEventListener("click", (e) => {
  if(e.target.matches('#enviar')){
    e.preventDefault()
    eleccion(e)
  }
});

d.addEventListener("click", (e) => {
  if (e.target.matches("#elim")) {
    e.preventDefault()
    btnEliminar(e);
  }
  d.addEventListener("click", (e) => {
    if(e.target.matches('#btn-eliminar-cuenta')){
      e.preventDefault()
      let acepta = window.confirm('Seguro que quiere eliminar el usuario?')
      if(acepta){
        btnEliminarUser(e)
      }
    }
  })
  if (e.target.matches("#edit")) {
    $dateInput.value = e.target.dataset.fecha;
    $descriptionInput.value = e.target.dataset.descripcion;
    $sendInput.dataset.editar = "true";
    $hiddenInput.value = e.target.dataset.id;
  }
});

const pintarDatosUser = async(data) => {
      console.log('pintarDatosUser - data: ', data)
        $btnEliminarUser.dataset.id = data 
}
