import { responderFront} from '#Helpers/helpers.js';
import {validarId, validarVacio, validarTipoNumero, validarTipoString, validarDuplicado, validarCaracteresConSignos, validarEpocaFecha, validarBody, validarDobleEspacios, validarNumEnTexto} from './../validations/validaciones.js'
import { fechaRepositories } from '../helpers/repositories.js';
/** #### Funcion que muestra las fechas 
 * @param {Event}
 */  
export const servicioMostrarFechas = async (req, res) => {
    try{
        const {authorization} = req.headers
        if(!authorization) {
            throw error
        }
        let respuesta = await mostrarFechas()
        responderFront(res, 200, respuesta)
    }catch(error){
        responderFront(res, 400, error.message)
    }
}
/** #### Funcion que llama a la funcion mostrar fechas 
 * @param {Event}
 */  
export const mostrarFechas = async () => {
        const result = await fechaRepositories.traerFechas()
        return result.recordset
}
/** #### Funcion que llama a mostrar una fecha 
 * @param {Event}
 */  
export const servicioMostrarFecha = async (req, res) => {
    try {
        validarBody(req.body)
        let respuesta = await mostrarFecha(req.body)
        responderFront(res, 200, respuesta)
    } catch (error) {
        responderFront(res, error.codigoRes, error.message)
    }
}
/** #### Funcion que muestra una fecha en base al id que le indiques 
 * @param {Event}
 */  
export const mostrarFecha = async (data) => {
    try{
        let fechaIdBody = data.FechaID
        await validacionesGenerales(fechaIdBody, false, false)
        const result = await fechaRepositories.traerFecha(fechaIdBody)
        return result.recordset 
    }catch(error){  
        throw error
    }
}
/** #### Funcion que llama a guardarFecha
 * @param {Event}
 */  
export const servicioGuardarFecha = async (req, res) => {
    try {
        validarBody(req.body)
        await guardarFecha(req.body)
        responderFront(res, 200, 'Guardado Correctamente')
    } catch (error) {
        tipoRespuesta(res, error)
    }
}
/** #### Funcion que guarda la fecha en base al los datos proporcionados: id - fecha - descripcion 
 * @param {Event}
 */  
export const guardarFecha = async (data) => {
    try {
        let fechaDiaBody = data.FechaDia
        let fechaDescripcionBody = data.FechaDescripcion
        await validacionesGenerales(false, fechaDiaBody, fechaDescripcionBody, false)
        await fechaRepositories.guardarFechas(fechaDiaBody, fechaDescripcionBody)
    } catch (error) {
        throw error
    }
}
/** #### Funcion que llama a la funcion modificarFecha
 * @param {Event}
 */  
export const servicioModificarFecha = async (req, res) => {
    try{
        validarBody(req.body)
        await modificarFecha(req.body)
        responderFront(res, 200, 'Se modifico correctamente')
    }catch (error){
        tipoRespuesta(res, error)
    }
}
/** #### Funcion que modifica una fecha en base a los datos proporcionados: id - fecha - descripcion
 * @param {Event}
 */  
export const modificarFecha = async (data) => {
    try {
        const {FechaID, FechaDia, FechaDescripcion} = data
        await validacionesGenerales(FechaID, FechaDia, FechaDescripcion)
        await fechaRepositories.modificarFechas(FechaID, FechaDia, FechaDescripcion)
    } catch (error) {
        throw error
    } 
}
/** #### Funcion que llama a eliminarFecha 
 * @param {Event}
 */  
export const servicioEliminarFecha = async (req, res) => {
    try {
        validarBody(req.body)
        await eliminarFecha(req.body)
        responderFront(res, 200, 'Eliminado correctamente') 
    } catch (error) {
        tipoRespuesta(res, error)
    }
}
/** #### Funcion que elimina una fecha en base al id que le indicamos  
 * @param {Event}
 */  
export const eliminarFecha = async (data) => {
    try { 
        let fechaIdBody = data.FechaID
        await validacionesGenerales(fechaIdBody, false, false)
        await fechaRepositories.eliminarFecha(fechaIdBody)       
    } catch (error) {
        throw error
    }
}
/** #### Funcion que realiza las validaciones necesarias para evitar el almacenamiento de datos erroneos 
 * @param {Event}
 */  
const validacionesGenerales = async(id, fecha, descripcion, evitaValidacion = true) => {
    try {
        if (id !== false){
            await validaId(id)
        }
        if (descripcion !== false){
            await validarDescripcion(descripcion)
        }
        if (fecha !== false){
            await validarFecha(fecha, evitaValidacion)
        }
    } catch (error) {
        throw error
    }
}
/** #### Funcion que realiza las validaciones necesarias al id
 * @param {Event}
 */  
const validaId = async (id) => {
    validarVacio(id, 'id')
    validarTipoNumero(id)
    await validarId(id)
}
/** #### Funcion que realiza las validaciones necesarias a la descripcion
 * @param {Event}
 */  
const validarDescripcion = async (descripcion) => {
    validarDobleEspacios(descripcion)
    validarVacio(descripcion, 'la descripcion')
    validarNumEnTexto(descripcion)
    validarTipoString(descripcion)
    validarCaracteresConSignos(descripcion)
}
/** #### Funcion que realiza las validaciones necesarias a la fecha
 * @param {Event}
 */  
const validarFecha = async (fecha, evitaValidacion = true) => {
    validarVacio(fecha, 'el dia')
    validarEpocaFecha(fecha)
    if(!evitaValidacion){
        await validarDuplicado(fecha)
    }
}
/** #### Funcion envia una respuesta al front  
 * @param {Event}
 */  
export const tipoRespuesta = (respuesta, infoError) => {
    if(infoError.codigoRes === 501){
        responderFront(respuesta, infoError.codigoRes, infoError.message)
    }else{
        responderFront(respuesta, 500, infoError)
    }
}