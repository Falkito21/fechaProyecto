  /** #### Funcion que pinta el mensaje de error
 * @param {Event}
 */ 
  const pintarMensaje = async (cajaMensaje,cajaContTemp, cajaContMsjTemp, error) => {
    try {
      cajaMensaje.textContent = "";
      const clone = cajaContTemp.content.cloneNode(true);
      clone.querySelector(cajaContMsjTemp).textContent = error;
      fragment.appendChild(clone);
      cajaMensaje.appendChild(fragment);
      setTimeout(() => {
            cajaMensaje.textContent = "";
      }, 4000);
    } catch (error) {
       throw error
    }
  };
  
  const settearItem = async (token, payload, email) => {
    window.sessionStorage.setItem("Authorization", token);
    window.sessionStorage.setItem("X-Custom-Header", payload)
    window.sessionStorage.setItem('email', email)
  }

  const peticionFetch = async (url, metodo, data) => {
    try {
      console.log('url: ', url)
      console.log('metodo: ', metodo)
      console.log('data: ', data)

      const res =  await fetch('http://localhost:4100/'+url, { 
        method: metodo,
        headers: {
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data)
      })
      console.log('respuesta peticionFetch - helpers: ', res)
      return res
    } catch (error) {
      throw error
    }
  }