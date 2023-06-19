import { queryError } from '#Errors/queryErrors.js'
import { typeStringValidate, emptyValidate } from '#Validations/customGeneralValidations.js'

export const datesGetQuery = () => {
    try {
        let query = ""
        query += "SELECT id,description,date"
        query += " FROM "
        query += " DATES"
        query += " ORDER BY"
        query += " date ASC"
        return query
    } catch (error) {
        throw new queryError('datesGetQuery', 501)
    }
}

export const dateGetQuery = (id) => {
    try {
        emptyValidate(id, 'dateGetQuery')
        let query = ""
        query += "SELECT id, description,date "
        query += "FROM "
        query += "DATES "
        query += "WHERE "
        query += "id = "
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
        query += "insert into DATES"
        query += " ("
        query += " date,"
        query += " description"
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
        query += "delete from DATES"
        query += " where id = "
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
        query += "FROM DATES"
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
        query += "UPDATE DATES"
        query += " SET"
        query += " date = '" + day + "', "
        query += "description = '" + description + "' "
        query += "WHERE id = '" + id + "';"
        return query
    } catch (error) {
        throw error
    }
}

export const idCheckQuery = (id) => {
    try {
        emptyValidate(id, 'id')
        let query = ""
        query += "SELECT id "
        query += "FROM DATES "
        query += "WHERE id = '" + id + "';"
        return query
    } catch (error) {
        throw error
    }
}

export const duplicateCheckQuery = (date) => {
    try {
        emptyValidate(date, 'date')
        let query = ""
        query += "SELECT date "
        query += "FROM DATES "
        query += "WHERE date = '" + date + "';"
        return query
    } catch (error) {
        throw error
    }
}