const d = document
const $form = d.querySelector('#form')
const $dateInput = d.querySelector('#fecha')
const $descriptionInput = d.querySelector('#descripcion')
const $sendInput = d.querySelector('#enviar')
const $hiddenInput = d.querySelector('#hidden')
const $listFechas = d.querySelector('#list-date')
const template = d.querySelector('#template')
const fragment = d.createDocumentFragment()


let fechaObjetos = []

const traeData = async () => {
    try {
        const respuesta = await fetch('http://localhost:4100/fechas', {
            cache: 'no-cache'
        })
        if(respuesta.ok) {
            const jsonRespuesta = await respuesta.json()
            console.log(jsonRespuesta.data)
            agregarFecha(jsonRespuesta.data)
        }
    } catch (error) {
        console.log('Error: ', error)
    }
}

const agregarFecha = (res) => {
    res.forEach(e => {
        const fecha ={
            id: parseInt(e.FechaID),
            fecha: e.FechaDia.substring(0,10),
            descripcion: e.FechaDescripcion
        }
        console.log(fecha)
        fechaObjetos.push(fecha)
    })
    pintarFechas()
}
const pintarFechas = () => {
    try {
        fechaObjetos.forEach(e => {
            $listFechas.textContent= ''
            const clone = template.content.cloneNode(true)
            clone.querySelector('#date-template').textContent = e.fecha
            clone.querySelector('#description-template').textContent = e.descripcion
        
            clone.querySelector('#editar').dataset.id = e.id
            clone.querySelector('#editar').dataset.fecha = e.fecha
            clone.querySelector('#editar').dataset.descripcion = e.descripcion
            clone.querySelector('#eliminar').dataset.id = e.id
                    
            fragment.appendChild(clone)
        })
        $listFechas.appendChild(fragment)
    } catch (error) {
        console.log('Error: ', error)
    }
}

const btnEliminar = async (e) => {
    try {
        let fechaEliminar = {FechaID: e.target.dataset.id}
        const respuesta = await fetch('http://localhost:4100/eliminarFecha', {
        method: 'DELETE'
        ,headers:{
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(fechaEliminar)
        })
        if(respuesta.ok){
            console.log('entra')
            //Arreglar problema de recargar fechas
            window.location.reload()
        }
    } catch (error) {
        
    }
}
const procesarDatos = () => {
    try {
        const datos = new FormData($form)
        const datosProcesados = Object.fromEntries(datos.entries())
        $form.reset()
        return datosProcesados
    } catch (error) {
        console.log('Error: ', error)
    }
}
const btnGuardar = async (e) => {
    const newFecha = procesarDatos()
    console.log('entra')
    try {
            await fetch("http://localhost:4100/guardarFecha", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newFecha),
        });
    } catch (error) {
        console.log('Error: ', error)
    }
}
const btnEditar = async(e) => {
    const fechaModificada = procesarDatos()
    fechaModificada.FechaID = $hiddenInput.value
    try {
        const respuesta = await fetch("http://localhost:4100/modificarFecha", {
          method: 'PUT'
          ,headers:{
            "Content-Type": "application/json",
          }, 
          body: JSON.stringify(fechaModificada)
        })
        window.location.reload()
    } catch (error) {
        console.log('Error: ', error)
    }
}
const eleccion = async (e) => {
    if($sendInput.dataset.editar === 'true'){
        e.preventDefault()
        await btnEditar(e)
        $sendInput.dataset.editar = ''
    }else{
        await btnGuardar(e)
    }
}

d.addEventListener('DOMContentLoaded', traeData)

d.addEventListener('submit', eleccion)

d.addEventListener('click', e => {
    if(e.target.matches('#eliminar')){
        btnEliminar(e)
    }
    if(e.target.matches('#editar')){
        $dateInput.value = e.target.dataset.fecha
        $descriptionInput.value = e.target.dataset.descripcion
        $sendInput.dataset.editar = 'true'
        $hiddenInput.value = e.target.dataset.id
    }
})