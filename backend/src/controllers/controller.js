import { responderFront} from '#Helpers/helpers.js';
import { getConection} from '#Config/db.js'
import {validarId, validarVacio, validarTipoNumero, validarTipoString, validarDuplicado, validarCaracteres, validarEpocaFecha, validarBody, validarDobleEspacios} from '#Helpers/validaciones.js'
import { deleteFecha, getFechas, postFechas, putFecha, getFecha} from '#Database/querys.js'

export const servicioMostrarFechas = async (req, res) => {
    try{
        let respuesta = await mostrarFechas()
        responderFront(res, 200, respuesta)
    }catch(error){
        responderFront(res, 400, error.message)
    }
}

const mostrarFechas = async () => {
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

const mostrarFecha = async (data) => {
    try{
        let fechaIdBody = data.FechaID
        validarDobleEspacios(fechaIdBody)
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
        tipoRespuesta(res, error)
    }
}

const guardarFecha = async (data) => {
    try {
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion

        console.log('fjdsalkf: ',fechaDescripcionBody)
        
        validarDobleEspacios(fechaDiaBody)
        validarDobleEspacios(fechaDescripcionBody)
        validarVacio(fechaDiaBody, 'el dia')
        validarVacio(fechaDescripcionBody, 'la descripcion')
        validarEpocaFecha(fechaDiaBody)
        validarTipoString(fechaDescripcionBody)
        validarCaracteres(fechaDescripcionBody)
        await validarDuplicado(fechaDiaBody)

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
const modificarFecha = async (data) => {
    try {
        let fechaIdBody  = data.FechaID
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion
        
        validarDobleEspacios(fechaIdBody)
        validarDobleEspacios(fechaDiaBody)
        validarDobleEspacios(fechaDescripcionBody)
        validarVacio(fechaDiaBody, 'el dia')
        validarVacio(fechaDescripcionBody, 'la descripcion')
        validarTipoString(fechaDescripcionBody)
        await validarId(fechaIdBody)
        validarEpocaFecha(fechaDiaBody)
        validarCaracteres(fechaDescripcionBody)
        await validarDuplicado(fechaDiaBody)
        
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

const eliminarFecha = async (data) => {
    try { 
        let fechaIdBody = data.FechaID
        validarDobleEspacios(fechaIdBody)
        validarVacio(fechaIdBody, 'id')
        await validarId(fechaIdBody)
        const conexionBDD = await getConection()
        await conexionBDD.request().query(deleteFecha(fechaIdBody))        
    } catch (error) {
        throw error
    }
}

const tipoRespuesta = (respuesta, infoError) => {
    if(infoError.codigoRes === 501){
        responderFront(respuesta, infoError.codigoRes, infoError.message)
    }else{
        responderFront(respuesta, 500, infoError)
    }
}