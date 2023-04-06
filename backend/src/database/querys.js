import { validarTipoString, validarVacio } from './../validations/validaciones.js'
/** #### Consulta que trae todas las fechas de la BDD
 * @param {Event}
 */  
export const getFechas = () => {
    try{
        let query = ""
        query += "SELECT FechaID,FechaDescripcion,FechaDia"
        query += " FROM "
        query += " Fechas"
        return query
    }catch(error){
        throw error
    }
}
/** #### Consulta que trae una fecha determinada de la BDD
 * @param {Event}
 */  
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
    } catch (error) {
        throw error
    }
}
/** #### Consulta que almacena los datos en la BDD
 * @param {Event}
 */  
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
    } catch (error) {
        throw error
    }
}
/** #### Consulta que elimina los datos de la BDD
 * @param {Event}
 */  
export const deleteFecha = (idFecha) => { 
    try {
        validarVacio(idFecha, 'id en idFecha')
        let query = ""
        query += "delete from Fechas"
        query += " where FechaID = "
        query += "'" + idFecha + "'"
        query += ";"
        return query
    } catch (error) {
        throw error
    }
}
/** #### Consulta que elimina todas las fechas de la, uso escaso (necesario en el test)
* @param {Event}
 */  
export const deleteFechas = () => {
    try {
        let query = ""
        query += "DELETE "
        query += "FROM Fechas"
        query += ";"
        return query
    } catch (error) {
        throw error
    }
}

/** #### Consulta que modifica los datos de la BDD
 * @param {Event}
 */  
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
    } catch (error) {
        throw error
    }
}
/** #### Consulta si verifica si hay un id determinado en la BDD
 * @param {Event}
 */  
export const verificarId = (id) => {
    try {
        validarVacio(id, 'id en verificarId')
        let query = ""
        query += "SELECT FechaID "
        query += "FROM Fechas "
        query += "WHERE FechaID = '" + id + "';"
        return query
    } catch (error) {
        throw error
    }
}
/** #### Consulta que trae un datos, si es que existe en la BDD
 * @param {Event}
 */  
export const verificarDuplicado = (fecha) => {
    try{
        validarVacio(fecha, 'fecha en verificarDuplicado')
        let query = ""
        query += "SELECT FechaDia "
        query += "FROM Fechas "
        query += "WHERE FechaDia = '" + fecha + "';"
        return query
    }catch(error){
        throw error
    }
}