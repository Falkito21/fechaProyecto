const d = document
const $formInicio = d.querySelector("#formInicio")
const $userInput = d.querySelector('#user')
const $passInput = d.querySelector('#pwd')

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
    const user = await procesarData()
    try {
        await iniciarSesion(user)
        window.location.replace('/fechas')
    } catch (error) {
        throw error
    }
  }
  
  d.addEventListener("click", async (e) => {
    if(e.target.matches("#enviarInicio")){
        e.preventDefault()
        await verificarUser(e)
    }
  })
  
  
  
  