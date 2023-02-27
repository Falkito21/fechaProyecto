const d = document,
$table = $('.crud-table')
,$form = $('.crud-form')
,$btn = $('.enviar')
,$titulo = $('.crud-titulo')
,$template = $('.crud-template').content


const getFechas = async () => {
    try {
        let res = await fetch('http://localhost:4100/fechas'),
        json = await res.json()
        
        if(!res.ok) throw {status: res.status, statusText: res.statusText}
        
        let listaFechas = json.data        
        
        recorrerFechas(listaFechas)
        
    } catch (error) {
        console.log('prblema: ', error)
        let message = error || 'Ocurrio alguito'
        
    }
}

const recorrerFechas = (listas) => {
    listas.map((i) => {
        let lista = `<ul id='${i.FechaID}'>
            <li>${i.FechaDia}</li>
            <li>${i.FechaDescripcion}</li>
            <button id="editar">Editar</button>
            <button id="eliminar">Eliminar</button>
        </ul>`
        $('#crud-template').append(lista)
        console.log(lista)
        lista = ''
    })
    return
}

d.addEventListener('DOMContentLoaded', getFechas);