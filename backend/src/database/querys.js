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
        console.log('error en getFechas: ',err)
    }
}

export const getFecha = (id) => {
    try {
        validarVacio(id, 'id en getFecha')
        let query = ""
        query += "SELECT FechaID, FechaDescripcion,FechaDia "
        query += "FROM "
        query += "Fechas "
        query += "WHERE "
        query += "FechaID = "
        query += "'" + id +"'"
        return query
    } catch (err) {
        throw err
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
//Test listo 
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
        throw err
    }
}
// Test listo 
export const deleteFecha = (idFecha) => { 
    try {
        validarVacio(idFecha, 'id en idFecha')
        let query = ""
        query += "delete from Fechas"
        query += " where FechaID = "
        query += "'" + idFecha + "'"
        query += ";"
        return query
    } catch (err) {
        throw err
    }
}
//Test listo 
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

// Test listo 
export const putFecha = (id, dia, descripcion) => {
    try {
        validarVacio(id, 'id en putFecha')
        validarVacio(dia, 'dia en putFecha')
        validarVacio(descripcion, 'descripcion en putFecha')
        validarTipoString(descripcion)
        let query = ""
        query += "UPDATE Fechas"
        query += " SET"
        query += " FechaDia = '" + dia + "', "
        query += "FechaDescripcion = '" + descripcion +  "' "
        query += "WHERE fechaID = '" + id + "';"

        return query
    } catch (err) {
        throw err
    }
}
//test listo 
export const verificarId = (id) => {
    try {
        validarVacio(id, 'id en verificarId')
        let query = ""
        query += "SELECT FechaID "
        query += "FROM Fechas "
        query += "WHERE FechaID = '" + id + "';"

        return query
    } catch (err) {
        throw err
    }
}
//test listo
export const verificarDuplicado = (fecha) => {
    try{
        validarVacio(fecha, 'fecha en verificarDuplicado')
        let query = ""
        query += "SELECT FechaDia "
        query += "FROM Fechas "
        query += "WHERE FechaDia = '" + fecha + "';"
        
        return query
    }catch(err){
        throw err
    }
}
