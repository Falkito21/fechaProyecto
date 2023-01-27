import {verificarId} from '#Database/querys.js'
import { getConection} from './../config/db.js'

export const validarId = async(datos) => {
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(verificarId(datos))
    
    if(!result.recordset[0]) throw new Error('El id: ' + datos + ' no existe')
    if(result.recordset[0].FechaID == datos) return true
}

export const validarVacio = async (datos, tipo) => {
if(datos === '' || datos === null){
    throw new Error('El valor de ' + tipo + ' es incorrecto o esta vacio')
}else{
    return datos
}
}
export const validarTipoNumero = async (datos) => {
if(typeof datos !== 'number'){
    throw new Error('El valor no es de tipo numerico: ')
}else{
    return datos
}
}

export const validarTipoString = async(datos) => {
if(typeof datos !== 'string'){
    throw new Error('El valor de la descripcion no es de tipo texto')
}else{
    return datos
}
}