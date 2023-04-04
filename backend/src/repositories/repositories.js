import { getConection, sql } from '#Config/db.js'
import { deleteFecha, getFecha, getFechas, postFechas, putFecha } from '#Database/querys.js'
import { verificarEmail } from '#Database/usuarioQuerys.js'

export class fechaRepositories{
    static traerFechas = async() => {
        const conexionBDD = await getConection()
        let permisoBDD = new sql.Transaction(conexionBDD)
        try {
            await permisoBDD.begin()
            let result = await conexionBDD.request().query(getFechas())
            await permisoBDD.commit()
            return result
        } catch (error) {
            await permisoBDD.rollback()
            throw error
        } finally {
            conexionBDD.close()
        }
    }
    static traerFecha = async(id) => {
        const conexionBDD = await getConection()
        let permisoBDD = new sql.Transaction(conexionBDD)
        try {
            await permisoBDD.begin()
            let result = await conexionBDD.request().query(getFecha(id))
            await permisoBDD.commit()
            return result
        } catch (error) {
            await permisoBDD.rollback()
            throw error
        } finally {
            conexionBDD.close()
        }
    }
    static guardarFechas = async (dia, descripcion) => {
        const conexionBDD = await getConection()
        let permisoBDD = new sql.Transaction(conexionBDD)
        try {
            await permisoBDD.begin()
            await conexionBDD.request().query(postFechas(dia, descripcion))
            await permisoBDD.commit()
        } catch (error) {
            await permisoBDD.rollback()
            throw error
        } finally {
            conexionBDD.close()
        }
    }
    static modificarFechas = async (id, dia, descripcion) => {
        const conexionBDD = await getConection()
        let permisoBDD = new sql.Transaction(conexionBDD)
        try {
            permisoBDD.begin()
            await conexionBDD.request().query(putFecha(id, dia, descripcion))
            await permisoBDD.commit()
        } catch (error) {
            await permisoBDD.rollback()
            throw error
        } finally {
            conexionBDD.close()
        }
    }
    static eliminarFecha = async (id) => {
        const conexionBDD = await getConection()
        let permisoBDD = new sql.Transaction(conexionBDD)
        try {
            permisoBDD.begin()
            await conexionBDD.request().query(deleteFecha(id))
            permisoBDD.commit()
        } catch (error) {
            permisoBDD.rollback()
            throw error
        }
    }
    
}