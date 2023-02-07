import { responderFront} from '#Helpers/helpers.js';
import { getConection} from './../config/db.js'
import {validarId, validarVacio, validarTipoNumero, validarTipoString, validarDuplicado, validarCaracteres, validarEpocaFecha} from '#Helpers/validaciones.js'
import { deleteFecha, getFechas, postFechas, putFecha, getFecha, getEncontrar} from '#Database/querys.js'

export const mostrarFechas = async (req, res) => {
    try{
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(getFechas())
        responderFront(res, 200, result.recordset)
    }catch(err){
        responderFront(res, 400, err)
    }
}

export const mostrarFecha = async (req, res) => {
    try {
        let datos = req.body
        let fechaId = datos.FechaID

        await validarVacio(fechaId, 'mostrarFecha')

        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(getFecha(fechaId))
        responderFront(res, 200, result.recordset)
    } catch (err) {
        responderFront(res, 400, err)
    }
}

export const guardarFecha = async (req, res) => {
    try {
        let datos = req.body

        let fechaDia = datos.FechaDiaBody
        let fechaDescripcion = datos.FechaDescripcion
        
        await validarVacio(fechaDia, 'el dia')
        await validarVacio(fechaDescripcion)
        await validarEpocaFecha(fechaDia)
        await validarTipoString(fechaDescripcion)
        await validarCaracteres(fechaDescripcion)
        await validarDuplicado(fechaDia)

        const conexionBDD = await getConection()
        await conexionBDD.request().query(postFechas(fechaDia, fechaDescripcion))
        responderFront(res, 200, 'Guardado Correctamente')
    } catch (err) {
        responderFront(res, 500, err)
    }
}

export const modificarFecha = async (req, res) => {
    try{
        let datos = req.body

        let fechaId  = datos.FechaID
        let fechaDia = datos.FechaDia
        let fechaDescripcion = datos.FechaDescripcion
        
        await validarVacio(fechaDia, 'el dia')
        await validarVacio(fechaDescripcion, 'la descripcion')
        await validarTipoString(fechaDescripcion)
        await validarId(fechaId)
        await validarEpocaFecha(fechaDia)
        await validarCaracteres(fechaDescripcion)
        await validarDuplicado(fechaDia)
        
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(putFecha(fechaId, fechaDia, fechaDescripcion))
        responderFront(res, 200, 'Se modifico correctamente')
    }catch (err){
        responderFront(res, 404, err)
    }
}

export const eliminarFecha = async (req, res) => {
    try {
        let datos = req.body
        let fechaId = datos.FechaID
        
        await validarVacio(fechaId, 'id')
        await validarId(fechaId)

        const conexionBDD = await getConection()

        await conexionBDD.request().query(deleteFecha(datos.FechaID))
        responderFront(res, 200, 'Eliminado correctamente')        
    } catch (err) {
        responderFront(res, 404, err)
    }
}

export const verificarFecha = async (req, res) => {
    try{
        let datos = req.body
        
        await validarVacio(datos.FechaDia.DD)
        await validarTipoNumero(datos.FechaDia.DD)        
        await validarVacio(datos.FechaDia.MM)
        await validarTipoNumero(datos.FechaDia.MM)        
        await validarVacio(datos.FechaDia.YYYY)
        await validarTipoNumero(datos.FechaDia.YYYY)        

        let diaComp = datos.FechaDia.DD
        let mesComp = datos.FechaDia.MM
        let anioComp = datos.FechaDia.YYYY

        let fechaT = anioComp+mesComp+diaComp
        
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(getEncontrar(fechaT))
        
        if(result.recordset == '') return responderFront(res, false)
        if(result.recordset[0].FechaDia) return responderFront(res, true)

    }catch(err){
        console.log('Error al ejecutar la funcion verificarFecha: ', err)
    }
}

// export const eliminarEntre = async (req, res) => {
//     let datos.body
//     let FechaIdI = datos.
// }