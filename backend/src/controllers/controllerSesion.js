import { getConection, sql } from '#Config/db.js'
import { responderFront} from '#Helpers/helpers.js';
import { validarBody } from './../validations/validaciones.js'
import { emailEnUso, emailIncorrecto } from './../errors/usuarioErrors.js';
import { loginCreateRepositorio } from '#Helpers/loginCreateRepositories.js';
import { desencryptPass, encriptPass, generateAccessToken, validarSiExiste, validarGmail} from './../validations/loginCreate.js';

export const servicioCrearCuenta = async(req, res) => {
    try{
        validarBody(req.body)
        const accessToken = await crearCuenta(req, res)
        res.header('authorization', accessToken).json({
            message: 'Usuario  Creado y autenticado'
            ,token: accessToken
        })
    } catch(error) { 
        responderFront(res, error.codigoRes, error.message)
    }
}
export const crearCuenta = async(req, res) => {
    const {email, password} = req.body
    try{
        // verificacion si se encuentra el mail en la base de datos
        const result = await loginCreateRepositorio.checkMail(email)
        if(result.recordset[0]){
            throw new emailEnUso(501)
        }
        let pwd = await encriptPass(password)
                
        // verificacion general de si los usuario escribieron correctamente el mail y la contrasenia 
        await loginCreateRepositorio.insertarUsuario(email, pwd)
        const obtenerId = await loginCreateRepositorio.obtenerId(email, pwd)
        let id = obtenerId.recordset[0].id
        const user = {id: id}
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
        res.header('authorization', accessToken).json({
            message: 'Usuario Autenticado'
            ,token: accessToken
        })
    } catch (error) {
        responderFront(res, error.codigoRes, error.message)
    }
}
export const inicioSesion = async(emailUser, passwordUser) => {
    try{
        await validarGmail(emailUser) 
        const igual = await desencryptPass(emailUser, passwordUser)
        if(!igual) throw new emailIncorrecto(501)
        let result = await loginCreateRepositorio.obtenerId(emailUser, passwordUser)
        await validarSiExiste(result, igual)
        let id = result.recordset[0].id
        const user = {id : id}
        return generateAccessToken(user)
    } catch(error) {
        throw error
    }
}
