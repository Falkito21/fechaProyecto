import { queryError } from '#Errors/queryErrors.js'
import { emptyValidate } from '#Validations/customGeneralValidations.js'

export const userCreateQuery = (email, pass) => {
    try {
        let query = ""
        query += "INSERT INTO USERS"
        query += "("
        query += " email, "
        query += "password"
        query += ") "
        query += "VALUES "
        query += "("
        query += "'" + email + "', "
        query += "'" + pass + "'"
        query += ");"
        return query
    } catch (error) {
        throw new queryError('userCreateQuery', 501)
    }
}
export const userPasswordGetQuery = (email) => {
    try {
        let query = ""
        query += "SELECT password "
        query += "FROM USERS "
        query += "WHERE email = '" + email + "';"
        return query
    } catch (error) {
        throw new queryError('userPasswordGetQuery', 501)
    }
}
export const emailCheckQuery = (email) => {
    try {
        let query = ""
        query += "SELECT email FROM USERS "
        query += "WHERE email = "
        query += "'" + email + "';"
        return query
    } catch (error) {
        throw new queryError('emailCheckQuery', 501)
    }
}
export const idGetQuery = (email) => {
    try {
        let query = ""
        query += "SELECT id from USERS WHERE email = "
        query += "'" + email +"';"
        return query
    } catch (error) {
        throw new queryError('idGetQuery', 501)
    }
}
export const userGetQuery = (email) => {
    try {
        let query = ""
        query += "SELECT id, email " 
        query += "FROM USERS "
        query += "WHERE email = '" + email +"';"
        return query
    } catch (error) {
        throw new queryError('userGetQuery', 501)
    }
}
export const userRemoveQuery = (id) => {
    try {
        let query = ""
        query += "DELETE FROM USERS "
        query += "WHERE id = '" + id + "';"
        return query
    } catch (error) {
        throw new queryError('userRemoveQuery', 501)
    }
}
export const userIdCheckQuery = (id) => {
    try {
        emptyValidate(id, 'id in userIdCheckQuery')
        let query = ""
        query += "SELECT id "
        query += "FROM USERS "
        query += "WHERE id = '" + id + "';"
        return query
    } catch (error) {
        throw new queryError('userIdCheckQuery', 501)
    }
}
export const tokenSaveQuery = (idUser, tokenUser) => {
    try {
        emptyValidate(token, 'token in tokenSaveQuery')
        let query = ""
        query += "INSERT INTO "
        query += "(id, token) "
        query += "values " 
        query += "('" + idUser + "', '" + tokenUser + "')"
        return query
    } catch (error) {
        throw error
    }
}