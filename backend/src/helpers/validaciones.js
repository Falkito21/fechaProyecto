import {verificarId, verificarDuplicado} from '#Database/querys.js'
import { getConection} from '#Config/db.js'
import {ErrorDuplicado, ErrorElementoVacio, ErrorTipo, ErrorFechaAntigua, ErrorSignos, ErrorBody, ErrorNumeroEnString, ErrorId, ErrorDobleEspacios} from '#Helpers/erroresCustom.js'
import moment from 'moment'

export const validarId = async (datos) => {
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarId(datos))

    if(!result.recordset[0]) throw new ErrorId(datos, 501)
    if(result.recordset[0].FechaID == datos) return true
}

export const validarVacio = (datos, tipo) => {
    if(datos === '' || datos === null || datos === undefined || datos === ' '){
        throw new ErrorElementoVacio(tipo, 501)
    }else{
        return datos
    }
}
export const validarTipoNumero = (datos) => {
    if(typeof datos !== 'number'){
        throw new ErrorTipo('La fecha', 'numero', 501)
    }else{
     return datos
    }
}

export const validarTipoString = (datos) => {
    if(typeof datos !== 'string'){
        throw new ErrorTipo('La descripcion', 'texto', 501)
    }else{
        let verificarTexto = validarCadaCaracter(datos)
        return verificarTexto
    }
}

export const validarCadaCaracter = (texto) => {
    const NUMEROS = new RegExp("^([^0-9]*)$")
    let noContNum = NUMEROS.test(texto)
    if(!noContNum) throw new ErrorNumeroEnString(501)
    if(noContNum) return texto
}


export const validarDuplicado = async (datos) => {
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarDuplicado(datos))
    if(result.recordset[0]){
        throw new ErrorDuplicado(datos, 501)
    }else{
        return datos
    } 
}
//si hay dos espacios juntos te devuelve verdadero
export const validarDobleEspacios = (datos) => {
    const ESPACIOS_INPUT = /^[ ]+[ ]+$/
    let cumpleCond = ESPACIOS_INPUT.test(datos)
    if(cumpleCond) throw new ErrorDobleEspacios(501)
    if(!cumpleCond) return datos
}

export const validarCaracteres = (datos) => {
    const LETRAS_INPUT = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
    //cumple condicion
    let cumple = LETRAS_INPUT.test(datos)
    if(!cumple) throw new ErrorSignos(501)
    if(cumple) return datos
}
//Utilizar libreria para validar formato fecha

export const validarEpocaFecha = (datos) => {
    let fechaAct = new Date()
    let fechaHoy = fechaAct.toLocaleDateString()
    fechaHoy = formatFecha(fechaHoy)
    let esMayor = compararFechas(datos, fechaHoy)
    
    if(esMayor != true) throw new ErrorFechaAntigua(fechaHoy, 501)
    if(esMayor == true) return datos
}

export const formatFecha = (fecha) => {
    let fechaHoy = moment(fecha, 'D/M/YYYY').format('YYYY/MM/DD')
    return fechaHoy
}

export const compararFechas = (fechaUsuario, fechaHoy) => {
    let fechaValida = moment(fechaUsuario).isAfter(fechaHoy)
    return fechaValida   
}

export const validarBody = (info) => {
    if(Object.keys(info).length === 0){
        throw new ErrorBody(501)
    }
    return info
}



