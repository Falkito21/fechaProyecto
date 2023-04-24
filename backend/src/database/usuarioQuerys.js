import {errorQuerys} from './../errors/erroresQuery.js'
import { validarVacio } from "./../validations/validaciones.js"

export const crearUsuario = (email, pass) => {
    try {
        let query = ""
        query += "INSERT INTO Usuarios"
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
        throw new errorQuerys('crearUsuario', 501)
    }
}

export const traerPassUser = (email) => {
    try {
        let query = ""
        query += "SELECT password "
        query += "FROM Usuarios "
        query += "WHERE email = '" + email + "';"
        return query
    } catch (error) {
        throw new errorQuerys('traerPassUser', 501)
    }
}

export const verificarEmail = (email) => {
    try {
        let query = ""
        query += "SELECT email FROM Usuarios "
        query += "WHERE email = "
        query += "'" + email + "';"
        return query
    } catch (error) {
        throw new errorQuerys('verificarEmail', 501)
    }
}

export const getUsuario = (email, pass) => {
    try {
        let query = ""
        query += "select FROM Usuarios WHERE email = "
        query += "'" + email +"' AND password = " 
        query += "'" + pass + "';"
        return query
    } catch (error) {
        throw new errorQuerys('getUsuario', 501)
    }
}
export const getId = (email) => {
    try {
        let query = ""
        query += "SELECT id from Usuarios WHERE email = "
        query += "'" + email +"';"
        return query
    } catch (error) {
        throw new errorQuerys('getId', 501)
    }
}
export const getUsuarios = () => {
    try {
        let query = ""
        query += 'SELECT gmail, pass from Usuarios'
        return query
    } catch (error) {
        throw new errorQuerys('getUsuarios', 501)
    }
}

export const deleteUsuario = (id) => {
    try {
        let query = ""
        query += "DELETE FROM Usuarios "
        query += "WHERE id = '" + id + "';"
        return query
    } catch (error) {
        throw new errorQuerys('deleteUsuario', 501)
    }
}

/** #### Consulta si verifica si hay un id determinado en la BDD
 * @param {Event}
 */  
export const verificarIdUser = (id) => {
    try {
        validarVacio(id, 'id en verificarId')
        let query = ""
        query += "SELECT id "
        query += "FROM Usuarios "
        query += "WHERE id = '" + id + "';"
        return query
    } catch (error) {
        throw new errorQuerys('verificarIdUser', 501)
    }
}