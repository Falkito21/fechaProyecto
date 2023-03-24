import { responderFront} from '#Helpers/helpers.js';
import { getConection} from '#Config/db.js'
import {validarId, validarVacio, validarTipoNumero, validarTipoString, validarDuplicado, validarCaracteresConSignos, validarEpocaFecha, validarBody, validarDobleEspacios, validarNumEnTexto} from '#Helpers/validaciones.js'
import { deleteFecha, getFechas, postFechas, putFecha, getFecha} from '#Database/querys.js'

export const servicioMostrarFechas = async (req, res) => {
    try{
        let respuesta = await mostrarFechas()
        responderFront(res, 200, respuesta)
    }catch(error){
        responderFront(res, 400, error.message)
    }
}

export const mostrarFechas = async () => {
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(getFechas())
        return result.recordset
}

export const servicioMostrarFecha = async (req, res) => {
    try {
        validarBody(req.body)
        let respuesta = await mostrarFecha(req.body)
        responderFront(res, 200, respuesta)
    } catch (error) {
        responderFront(res, error.codigoRes, error.message)
    }
}

export const mostrarFecha = async (data) => {
    try{
        let fechaIdBody = data.FechaID
        validarVacio(fechaIdBody, 'mostrarFecha')
        validarTipoNumero(fechaIdBody)
        await validarId(fechaIdBody)
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(getFecha(fechaIdBody))
        return result.recordset 
    }catch(error){  
        throw error
    }
}

export const servicioGuardarFecha = async (req, res) => {
    try {
        validarBody(req.body)
        await guardarFecha(req.body)
        responderFront(res, 200, 'Guardado Correctamente')
    } catch (error) {
        console.log('error: ', error)
        tipoRespuesta(res, error.message)
    }
}
//Test listo
export const guardarFecha = async (data) => {
    try {
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion
        validarDobleEspacios(fechaDescripcionBody)
        validarVacio(fechaDiaBody, 'el dia')
        validarVacio(fechaDescripcionBody, 'la descripcion')
        validarNumEnTexto(fechaDescripcionBody)
        //a veces hay problemas con formatFecha a la hora de validar EpocaFecha
        validarTipoString(fechaDescripcionBody)
        validarCaracteresConSignos(fechaDescripcionBody)
        await validarDuplicado(fechaDiaBody)
        validarEpocaFecha(fechaDiaBody)

        const conexionBDD = await getConection()
        await conexionBDD.request().query(postFechas(fechaDiaBody, fechaDescripcionBody))
    } catch (error) {
        throw error
    }
}

export const servicioModificarFecha = async (req, res) => {
    try{
        validarBody(req.body)
        await modificarFecha(req.body)
        responderFront(res, 200, 'Se modifico correctamente')
    }catch (error){
        tipoRespuesta(res, error)
    }
}
//Test listo
export const modificarFecha = async (data) => {
    try {
        let fechaIdBody  = data.FechaID
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion

        validarDobleEspacios(fechaDescripcionBody)
        validarVacio(fechaDiaBody, 'el dia')
        validarVacio(fechaDescripcionBody, 'la descripcion')
        validarNumEnTexto(fechaDescripcionBody)
        validarTipoString(fechaDescripcionBody)
        validarTipoNumero(fechaIdBody)
        await validarId(fechaIdBody)
        validarEpocaFecha(fechaDiaBody)
        validarCaracteresConSignos(fechaDescripcionBody)
        
        const conexionBDD = await getConection()
        await conexionBDD.request().query(putFecha(fechaIdBody, fechaDiaBody, fechaDescripcionBody))
    } catch (error) {
        throw error
    }
}
export const servicioEliminarFecha = async (req, res) => {
    try {
        validarBody(req.body)
        await eliminarFecha(req.body)
        responderFront(res, 200, 'Eliminado correctamente') 
    } catch (error) {
        tipoRespuesta(res, error)
    }
}

//Test listo
export const eliminarFecha = async (data) => {
    try { 
        let fechaIdBody = data.FechaID
        validarVacio(fechaIdBody, 'id')
        validarTipoNumero(fechaIdBody)
        await validarId(fechaIdBody)
        const conexionBDD = await getConection()
        await conexionBDD.request().query(deleteFecha(fechaIdBody))        
    } catch (error) {
        throw error
    }
}

export const tipoRespuesta = (respuesta, infoError) => {
    if(infoError.codigoRes === 501){
        responderFront(respuesta, infoError.codigoRes, infoError.message)
    }else{
        responderFront(respuesta, 500, infoError)
    }
}