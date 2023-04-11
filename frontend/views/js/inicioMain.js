const d = document;
const $formInicio = d.querySelector("#formInicio")
const $userInput = d.querySelector('#user')
const $passInput = d.querySelector('#pwd')

const procesarData = async() => {
    try {
        console.log('entro a procesarData')
        const datos = new FormData($formInicio)
        const datosProcesados = Object.fromEntries(datos.entries())
        $formInicio.reset()
        return datosProcesados
    } catch (error) {
        throw error
    }
  }
  
  const iniciarSesion = async (credenciales) => {
    try {
        const respuesta = await fetch('http://localhost:4100/inicioSesion',{
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credenciales)
        })
        const datos = await respuesta.json()
        let token = datos.token        
        return token
    } catch (error) {
        throw error
    }
  }
  
  const verificarUser = async(e) => {
    e.preventDefault()
    const user = await procesarData()
    try {
        let token = await iniciarSesion(user)
        window.location.href = './html/index.html'
        await traeData(token)
    } catch (error) {
        throw error
    }
  }
  
  d.addEventListener("click", async (e) => {
    if(e.target.matches("#enviar")){
        e.preventDefault()
        await verificarUser(e)
    }
  })
  
  

