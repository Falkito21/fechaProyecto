import { responderFront} from '#Helpers/helpers.js';
import { getConection, sql} from '#Config/db.js'
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
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
    try{
        await permisoBDD.begin()
        let fechaIdBody = data.FechaID
        await validacionesGenerales(fechaIdBody, false, false)
        
        const result = await conexionBDD.request().query(getFecha(fechaIdBody))
        await permisoBDD.commit()
        return result.recordset 
    }catch(error){  
        await permisoBDD.rollback()
        throw error
    } finally{
        conexionBDD.close()
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
//Test listo
//modularizar mas - puedo poner el codigo de validaciones en otra funcion y pasar los parametros necesarios para que realice la validaciones en una funcion apara, y lugo llamarla
//Lo mismo con la conexion a la base de datos y a la peticion/query
export const guardarFecha = async (data) => {
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
    try {
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion
        //a veces hay problemas con formatFecha a la hora de validar EpocaFecha
        await permisoBDD.begin()
        await validacionesGenerales(false, fechaDiaBody, fechaDescripcionBody)
        
        await conexionBDD.request().query(postFechas(fechaDiaBody, fechaDescripcionBody))
        await permisoBDD.commit()
    } catch (error) {
        await permisoBDD.rollback()
        throw error
    }finally{
        await conexionBDD.close()
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

export const modificarFecha = async (data) => {
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
    try {
        await permisoBDD.begin()
        let fechaIdBody  = data.FechaID
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion


        await validacionesGenerales(fechaIdBody, fechaDiaBody, fechaDescripcionBody)
        
        await conexionBDD.request().query(putFecha(fechaIdBody, fechaDiaBody, fechaDescripcionBody))
        await permisoBDD.commit()
    } catch (error) {
        await permisoBDD.rollback()
        throw error
    } finally{
        conexionBDD.close()
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

export const eliminarFecha = async (data) => {
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
    try { 
        await permisoBDD.begin()
        let fechaIdBody = data.FechaID
        await validacionesGenerales(fechaIdBody, false, false)
        await conexionBDD.request().query(deleteFecha(fechaIdBody))        
        await permisoBDD.commit()
    } catch (error) {
        await permisoBDD.rollback()
        throw error
    } finally{
        conexionBDD.close()
    }
}

const validacionesGenerales = async(id, fecha, descripcion) => {
    try {
        if (id !== false){
            validarVacio(id, 'id')
            validarTipoNumero(id)
            await validarId(id)
        }
        
        if (descripcion !== false){
            validarDobleEspacios(descripcion)
            validarVacio(descripcion, 'la descripcion')
            validarNumEnTexto(descripcion)
            validarTipoString(descripcion)
            validarCaracteresConSignos(descripcion)
        }
        if (fecha !== false){
            validarVacio(fecha, 'el dia')
            validarEpocaFecha(fecha)
            await validarDuplicado(fecha)
        }
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