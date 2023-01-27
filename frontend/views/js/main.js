const d = document,
$table = d.querySelector('.crud-table')
,$form = d.querySelector('.crud-form')
,$btn = d.querySelector('.enviar')
,$titulo = d.querySelector('.crud-titulo')
,$template = d.getElementById('crud-template').content
,$fragment = d.createDocumentFragment()


const getFechas = async () => {
    try {
        let res = await fetch('http://localhost:4100/fechas'),
        json = await res.json()

        if(!res.ok) throw {status: res.status, statusText: res.statusText}
        
        let listaFechas = json.Datos
        
        listaFechas.forEach((el) => {
            
        $template.querySelector('.fecha').textContent = el.FechaDia
        $template.querySelector('.descripcion').textContent = el.FechaDescription

        //editar
        let editar = $template.querySelector('.editar').dataset
        editar.id = el.FechaID
        editar.fecha = el.FechaDia
        editar.descripcion = el.FechaDescription4

        $template.querySelector('.eliminar').dataset.id = el.FechaID
        let $clone = d.importNode($template, true)
        $fragment.appendChild($clone)
        })
        $table.querySelector('tbody').appendChild($fragment)
    } catch (error) {
        console.log('prblema: ', error)
        let message = error || 'Ocurrio alguito'
        
        $table.insertAdjacentHTML(
            'afterend',
            `<p><b>Error ${error.status}: ${message}</b></p>`
        )
    } 
};
d.addEventListener('DOMContentLoaded', getFechas);

// VALIDAR DATOS --------------------------

// const validarFecha = async(fecha) => {
//     let fechaAct = new Date()
//     if(fecha>fechaAct) {
//         return fecha
//     }else{
//         throw new Error('Fecha fuera de tiempo')
//     }
// }

const esNull = async(valor)=> {
    if(valor !== null){
        return valor
    }else {
        throw new Error(`El campo no puede estar vacio`)
    }
}

const tipoString = async(valor) => {
    if(typeof valor === 'string'){
        return valor
    }else{
        throw new Error(`Es necesario que el valor ingresado sea de tipo texto`)
    }
}

// VALIDAR DATOS ---------------------------------

// GUARDAR DATOS ------------------------------
const guardarDato = async (e) => {
    e.preventDefault()
    let $fecha = d.querySelector('#fecha').value
    let $descripcion = d.querySelector('#descripcion').value

    esNull($fecha)
    tipoString($fecha)
    validarFecha($fecha)
    
    esNull($descripcion)
    tipoString($descripcion)
    validarFecha($descripcion)

    let data = {
        FechaDia: $fecha
        ,FechaDescription: $descripcion
    }
    let options = await ejecturaFetch('POST',data)
    ,res = ('http://localhost:4100/guardarFecha', options)
    ,json = await res.data
    console.log(options)
}
    $btn.addEventListener('click', guardarDato)
// GUARDAR DATOS ------------------------------
    
// EJECUTAR FETCH
const ejecturaFetch = async(verb, datos) => {
    return {
        method: verb
        ,headers: {
            'Content-Type': 'application/json; charset=utf-8',
        }
        ,body: JSON.stringify(datos)
    }
}
// EJECUTAR FETCH












































d.addEventListener('click', async (e) => {
    if(e.target.matches('.editar')){
        let seteo = e.target.dataset
        $titulo.textContent = 'Editar Fecha'
        $form.fecha.value = seteo.fecha
        $form.descripcion.value = seteo.descripcion
        $form.id.value = seteo.id
    }
    if(e.target.matches('.eliminar')){
        let isDelete = confirm(
            `Estas seguro que quieres eliminar el id ${e.target.dataset.id}`
        )
        let idEliminar = e.target.dataset.id
        if(isDelete){
            try{
                console.log('id en cotrolador eliminar:',$form.id.value)
                let options = {
                    method: 'DELETE'
                    ,headers: {
                        'Content-type': 'application/json; charset=utf-8',
                    },
                    data: JSON.stringify({
                        FechaID: idEliminar,
                    }),
                }, 
                res = await axios('http://localhost:4100/eliminarFecha', options),
                json = await res.data
                limpiarCampos()
                location.reload()
            }catch(error){
                let message = error.statusText || 'Algo raro ronda por aqui'
                alert(`Error ${error.status}: ${message}`)
            }
        }
    }
})


function limpiarCampos(){
    $form.fecha.value = ""
    $form.descripcion.value = ""
    $form.id.value = ""
}









    //no recarga la pag al apretar btn
        // e.preventDefault()
            // try {
                
            //     if(validarFecha && validarDescripcion){
            //         let options ={
            //             method: 'POST'
            //             ,headers: {
            //                 'Content-type': 'application/json; charset=utf-8',
            //             },
            //             data: JSON.stringify({
            //                 FechaDia: e.target.fecha.value
            //                 ,FechaDescription: e.target.descripcion.value
            //                 ,
            //             }),
            //         }
            //         ,res = await axios('http://localhost:4100/guardarFecha', options)
            //         ,json = await res.data
            //         limpiarCampos()
            //         location.reload()
            // }

            // } catch (error) {
            //     let message = error.statusText || 'ohh shit... here we go again'
            //     $form.insertAdjacentHTML(
            //         'afterend',
            //         `<p><b>Error ${error.status}: ${message}</b></p>`
            //     )
            // }
       

            //////////////////////
            const validarDescripcion2 = async(descripcion) => {
                //estrictamente = mismo tipo y mismo valor 
                if(!!descripcion && typeof descripcion !== 'string') {
                    throw new Error ('Descripcion invalida')
                }
            }
            
            const validarDescripcion3 = async(descripcion) => {
                if(descripcion === undefined && typeof descripcion !== 'string') {
                    throw new Error ('Descripcion invalida')
                }else{
                    return descripcion
                }
            }
            

                
    //*valide que tiene un valor 
    // if(!!descripcion){
    //     console.log('La descripcion no puede estar vacia')
    //     throw new Error ('Descripcion invalida')
    // }