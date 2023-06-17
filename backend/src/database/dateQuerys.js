import { queryError } from '#Errors/queryErrors.js'
import { typeStringValidate, emptyValidate } from '#Validations/customGeneralValidations.js'

export const datesGetQuery = () => {
    try {
        let query = ""
        query += "SELECT FechaID,FechaDescripcion,FechaDia"
        query += " FROM "
        query += " Fechas"
        query += " ORDER BY"
        query += " FechaDia ASC"
        return query
    } catch (error) {
        throw new queryError('getFechas', 501)
    }
}

export const dateGetQuery = (id) => {
    try {
        emptyValidate(id, 'dateGetQuery')
        let query = ""
        query += "SELECT FechaID, FechaDescripcion,FechaDia "
        query += "FROM "
        query += "Fechas "
        query += "WHERE "
        query += "FechaID = "
        query += "'" + id + "'"
        return query
    } catch (error) {
        throw error
    }
}

export const dateSaveQuery = (day, description) => {
    try {
        emptyValidate(day, 'dateSaveQuery')
        emptyValidate(description, 'dateSaveQuery')
        typeStringValidate(description, 'dateSaveQuery')
        let query = ""
        query += "insert into Fechas"
        query += " ("
        query += " FechaDia,"
        query += " FechaDescripcion"
        query += ")"
        query += " VALUES"
        query += " ("
        query += "'" + day + "', "
        query += "'" + description + "'"
        query += ");"
        return query
    } catch (error) {
        throw error
    }
}

export const dateRemoveQuery = (idDate) => {
    try {
        emptyValidate(idDate, 'dateRemoveQuery')
        let query = ""
        query += "delete from Fechas"
        query += " where FechaID = "
        query += "'" + idDate + "'"
        query += ";"
        return query
    } catch (error) {
        throw error
    }
}
export const datesRemoveQuery = () => {
    try {
        let query = ""
        query += "DELETE "
        query += "FROM Fechas"
        query += ";"
        return query
    } catch (error) {
        throw new queryError('datesRemoveQuery', 501)
    }
}


export const dateModifyQuery = (id, day, description) => {
    try {
        emptyValidate(id, 'id')
        emptyValidate(day, 'date')
        emptyValidate(description, 'description')
        typeStringValidate(description)
        let query = ""
        query += "UPDATE Fechas"
        query += " SET"
        query += " FechaDia = '" + day + "', "
        query += "FechaDescripcion = '" + description + "' "
        query += "WHERE fechaID = '" + id + "';"
        return query
    } catch (error) {
        throw error
    }
}

export const idCheckQuery = (id) => {
    try {
        emptyValidate(id, 'id')
        let query = ""
        query += "SELECT FechaID "
        query += "FROM Fechas "
        query += "WHERE FechaID = '" + id + "';"
        return query
    } catch (error) {
        throw error
    }
}

export const duplicateCheckQuery = (date) => {
    try {
        emptyValidate(date, 'date')
        let query = ""
        query += "SELECT FechaDia "
        query += "FROM Fechas "
        query += "WHERE FechaDia = '" + date + "';"
        return query
    } catch (error) {
        throw error
    }
}