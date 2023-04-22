import { getConection, sql } from '#Config/db.js'
import { responderFront} from '#Helpers/helpers.js';
import { validarBody, validarVacio } from './../validations/validaciones.js'
import { emailEnUso, emailIncorrecto } from './../errors/usuarioErrors.js';
import { loginCreateRepositorio } from '#Helpers/loginCreateRepositories.js';
import { desencryptPass, encriptPass, generateAccessToken, validarGmail, crearToken, crearDatosUser, validarPass, validacionesGenericas} from './../validations/loginCreate.js';

export const servicioCrearCuenta = async(req, res) => {
    try{
        validarBody(req.body)
        const accessToken = await crearCuenta(req, res)
        await crearToken(res, accessToken)
    } catch(error) { 
        responderFront(res, error.codigoRes, error.message)
    }
}
export const crearCuenta = async(req, res) => {
    const {email, password} = req.body
    try{
        await validacionesGenericas(email, password)
        // verificacion si se encuentra el mail en la base de datos
        const result = await loginCreateRepositorio.checkMail(email)
        if(result.recordset[0]){
            throw new emailEnUso(501)
        }
        let pwd = await encriptPass(password)
        await loginCreateRepositorio.insertarUsuario(email, pwd)
        let user = await crearDatosUser(email, pwd)
        return generateAccessToken(user)
    }catch(error){
        throw error
    }
}
// INICIO DE SESION     
export const servicioInicioSesion = async(req, res) => {
    try{
        validarBody(req.body)
        const {email, password} = req.body
        const accessToken = await inicioSesion(email, password)
        await crearToken(res, accessToken)
    } catch (error) {
        responderFront(res, error.codigoRes, error.message)
    }
}
export const inicioSesion = async(emailUser, passwordUser) => {
    try{
         await validacionesGenericas(emailUser, passwordUser)
        const igual = await desencryptPass(emailUser, passwordUser)
        if(!igual) throw new emailIncorrecto(501)
        let user = await crearDatosUser(emailUser, passwordUser)
        return generateAccessToken(user)
    } catch(error) {
        throw error
    }
}
