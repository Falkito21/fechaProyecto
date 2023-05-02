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