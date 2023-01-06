const d = document,
$table = d.querySelector('.crud-table')
,$form = d.querySelector('.crud-form')
,$titulo = d.querySelector('.crud-titulo')
,$template = d.getElementById('crud-template').content
,$fragment = d.createDocumentFragment()

const getFechas = async () => {
    try {
        let res = await axios.get('http://localhost:4100/fechas'),
        json = await res.data

        let listaFechas = json.Datos

        listaFechas.forEach((el) => {

        $template.querySelector('.fecha').textContent = el.FechaDia
        $template.querySelector('.descripcion').textContent = el.FechaDescription

        //editar
        $template.querySelector('.editar').dataset.id = el.FechaID
        $template.querySelector('.editar').dataset.fecha = el.FechaDia
        $template.querySelector('.editar').dataset.descripcion = el.FechaDescription

        $template.querySelector('.eliminar').dataset.id = el.FechaID

        let $clone = d.importNode($template, true)
        $fragment.appendChild($clone)
        })
        $table.querySelector('tbody').appendChild($fragment)
    } catch (error) {
        let message = error.statusText || 'Ocurrio alguito'
        $table.insertAdjacentHTML(
            'afterend',
            `<p><b>Error ${error.status}: ${message}</b></p>`
        )
    } 
};
d.addEventListener('DOMContentLoaded', getFechas);


const validarFecha = async(fecha) => {
    
}
const validarDescripcion = async(descripcion) => {
    if(descripcion === '') console.log('La decripcion no puede estar vacia')
    if(descripcion instanceof String) console.log('La descripcion tiene que ser de tipo texto')
    if(descripcion === undefined) console.log('La descripcion tiene que')

}

d.addEventListener('submit', async (e) => {
    if(e.target === $form) {

        e.preventDefault()

        if(!e.target.id.value){
            try {
                let options ={
                    method: 'POST'
                    ,headers: {
                        'Content-type': 'application/json; charset=utf-8',
                    },
                    data: JSON.stringify({
                        FechaDia: e.target.fecha.value
                        ,FechaDescription: e.target.descripcion.value
                        ,
                    }),
                }
                ,res = await axios('http://localhost:4100/guardarFecha', options)
                ,json = await res.data
                limpiarCampos()
                location.reload()

            } catch (error) {
                let message = error.statusText || 'ohh shit... here we go again'
                $form.insertAdjacentHTML(
                    'afterend',
                    `<p><b>Error ${error.status}: ${message}</b></p>`
                )
            }
        }
        else{
            try{
                let options ={
                    method: 'PUT'
                    ,headers:{
                        'Content-type' : 'application/json; charset=utf-8',
                    },
                    data: JSON.stringify({
                        FechaID: e.target.id.value,
                        FechaDia: e.target.fecha.value,
                        FechaDescription: e.target.descripcion.value,
                    }),
                },
                res = await axios('http://localhost:4100/modificarFecha', options),
                json = await res.data
                limpiarCampos()
                location.reload()
            }catch(error){
                let message = error.statusText || "Error en la actualizacion de la fecha"
                $form.insertAdjacentHTML(
                    "afterend"
                    ,`<p><b>Error ${error.status}: ${message}</b></p>`
                )
            }
        }
    }
})

d.addEventListener('click', async (e) => {
    if(e.target.matches('.editar')){
        $titulo.textContent = 'Editar Fecha'
        $form.fecha.value = e.target.dataset.fecha
        $form.descripcion.value = e.target.dataset.descripcion
        $form.id.value = e.target.dataset.id
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
