// let d = document
// let dia = d.querySelector('#fecha').value
// let descripcion = d.querySelector('#descripcion').value

const d = document
const $inp_fecha = d.querySelector('#fecha')
const $inp_descripcion = d.querySelector('#descripcion')
const $btn = d.querySelector('#enviar')
const $div = d.querySelector('#cuerpo_tabla')
const $formulario = d.querySelector('#form')

//GET

const recibeInfo = async () => {
    try {
        const respuesta = await fetch('http://localhost:4100/fechas', {cache:'no-cache'})
        if(respuesta.ok){
            const jsonRespuesta = await respuesta.json()
            muestraResultados(jsonRespuesta.data)
        }
    }catch (error) {
        console.log('Error: ', error)
     }   
}

const muestraResultados = (res) => {
    let fechas = ''
    res.forEach(e => {
        let dia = e.FechaDia.substring(0,10)
        fechas += 
        `
        <li>${dia}</li>
        <li>${e.FechaDescripcion}</li>
        <button id="editar" data-id = '${e.FechaID}' >Editar</button>
        <button id="eliminar" data-id = '${e.FechaID}' >Eliminar</button>
        ` 
    });
    $div.innerHTML = fechas
}

//POST
const procesarDatos = () => {
    const datos = new FormData($formulario)
    const datosProcesados = Object.fromEntries(datos.entries())
    $formulario.reset()
    return datosProcesados
}

$formulario.addEventListener('submit', procesarDatos)


const postData = async () => {
    const newFecha = procesarDatos()
    console.log(newFecha)
    console.log('fechaNew: ', newFecha)
    try {
        const respuesta = await fetch('http://localhost:4100/guardarFecha', {
            method: 'POST'
            ,headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFecha)
        })
        if(Response.ok){
            const jsonRespuesta = await respuesta.json()
            console.log('Se guardo: ', jsonRespuesta)

        }
    } catch (error) {
        console.log('Error: ', error``)
    }
}


$btn.addEventListener ('click', async (event) => {
    event.preventDefault()
    await postData()
    await recibeInfo()  
})


d.addEventListener('DOMContentLoaded', recibeInfo)

const deleteData = async () => {
    // await recibeInfo()
    let id_btn = btn_eliminar.dataset.id
    try {
        const respuesta = await fetch('http://localhost:4100/eliminarFecha', {
            method: 'DELETE'
            ,headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFecha)
        })
        if(Response.ok){
            const jsonRespuesta = await respuesta.json()
            console.log('Se elimino: ', jsonRespuesta)

        }
    } catch (error) {
        console.log('Error: ', error``)
    }
}

const btn_eliminar = d.querySelector('#eliminar')

btn_eliminar.addEventListener('click', (event) => {
    event.preventDefault()
    let id_btn = btn_eliminar.dataset.id
    console.log(id_btn)
    deleteData(id_btn)
})


