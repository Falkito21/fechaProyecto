const d = document
const $formInicio = d.querySelector("#formInicio")
const $userInput = d.querySelector('#user')
const $passInput = d.querySelector('#pwd')
const $inicioTemplate = d.querySelector('#inicio-template-mensaje')
const $contentMsjInicio = d.querySelector('#mensaje-container-inicio')
const $btnEliminarUser = d.querySelector('#btn-eliminar-cuenta')
const fragment = d.createDocumentFragment();

const procesarData = async() => {
    try {
        const datos = new FormData($formInicio)
        const datosProcesados = Object.fromEntries(datos.entries())
        $formInicio.reset()
        return datosProcesados
    } catch (error) {
        throw error
    }
  }
    const verificarUser = async(e) => {
    e.preventDefault()
    try {
        const user = await procesarData()
        await validarData(user)
         await iniciarSesion(user)
        window.location.replace('/fechas')
    } catch (error) {
        pintarMensaje($contentMsjInicio, $inicioTemplate, "#error-message-inicio", error.message)
    }
  }
  
  d.addEventListener("click", async (e) => {
    if(e.target.matches("#enviarInicio")){
        e.preventDefault()
        await verificarUser(e)
    }
  })

  const validarData = async (dataUser) => {
    try {
        const {email} = dataUser
        await emailValidate(email)
        return dataUser
    } catch (error) {
        throw error
    }
  }
  
  
  
  