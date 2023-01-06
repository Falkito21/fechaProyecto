// import {json} from 'express'
// import { query } from 'mssql'

import { responderFront} from '#Helpers/helpers.js';
import { getConection} from './../config/db.js'
//* para realizar una consulta post usaremos sql al lado de getConecction

// importamos las funciones querys 
import { deleteFecha, getFechas, postFechas, putFecha } from '#Database/querys.js'
// import { responderFront } from '#Helpers/helpers.js'

export const mostrarFechas = async (req, res) => {
    try{
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(getFechas())
        responderFront(res, result.recordset)
        console.log(result.recordset)
    }catch(err){
        console.log('Error al traer los datos: ', err);
        res.status(500)
        res.send(err.message)
    }
}


export const guardarFecha = async (req, res) => {
    try {
        let datos = req.body
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(postFechas(datos.FechaDia, datos.FechaDescription))
        responderFront(res, result.recordset)
    } catch (error) {
        console.log('Error en guardarFecha: ', error)
    }
}

export const modificarFecha = async (req, res) => {
    try{
        let datos = req.body
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(putFecha(datos.FechaID,datos.FechaDia, datos.FechaDescription))
        responderFront(res, result.recordset)
    }catch(error){
        console.error('Error al modificarFecha ', error)
    }
}

export const eliminarFecha = async (req, res) => {
    try {
        let datos = req.body
        console.log(datos)
        console.log(datos.FechaID)
        const conexionBDD = await getConection()
        const result = await conexionBDD.request().query(deleteFecha(datos.FechaID))
        responderFront(res, result.recordset)        
    } catch (error) {
        console.log('Error en eliminarFecha: ', error)
    }
}

