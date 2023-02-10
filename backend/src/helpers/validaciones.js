import {verificarId, verificarDuplicado} from '#Database/querys.js'
import { getConection} from '#Config/db.js'
import {ErrorDuplicado, ErrorElementoVacio, ErrorTipo, ErrorFechaAntigua, ErrorSignos, ErrorBody, ErrorNumeroEnString, ErrorId, ErrorEspacios} from '#Helpers/erroresCustom.js'
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

export const validarCaracteres = (datos) => {
    const LETRAS_INPUT = new RegExp("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$");
    //cumple condicion
    let cumple = LETRAS_INPUT.test(datos)
    if(!cumple) throw new ErrorSignos(501)
    if(cumple) return datos
}

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

//!falta terminar 
export const validarEspacios = (datos) => {
    const VACIO_INPUT = new RegExp("")
    let cumpleCond = VACIO_INPUT.test(datos)
    if(cumpleCond) throw new ErrorEspacios(501)
    if(!cumpleCond) return datos
}









// export const validarCadaCaracter = (texto) => {
//     for(let i = 0; i < texto.length; i++){
//         let num = [1,2,3,4,5,6,7,8,9,0]
//             for(let l = 0; l<num.length; l++){
//                 if(texto[i] == num[l]){
//                     throw new ErrorNumeroEnString(501)
//                 }
//             }
            
//         }
//         return texto
//     }