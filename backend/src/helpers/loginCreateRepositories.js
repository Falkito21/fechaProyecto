import { ejecutarQuery } from "#Config/db.js"
import { crearUsuario, getId, verificarEmail, traerPassUser, deleteUsuario, verificarIdUser, getUsuario } from "#Database/usuarioQuerys.js"

export class loginCreateRepositorio{
    static checkMail = async (mail) => {
        try {
            return await ejecutarQuery(verificarEmail(mail))
        } catch (error) {
            throw error
        }
    }
    static traerPwd = async (email) => {
        try {
            let data = await ejecutarQuery(traerPassUser(email))
            return data
        } catch (error) {
            throw error
        }
    }
    static insertarUsuario = async (email, password) => {
        try {
            await ejecutarQuery(crearUsuario(email, password))
        } catch (error) {
            throw error
        }
    }
    static obtenerId = async (email) => {
        try {
            return await ejecutarQuery(getId(email))
        } catch (error) {
            throw error 
        }
    }
    static eliminarCuenta = async (id) =>  {
        try {
            return await ejecutarQuery(deleteUsuario(id))
        } catch (error) {
            throw  error
        }
    }
    static traerIdUser = async (id) => {
        try {
            return await ejecutarQuery(verificarIdUser(id)) 
        } catch (error) {
            throw error
        }
    }
    static traerUser = async(email) => {
        try {
            return await ejecutarQuery(getUsuario(email))
        } catch (error) {
            
        }
    }
}