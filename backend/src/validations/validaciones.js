import {verificarId, verificarDuplicado} from '#Database/querys.js'
import { getConection} from '#Config/db.js'
import {ErrorDuplicado, ErrorElementoVacio, ErrorTipo, ErrorFechaAntigua, ErrorSignos, ErrorBody, ErrorNumeroEnString, ErrorId, ErrorDobleEspacios, ErrorFechaFormat, ErrorCompararFechas} from '../errors/erroresCustom.js'
import dayjs from 'dayjs'
import { fechaRepositories } from '#Helpers/repositories.js'


/** #### Valida el id, si se encunetra en la base de datos retorna true 
 * @param {Event}
 */  
export const validarId = async (datos) => {
    try {
        const result = await fechaRepositories.traerIdFecha(datos)
        if(!result.recordset[0]) throw new ErrorId(datos, 501)
        if(result.recordset[0].FechaID == datos) return true
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida si los campos se encuentran vacios o null
 * @param {Event}
 */  
export const validarVacio = (datos, tipo) => {
    try {
        if(datos === '' || datos === null || datos === undefined || datos === ' '){
            throw new ErrorElementoVacio(tipo, 501)
        }else{
            return datos
        }
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida si el id es de tipo numerico
 * @param {Event}
 */  
export const validarTipoNumero = (datos) => {
    try {
        if(typeof datos !== 'number'){
            throw new ErrorTipo('El id', 'numero', 501)
        }else{
         return datos
        }
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida si la descripcion es de tipo string
 * @param {Event}
 */  
export const validarTipoString = (datos) => {
    try {
        if(typeof datos !== 'string'){
            throw new ErrorTipo('La descripcion', 'texto', 501)
        }else{
            let verificarTexto = validarNumEnTexto(datos)
            return verificarTexto
        }
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida si hay numeros en la descripcion
 * @param {Event}
 */
export const validarNumEnTexto = (texto) => {
    try {
        const NUMEROS = new RegExp("^([^0-9]*)$")
        let noContNum = NUMEROS.test(texto)
        if(!noContNum) throw new ErrorNumeroEnString(501)
        if(noContNum) return texto
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida si la fecha ya se encuentra en la BDD
 * @param {Event}
 */
export const validarDuplicado = async (datos) => {
    try {
        let data = formatFecha(datos)
        const result = fechaRepositories.verificarDuplicado(datos)
        if(result.recordset[0]){
            throw new ErrorDuplicado(data, 501) 
        }else{
            return datos
        } 
    } catch (error) {
        throw error 
    }
}
/** #### Funcion que valida si la descripcion contiene dobles espacios
 * @param {Event}
 */
export const validarDobleEspacios = (datos) => {
    try {
        const ESPACIOS_INPUT = /([  ]{2,})/
        let cumpleCond = ESPACIOS_INPUT.test(datos)
        if(cumpleCond) throw new ErrorDobleEspacios(501)
        if(!cumpleCond) return datos
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida si la descripcion contiene signos
 * @param {Event}
 */
export const validarCaracteresConSignos = (datos) => {
    try {
        const LETRAS_INPUT = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
        //cumple condicion
        let cumple = LETRAS_INPUT.test(datos)
        if(!cumple) throw new ErrorSignos(501)
        if(cumple) return datos
    } catch (error) {
        throw error
    }
}
/** #### Funcion que valida y compara las fechas de los usuarios con la fecha actual 
 * @param {Event}
 */
export const validarEpocaFecha = (datos) => {
    try {
        let fechaActual = new Date()
        let fechaActualFormat = formatFecha(fechaActual)
        let dataUser = formatFecha(datos)
        let esMayor = compararFechas(dataUser, fechaActualFormat)
        if(esMayor != true) throw new ErrorFechaAntigua(fechaActualFormat, 501)
        if(esMayor == true) return datos
    } catch (error) {
        throw error
    }
}
/** #### Formatea la fecha a un formato mas adecuado 
 * @param {Event}
 */
export const formatFecha = (fecha) => {
    try {
        let fechaFormat = dayjs(fecha).format('YYYY/MM/DD')
        return fechaFormat
    } catch (error) {
        throw new ErrorFechaFormat(501)
    }
}

/** #### Compara si la fecha es anterior o igual a la fecha actual
 * @param {Event}
 */
export const compararFechas = (fechaUsuario, fechaHoy) => {
    try {
        let fechaValida = dayjs(fechaUsuario).isAfter(dayjs(fechaHoy))
        return fechaValida   
    } catch (error) {
        throw new ErrorCompararFechas(501)
    }
}

/** #### Valida si el cuerpo que resiven los servicios contienen elementos y sus valores 
 * @param {Event}
 */
export const validarBody = (info) => {
    try {
        if(Object.keys(info).length === 0){
            throw new ErrorBody(501)
        }
        return info
    } catch (error) {
        throw error
    }
}
