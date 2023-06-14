const d = document
const $ = (tag) => {
    return document.querySelector(tag)
}

const formularioInicio = $("formInicio")
const $formInicio = d.querySelector("#formInicio")
const $userInput = d.querySelector('#user')
const $passInput = d.querySelector('#pwd')
const $createTemplate = d.querySelector('#create-template-mensaje')
const $contentMsjCreate = d.querySelector('#mensaje-container-create')
const fragment = d.createDocumentFragment()

const procesarData = async() => {
    try {
        const datos = new FormData($formInicio)
        const datosProcesados = Object.fromEntries(datos.entries())
        return datosProcesados
    } catch (error) {
        throw error
    }
  }

  const verificarUser = async (e) => {
    e.preventDefault()
    try {
        const user = await procesarData()
        await verificarDatos(user)
        await crearCuenta(user)
        $formInicio.reset()
        window.location.replace('/fechas')
    } catch (error) {
        pintarMensaje($contentMsjCreate, $createTemplate, "#error-message-create", error.message)
    }
  }
  const verificarDatos = async (datosUser) => {
    try {
        const {email, password} = datosUser
        await emailValidate(email)
        await passwordValidate(password)
    } catch (error) {
        throw error
    }
  }
  d.addEventListener("click", async (e) => {
    if(e.target.matches("#enviarCrear")){
        e.preventDefault()
        await verificarUser(e)
    }
  })
