import {verificarId, verificarDuplicado} from '#Database/querys.js'
import { getConection} from './../config/db.js'
import { validaDatos } from './helpers.js'
import moment from 'moment'


export const validarId = async(datos) => {
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarId(datos))
    
    if(!result.recordset[0]) throw new Error('El id: ' + datos + ' no existe.')
    if(result.recordset[0].FechaID == datos) return true
}

export const validarVacio = async (datos, tipo) => {
    if(datos === '' || datos === null || datos === undefined){
        throw new Error('El valor de ' + tipo + ' es incorrecto o esta vacio.')
    }else{
        return datos
    }
}
export const validarTipoNumero = async (datos) => {
    if(typeof datos !== 'number'){
        throw new Error('El valor no es de tipo numerico.')
    }else{
     return datos
    }
}

export const validarTipoString = async (datos) => {
    if(typeof datos !== 'string'){
        throw new Error('El valor de la descripcion no es de tipo texto.')
    }else{
        return datos
    }
}

export const validarDuplicado = async (datos) => {
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarDuplicado(datos))
    if(result.recordset[0]){
        throw new Error('La fecha: ' + datos + ' YA existe.')
    }else{
        return datos
    } 
}
export const validarCaracteres = async (datos) => {
    const LETRAS_INPUT = new RegExp("^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$");
    let cumple = LETRAS_INPUT.test(datos)
    if(!cumple) throw new Error('La descripcion no puede contener signos($%^&&)')
    if(cumple) return datos
}

export const validarEpocaFecha = async (datos) => {
    let fechaAct = new Date()
    let fechaHoy = fechaAct.toLocaleDateString()
    fechaHoy = await formatFecha(fechaHoy)
    let esMayor = await compararFechas(datos, fechaHoy)
    
    console.log(esMayor)

    if(esMayor != true) throw new Error('La fecha no puede ser menor o igual a ' + fechaHoy)
    if(esMayor == true) return datos
}

export const formatFecha = async(fecha) => {
    let fechaHoy = moment(fecha, 'D/M/YYYY').format('YYYY/MM/DD')
    return fechaHoy
}

export const compararFechas = async (fechaUsuario, fechaHoy) => {
    
        let fechaValida = moment(fechaUsuario).isAfter(fechaHoy)
        console.log(fechaValida)
        return fechaValida   
}
