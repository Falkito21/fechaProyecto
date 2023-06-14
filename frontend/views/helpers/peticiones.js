
const traerUser = async(credenciales) => {
  try {
    let respuesta = await peticionFetch('traerUser', 'POST', credenciales)
    if(respuesta.ok){
      const jsonRespuesta = await respuesta.json()
      return jsonRespuesta
    }
  } catch (error) {
    throw error
  }
}
const crearCuenta = async (credenciales) => {
    try {
        let respuesta = await peticionFetch('crearCuenta', 'POST', credenciales)
    //! desde el if al catch hay codigo repetido -> modificar para usar una misma funcion en los casos que uso el mismo codigo
      if(respuesta.ok){
        const datos = await respuesta.json()
        let token = datos.token
        let payload = datos.payload.dataUser.id
        let email = datos.payload.dataUser.email
        await settearItem(token, payload, email)
      } else{
          throw new enUso(501)
      }
    } catch (error) {
        throw error
    }
  }
const iniciarSesion = async (credenciales) => {
    try {
      let respuesta = await peticionFetch('inicioSesion', 'POST', credenciales)
        if(respuesta.ok){
          const datos = await respuesta.json()
          let token = datos.token 
          let payload = datos.payload.dataUser.id
          let email = datos.payload.dataUser.email
          await settearItem(token, payload, email)
        } else{
          let res = await respuesta.json()
          let errorBack = res.Mensaje
          throw new incorrecto(errorBack)
        }
    } catch (error) {
        throw error
    }
  }
  
  const traeData = async () => {
    try {
      let token = window.sessionStorage.getItem("Authorization");
      let payload = window.sessionStorage.getItem("X-Custom-Header")
      let email = window.sessionStorage.getItem('email')
      const respuesta = await fetch("http://localhost:4100/fechas", {
        headers: {
          'Authorization': token,
          'Payload': payload,
          'email': email,
          "Content-Type" : "application/json"
        }
      });
      if (respuesta.ok) {
        const jsonRespuesta = await respuesta.json();
        await pintarDatosUser(payload)
        await agregarNombreUser(email)
        agregarFecha(jsonRespuesta.Mensaje);
      }
    } catch (error) {
      console.log(error)
      window.location.replace('/')
    }
  };

const btnGuardar = async (e) => {
    const newFecha = procesarDatos();
    try {
      let respuesta = await peticionFetch('guardarFecha', 'POST', newFecha)
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


const btnEditar = async (e) => {
    const fechaModificada = procesarDatos();
    fechaModificada.FechaID = parseInt($hiddenInput.value);
    try {
      let respuesta = await peticionFetch('modificarFecha', 'PUT', fechaModificada)
      if (respuesta.ok) {
        fechaObjetos = []
        traeData()
      }
    } catch (error) {
      throw error;
    }
  };
 
const btnEliminar = async (e) => {
    try {
      let fechaEliminar = { FechaID: parseInt(e.target.dataset.id) };
      let respuesta = await peticionFetch('eliminarFecha', 'DELETE', fechaEliminar)
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

  const btnEliminarUser = async(e) => {
    try {
      let userEliminar = {id: parseInt(e.target.dataset.id)}
      let respuesta = await peticionFetch('eliminarCuenta', 'DELETE', userEliminar)
      if(respuesta.ok){
        window.sessionStorage.removeItem('Authorization')
        window.location.replace('/')
      }
    } catch (error) {
      throw error
    }
  }