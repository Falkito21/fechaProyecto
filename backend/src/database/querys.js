import { ErrorQuerys } from '#Helpers/erroresCustom.js'
import { validarTipoString, validarVacio } from '#Helpers/validaciones.js'

export const getFechas = () => {
    try{
        let query = ""
        query += "SELECT FechaID, FechaDescripcion,FechaDia"
        query += " FROM "
        query += " Fechas"
        return query
    }catch(err){
        console.log(err.statusCode)
        throw new ErrorQuerys('getFechas')
    }
}

export const getFecha = (id) => {
    try {
        validarVacio(id)
        let query = ""
        query += "SELECT FechaID, FechaDescripcion,FechaDia "
        query += "FROM "
        query += "Fechas "
        query += "WHERE "
        query += "FechaID = "
        query += "'" + id +"'"
        return query
    } catch (err) {
        console.log('Error en getFecha: ', err)
    }
}

export const getEncontrar = (fecha) => {
    try{
        validarVacio(fecha)
        let query = ""
        query += "SELECT FechaDia "
        query += "FROM "
        query += "Fechas "
        query += "WHERE "
        query += "CONVERT( "
        query += "varchar, "
        query += "FechaDia, "
        query += "112) "
        query += "= '" + fecha + "'"
        return query
    }catch(err){
        console.log('Error en getSoloFecha de la BDD', err)
    }
}

export const postFechas = (dia, descripcion) => {
    try {
        validarVacio(dia, 'postFechas')
        validarVacio(descripcion, 'postFechas')
        validarTipoString(descripcion, 'postFechas')

        let query = ""
        query += "insert into Fechas"
        query += " ("
        query += " FechaDia,"
        query += " FechaDescripcion"
        query += ")"
        query += " VALUES"
        query += " ("
        query += "'" + dia + "', "
        query += "'" + descripcion + "'"
        query += ");"

        return query
    } catch (err) {
        console.log('Error en postFechas de la BDD: ', err)
    }
}

export const deleteFecha = (idFecha) => { 
    try {
        validarVacio(idFecha)
        let query = ""
        query += "delete from Fechas"
        query += " where FechaID = "
        query += "'" + idFecha + "'"
        query += ";"
        return query
    } catch (err) {
        console.log('Error en deleteFecha de la DBB: ', err)
    }
}

export const deleteFechas = () => {
    try {
        let query = ""
        query += "DELETE "
        query += "FROM Fechas"
        query += ";"
        return query
    } catch (err) {
        console.log('Error en deleteFechas de la DBB: ', err)
    }
}


export const putFecha = (id, dia, descripcion) => {
    try {
        validarVacio(id)
        validarVacio(dia)
        validarVacio(descripcion)
        validarTipoString(descripcion)
        let query = ""
        query += "UPDATE Fechas"
        query += " SET"
        query += " FechaDia = '" + dia + "', "
        query += "FechaDescripcion = '" + descripcion +  "' "
        query += "WHERE fechaID = '" + id + "';"

        return query
    } catch (err) {
        console.err('Error en la putFecha ', err)
    }
}

export const verificarId = (id) => {
    try {
        validarVacio(id)
        let query = ""
        query += "SELECT FechaID "
        query += "FROM Fechas "
        query += "WHERE FechaID = '" + id + "';"

        return query
    } catch (err) {
        console.log('Error en validarId: ', err)
    }
}

export const verificarDuplicado = (fecha) => {
    try{
        validarVacio(fecha)
        let query = ""
        query += "SELECT FechaDia "
        query += "FROM Fechas "
        query += "WHERE FechaDia = '" + fecha + "';"
        
        return query
    }catch(err){
        console.log('Error en validarDuplicado: ', err)
    }
}
