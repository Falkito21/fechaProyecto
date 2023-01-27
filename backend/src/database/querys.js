import { validarTipoString, validarVacio } from '#Helpers/validaciones.js'

export const getFechas = () => {
    try{
        let query = ""
        query += "SELECT FechaID, FechaDescripcion,FechaDia"
        query += " FROM "
        query += " Fechas"
        return query
    }catch(err){
        console.log('Error en getFechas de la BDD', err);
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
        validarVacio(dia)
        validarVacio(descripcion)
        validarTipoString(descripcion)
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
    } catch (error) {
        console.log('Error en postFechas de la BDD: ', error)
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
    } catch (error) {
        console.log('Error en deleteFecha de la DBB: ', error)
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
    } catch (error) {
        console.error('Error en la putFecha ', error)
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
    } catch (error) {
        console.log('Error en validarId: ', error)
    }
}