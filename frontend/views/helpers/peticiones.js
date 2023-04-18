const iniciarSesion = async (credenciales) => {
    try {
        const respuesta = await fetch('http://localhost:4100/inicioSesion',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales)
        })
        if(respuesta.ok){
          const datos = await respuesta.json()
          let token = datos.token 
           //buscar session local storage 
          window.sessionStorage.setItem("Authorization", token);  
        } else{
          let res = await respuesta.json()
          let errorBack = res.Mensaje
          throw new incorrecto(errorBack)
        }
        //Buscar ruta absoluta y ruta relativa
    } catch (error) {
      console.log('16 - error: ', error)
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
    // desde el if al catch hay codigo repetido -> modificar para usar una misma funcion en los casos que uso el mismo codigo
      if(respuesta.ok){
        const datos = await respuesta.json()
        let token = datos.token
        window.sessionStorage.setItem("Authorization", token)
      } else{
          throw new enUso(501)
      }
    } catch (error) {
        throw error
    }
  }

  /** #### Funcion que trae la informacion del back 
 * @param {Event}
 */ 
  const traeData = async () => {
    try {
      //guardar token en base de datos y validar tiempo 
      let token = window.sessionStorage.getItem("Authorization");
      const respuesta = await fetch("http://localhost:4100/fechas", {
        headers: {
          'Authorization': token,
          "Content-Type" : "application/json"
        }
      });
      //hacer archivo de servicios 
      //
      if (respuesta.ok) {
        const jsonRespuesta = await respuesta.json();
        agregarFecha(jsonRespuesta.Mensaje);
      }
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
  // const peticionFetch = async (data, url) => {
//   const respuesta = await fetch(url, {
//     headers: {
      
//     }
//   })
// }