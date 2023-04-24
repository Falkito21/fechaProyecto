import { ejecutarQuery } from '#Config/db.js'
import { verificarDuplicado } from '#Database/querys.js'
import { deleteFecha, getFecha, getFechas, postFechas, putFecha, verificarId } from '#Database/querys.js'
import { verificarEmail } from '#Database/usuarioQuerys.js'

export class fechaRepositories{
    static traerFechas = async() => {
        try {
            let result = await ejecutarQuery(getFechas())
            return result
        } catch (error) {
            throw error
        }
    }
    static traerFecha = async(id) => {
        try {
            let result = await ejecutarQuery(getFecha(id))
            return result
        } catch (error) {
            throw error
        } 
    }
    static guardarFechas = async (dia, descripcion) => {
        try {
            await ejecutarQuery(postFechas(dia,descripcion))
        } catch (error) {
            await permisoBDD.rollback()
        } 
    }
    static modificarFechas = async (id, dia, descripcion) => {
        try {
            await ejecutarQuery(putFecha(id, dia, descripcion))
        } catch (error) {
            throw error
        } 
    }
    static eliminarFecha = async (id) => {
        try {
            await ejecutarQuery(deleteFecha(id))
        } catch (error) {
            throw error
        }
    }
    static traerIdFecha = async(id) => {
        try {
            return await ejecutarQuery(verificarId(id))
        } catch (error) {
            throw error
        }
    }
    static verificarDuplicado = async(fecha) => {
        try {
            return await ejecutarQuery(verificarDuplicado(fecha))
        } catch (error) {
            
        }
    }
    
}




