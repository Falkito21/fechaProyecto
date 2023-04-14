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
        console.log(error)
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
        const datos = await respuesta.json()
        let token = datos.token
        window.sessionStorage.setItem("Authorization", token)
    } catch (error) {
        throw error
    }
  }
  const verificarUser = async (e) => {
    e.preventDefault()
    try {
        const user = await procesarData()
        await crearCuenta(user)
        window.location.replace('/fechas')
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
