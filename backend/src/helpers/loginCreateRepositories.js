import { ejecutarQuery } from "#Config/db.js"
import { crearUsuario, getId, verificarEmail } from "#Database/usuarioQuerys.js"

export class loginCreateRepositorio{
    static checkMail = async (mail) => {
        try {
            let result = await ejecutarQuery(verificarEmail(mail))
            return result
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
    static obtenerId = async (email, password) => {
        try {
            let result = await ejecutarQuery(getId(email, password))
            return result 
        } catch (error) {
            throw error 
        }
    }
}