
const traerUser = async(credenciales) => {
  try {
    const respuesta = await fetch('http://localhost:4100/traerUser', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(credenciales)
    })
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
        const respuesta = await fetch('http://localhost:4100/crearCuenta', {
        method: 'POST'
        ,headers: {
            'Content-Type': 'application/json',
        }, 
        body: JSON.stringify(credenciales)
    })

    //! desde el if al catch hay codigo repetido -> modificar para usar una misma funcion en los casos que uso el mismo codigo
    
      if(respuesta.ok){
        const datos = await respuesta.json()
        let token = datos.token
        let payload = datos.payload.dataUser.id
        let email = datos.payload.dataUser.email
        window.sessionStorage.setItem("Authorization", token);
        window.sessionStorage.setItem("X-Custom-Header", payload)
        window.sessionStorage.setItem('email', email)
      } else{
          throw new enUso(501)
      }
    } catch (error) {
        throw error
    }
  }

  const iniciarSesion = async (credenciales) => {
    try {
        const respuesta = await fetch('http://localhost:4100/inicioSesion',{
            method:'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales)
        })
        if(respuesta.ok){
          const datos = await respuesta.json()
          let token = datos.token 
          let payload = datos.payload.dataUser.id
          let email = datos.payload.dataUser.email
          window.sessionStorage.setItem("Authorization", token);
          window.sessionStorage.setItem("X-Custom-Header", payload)
          window.sessionStorage.setItem('email', email)
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
        console.log('traerData - peticiones - respuesta: ', respuesta)
        const jsonRespuesta = await respuesta.json();
        console.log('traeData - peticiones - payload: ', payload)
        await pintarDatosUser(payload)
        agregarFecha(jsonRespuesta.Mensaje);
      }
    } catch (error) {
      throw error;
    }
  };

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

  const btnEliminarUser = async(e) => {
    try {
      let userEliminar = {id: parseInt(e.target.dataset.id)}
      console.log('peticiones - btnEliminarUser: ', userEliminar)
      const respuesta = await fetch("http://localhost:4100/eliminarCuenta",{
        method: 'DELETE'
        ,headers:{
          "Content-Type": "application/json"
        }, 
        body: JSON.stringify(userEliminar)
      })
      if(respuesta.ok){
        window.location.replace('/')
      }
    } catch (error) {
      throw error
    }
  }