import { getConection, sql } from '#Config/db.js'
import { responderFront} from '#Helpers/helpers.js';
import { validarBody } from './../validations/validaciones.js'
import { emailEnUso, emailIncorrecto } from './../errors/usuarioErrors.js';
import { loginCreateRepositorio } from '#Helpers/loginCreateRepositories.js';
import { desencryptPass, encriptPass, generateAccessToken } from './../validations/loginCreate.js';

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
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
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
        const {email, password} = req.body
        console.log('email', email)
        if(!email || !password) return res.sendStatus(400) 
        const accessToken = await inicioSesion(req, res)
        res.header('authorization', accessToken).json({
            message: 'Usuario Autenticado'
            ,token: accessToken
        })
    } catch (error) {
        responderFront(res, error.codigoRes, error.message)
    }
}
export const inicioSesion = async(req, res) => {
    const {email, password} = req.body
    try{
        const Igual = desencryptPass(password)
        let result = await loginCreateRepositorio.obtenerId(email, password)
        if(Igual) {
            if(!result.recordset[0]){
                throw new emailIncorrecto(501)
            }
        }    
        let id = result.recordset[0].id
        const user = {id : id}
        return generateAccessToken(user)
    } catch(error) {
        throw error
    }
}
