import {verificarId, verificarDuplicado} from '#Database/querys.js'
import { getConection} from '#Config/db.js'
import {ErrorDuplicado, ErrorElementoVacio, ErrorTipo, ErrorFechaAntigua, ErrorSignos, ErrorBody, ErrorNumeroEnString, ErrorId, ErrorDobleEspacios} from '../errors/erroresCustom.js'
import moment from 'moment'

/** #### Valida el id, si se encunetra en la base de datos retorna true 
 * @param {Event}
 */  
export const validarId = async (datos) => {
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarId(datos))
    if(!result.recordset[0]) throw new ErrorId(datos, 501)
    if(result.recordset[0].FechaID == datos) return true
}
/** #### Funcion que valida si los campos se encuentran vacios o null
 * @param {Event}
 */  
export const validarVacio = (datos, tipo) => {
    if(datos === '' || datos === null || datos === undefined || datos === ' '){
        throw new ErrorElementoVacio(tipo, 501)
    }else{
        return datos
    }
}
/** #### Funcion que valida si el id es de tipo numerico
 * @param {Event}
 */  
export const validarTipoNumero = (datos) => {
    if(typeof datos !== 'number'){
        throw new ErrorTipo('El id', 'numero', 501)
    }else{
     return datos
    }
}
/** #### Funcion que valida si la descripcion es de tipo string
 * @param {Event}
 */  
export const validarTipoString = (datos) => {
    if(typeof datos !== 'string'){
        throw new ErrorTipo('La descripcion', 'texto', 501)
    }else{
        let verificarTexto = validarNumEnTexto(datos)
        return verificarTexto
    }
}
/** #### Funcion que valida si hay numeros en la descripcion
 * @param {Event}
 */
export const validarNumEnTexto = (texto) => {
    const NUMEROS = new RegExp("^([^0-9]*)$")
    let noContNum = NUMEROS.test(texto)
    if(!noContNum) throw new ErrorNumeroEnString(501)
    if(noContNum) return texto
}
/** #### Funcion que valida si la fecha ya se encuentra en la BDD
 * @param {Event}
 */
export const validarDuplicado = async (datos) => {
    let data = cortarFecha(datos)
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarDuplicado(data))
    if(result.recordset[0]){
        throw new ErrorDuplicado(data, 501) 
    }else{
        return datos
    } 
}
/** #### Funcion que valida si la descripcion contiene dobles espacios
 * @param {Event}
 */
export const validarDobleEspacios = (datos) => {
    const ESPACIOS_INPUT = /([  ]{2,})/
    let cumpleCond = ESPACIOS_INPUT.test(datos)
    if(cumpleCond) throw new ErrorDobleEspacios(501)
    if(!cumpleCond) return datos
}
/** #### Funcion que valida si la descripcion contiene signos
 * @param {Event}
 */
export const validarCaracteresConSignos = (datos) => {
    const LETRAS_INPUT = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    //cumple condicion
    let cumple = LETRAS_INPUT.test(datos)
    if(!cumple) throw new ErrorSignos(501)
    if(cumple) return datos
}
/** #### Funcion que valida y compara las fechas de los usuarios con la fecha actual 
 * @param {Event}
 */
export const validarEpocaFecha = (datos) => {
    let fechaActual = generarFechaActual()
    let fechaActualConvert = convertirFechaLocaleDateString(fechaActual)
    let fechaActualFormat = formatFecha(fechaActualConvert)
    let dataUser = cortarFecha(datos)
    let esMayor = compararFechas(dataUser, fechaActualFormat)
    if(esMayor != true) throw new ErrorFechaAntigua(fechaAct, 501)
    if(esMayor == true) return datos
}
const generarFechaActual = () => {
    return new Date()
}
const convertirFechaLocaleDateString = (fecha) => {
    return fecha.toLocaleDateString()
}
/** #### Funcion que corta despues de los diez elementos una fecha
 * @param {Event}
 */
export const cortarFecha = (unaFecha) => {
    let fechaCortada = unaFecha.substring(0, 10)
        return fechaCortada
}
/** #### Formatea la fecha a un formato mas adecuado 
 * @param {Event}
 */
export const formatFecha = (fecha) => {
    let fechaMoment = moment(fecha)
    let fechaH = fechaMoment.format()
    fechaH = cortarFecha(fechaH)
    return fechaH
}
/** #### Compara si la fecha es anterior o igual a la fecha actual
 * @param {Event}
 */
export const compararFechas = (fechaUsuario, fechaHoy) => {
    let fechaValida = moment(new Date(fechaUsuario)).isAfter(new Date(fechaHoy))
    return fechaValida   
}
/** #### Valida si el cuerpo que resiven los servicios contienen elementos y sus valores 
 * @param {Event}
 */
export const validarBody = (info) => {
    if(Object.keys(info).length === 0){
        throw new ErrorBody(501)
    }
    return info
}