// let d = document
// let dia = d.querySelector('#fecha').value
// let descripcion = d.querySelector('#descripcion').value

const d = document;
const $inp_fecha = d.querySelector("#fecha");
const $inp_descripcion = d.querySelector("#descripcion");
const $btn = d.querySelector("#enviar");
const $div = d.querySelector("#cuerpo_tabla");
const $formulario = d.querySelector("#form");

//GET

const recibeInfo = async () => {
  try {
    const respuesta = await fetch("http://localhost:4100/fechas", {
      cache: "no-cache",
    });
    if (respuesta.ok) {
      const jsonRespuesta = await respuesta.json();
      muestraResultados(jsonRespuesta.data);
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};




const muestraResultados = (res) => {
  let fechas = "";
  res.forEach((e) => {
    let dia = e.FechaDia.substring(0, 10);
    fechas += `
        <tr>
        <th><li id='dia'>${dia}</li></th>
        <th><li id='descripcion_dinamico'>${e.FechaDescripcion}</li></th>
        <th><button class='button-edit' id="editar" data-id = '${e.FechaID}' >Editar</button>
        <th><button class='button-delete' id="eliminar" data-id = '${e.FechaID}' >Eliminar</button></th>
        </tr>
        `;
  });
  $div.innerHTML = fechas;

  const btn_eliminar = d.querySelectorAll(".button-delete");
  if (btn_eliminar) {
    const countData = btn_eliminar.length;
    console.log(btn_eliminar);
    for (let i = 0; i < countData; i++) {
      btn_eliminar[i].addEventListener("click", (event) => {
        event.preventDefault();
        let id_btn = btn_eliminar[i].dataset.id;
        deleteData(id_btn);
      });
    }
  }
  const btn_editar = d.querySelectorAll(".button-edit");
  if (btn_editar) {
    const countData = btn_editar.length;
    for (let i = 0; i < countData; i++) {
      btn_editar[i].addEventListener("click", (event) => {
        event.preventDefault();
        //   let id_btn = btn_editar[i].dataset.id
        const fecha = d.querySelectorAll("#dia")[i].textContent;
        let fechaModificada = fecha
        const descripcion = d.querySelectorAll(
          "#descripcion_dinamico"
        )[i].textContent;
        const fechaInp = d.querySelector("#fecha");
        const DescripcionInp = d.querySelector("#descripcion");
        fechaInp.value = fechaModificada;
        DescripcionInp.value = descripcion;
        const input_hidden_id = d.querySelector("#input_hidden")
        const idBtn = btn_editar[i]
        let dataId = idBtn.dataset.id
        input_hidden_id.value = dataId
    });
    }
    return;
  }

  btn_editar.addEventListener("click", (event) => {
    event.preventDefault();

    console.log(obj);
  });
};

//POST
const procesarDatos = () => {
  const datos = new FormData($formulario);
  const datosProcesados = Object.fromEntries(datos.entries());
  $formulario.reset();
  return datosProcesados;
};

$formulario.addEventListener("submit", procesarDatos);

const postData = async () => {
  const newFecha = procesarDatos();
  console.log(newFecha);
  console.log("fechaNew: ", newFecha);
  try {
    const respuesta = await fetch("http://localhost:4100/guardarFecha", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFecha),
    });
    if (Response.ok) {
      const jsonRespuesta = await respuesta.json();
    }
  } catch (error) {
    console.log("Error: ", error);
  }
};

$btn.addEventListener("click", async (event) => {
  event.preventDefault();

  const input_hidden_id = d.querySelector("#input_hidden")
  if(input_hidden_id.value){
    let obj = procesarDatos()
    console.log(obj)
      await modificarData(obj, input_hidden_id);
      input_hidden_id.value = ""
  }
  else{
      await postData();
  }

     await recibeInfo();

});

d.addEventListener("DOMContentLoaded", recibeInfo);

const deleteData = async (btn) => {
  fechaEliminar = { FechaID: btn };
  try {
    const respuesta = await fetch("http://localhost:4100/eliminarFecha", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fechaEliminar),
    });
    if (respuesta.ok) {
      const jsonRespuesta = await respuesta.json();
      console.log("Se elimino: ", jsonRespuesta);
    }
    recibeInfo();
  } catch (error) {
    console.log("Error: ", error``);
  }
};

const modificarData = async (data) => {

  try {
    const respuesta = await fetch("http://localhost:4100/modificarFecha", {
      method: 'PUT'
      ,headers:{
        "Content-Type": "application/json",
      }, 
      body: JSON.stringify(data)
    });
    if(respuesta.ok){
      const respuestaJson = await respuesta.json()
      console.log('Se modifico: ', respuestaJson)

      recibeInfo();
    }
  } catch (error) {
    console.log('Error: ', error)
  }
};
