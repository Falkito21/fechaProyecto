const d = document;
const $form = d.querySelector("#form");
const $dateInput = d.querySelector("#fecha");
const $descriptionInput = d.querySelector("#descripcion");
const $sendInput = d.querySelector("#enviar");
const $hiddenInput = d.querySelector("#hidden");
const $listFechas = d.querySelector("#list-date");
const template = d.querySelector("#template");
const templateMensaje = d.querySelector("#message-template");
const fragment = d.createDocumentFragment();
const menssageTemplate = d.querySelector("#message-template");
const messageContainer = d.querySelector("#message-container");
const estadoTemplate = d.querySelector('#estado-template')
const estadoContainer = d.querySelector('#estado-respuesta')
let fechaObjetos = [];

/** #### Funcion que trae la informacion del back 
 * @param {Event}
 */ 
const traeData = async () => {
  try {
    const respuesta = await fetch("http://localhost:4100/fechas", {
      cache: "no-cache",
    });
    if (respuesta.ok) {
      const jsonRespuesta = await respuesta.json();
      agregarFecha(jsonRespuesta.Mensaje);
    }
  } catch (error) {
    throw error;
  }
};
/** #### Funcion que almacena los datos del formulario en un objeto
 * @param {Event}
 */ 
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
/** #### Funcion que pinta el mensaje de error
 * @param {Event}
 */ 
const pintarMensaje = async (error) => {
  try {
    messageContainer.textContent = "";
    const clone = templateMensaje.content.cloneNode(true);
    clone.querySelector("#error-message").textContent = error;
    fragment.appendChild(clone);
    messageContainer.appendChild(fragment);
    setTimeout(() => {
        messageContainer.textContent = "";
    }, 4000);
  } catch (error) {
    console.log("Error: ", error);
  }
};
/** #### Funcion que pinta las fechas en la pantalla del fron
 * @param {Event}
 */ 
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
/**
 * Funcion que retorna los datos que hay en el formulario
 * @param {Event} 
 */
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
/**
 * #### Funcion que es el punto de conexion para realizar todas las validaciones necesarias en los campos del front
 * @param {Event}
*/
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
/** #### Funcion que guarda los datos indicados, si es que estan correctos
 * @param {Event}
 */ 
const btnGuardar = async (e) => {
  const newFecha = procesarDatos();
  try {
    const respuesta = await fetch("http://localhost:4100/guardarFecha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFecha),
    });
    if (respuesta.ok) {
      fechaObjetos = []
      traeData()
    }else{
      let res = await respuesta.json()
      let errorBack = res.Mensaje
      throw new errorFechaRepetida(errorBack)
      }
  } catch (error) {
    throw error;
  }
};
/** #### Funcion que edita un dato determinado 
 * @param {Event}
 */ 
const btnEditar = async (e) => {
  const fechaModificada = procesarDatos();
  fechaModificada.FechaID = parseInt($hiddenInput.value);
  try {
    const respuesta = await fetch("http://localhost:4100/modificarFecha", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fechaModificada),
    });
    if (respuesta.ok) {
      //Arreglar problema de recargar fechas
      fechaObjetos = []
      traeData()
    }
  } catch (error) {
    throw error;
  }
};
/** #### Funcion que elimina un dato determinado 
 * @param {Event}
 */ 
const btnEliminar = async (e) => {
  try {
    let fechaEliminar = { FechaID: parseInt(e.target.dataset.id) };
    const respuesta = await fetch("http://localhost:4100/eliminarFecha", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fechaEliminar),
    });
    if (respuesta.ok) {
      $listFechas.innerHTML = ''
      $listFechas.textContent = ''
      
      fechaObjetos = []
      traeData()
    }
  } catch (error) {
    throw error;
  }
};
/** #### Funcion que determina en si se va a guardar o a editar un dato
 * @param {Event}
 */ 
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
    await pintarMensaje(error.message);    
  }
};
/** #### Evento de recarga para que muestra los data
 * @param {Event}
 */ 
d.addEventListener("DOMContentLoaded", traeData);
/** #### Evento click para envia datos
 * @param {Event}
 */ 
d.addEventListener("click", (e) => {
  if(e.target.matches('#enviar')){
    e.preventDefault()
    eleccion(e)
  }
});
/** #### Evento click para eliminar datos
 * @param {Event}
 */ 
d.addEventListener("click", (e) => {
  if (e.target.matches("#elim")) {
    e.preventDefault()
    btnEliminar(e);
  }
  if (e.target.matches("#edit")) {
    $dateInput.value = e.target.dataset.fecha;
    $descriptionInput.value = e.target.dataset.descripcion;
    $sendInput.dataset.editar = "true";
    $hiddenInput.value = e.target.dataset.id;
  }
});
