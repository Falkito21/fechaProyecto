import { getConection, sql } from '#Config/db.js'
import { responderFront} from '#Helpers/helpers.js';
import {crearUsuario, getId, getUsuario, getUsuarios, verificarEmail} from '#Database/usuarioQuerys.js'
import { validarBody } from '#Helpers/validaciones.js'
import { tipoRespuesta } from './controller.js'
import { emailEnUso, emailIncorrecto } from './../errors/usuarioErrors.js';
import jwt from 'jsonwebtoken'

export const servicioCrearCuenta = async(req, res) => {
    try{
        validarBody(req.body)
        await crearCuenta(req, res)
    } catch(error) { 
        responderFront(res, error.codigoRes, error.message)
    }
}
export const crearCuenta = async(req, res) => {
    const {email, password} = req.body
    const conexionBDD = await getConection()
    let permisoBDD = new sql.Transaction(conexionBDD)
    try{
        await permisoBDD.begin()
        // verificacion si se encuentra el mail en la base de datos
        const result = await conexionBDD.request().query(verificarEmail(email))

        if(result.recordset[0]){
            throw new emailEnUso(501)
        }
        // verificacion general de si los usuario escribieron correctamente el mail y la contrasenia 
        await conexionBDD.request().query(crearUsuario(email, password))

        const obtenerId = await conexionBDD.request().query(getId(email, password))
        let id = obtenerId.recordset[0].id
        const user = {id: id}
        const accessToken = generateAccessToken(user)
        res.header('authorization', accessToken).json({
            message: 'Usuario  Creado y autenticado'
            ,token: accessToken
        })
        await permisoBDD.commit()
    }catch(error){
        await permisoBDD.rollback()
        throw error
    } finally{
        await conexionBDD.close()
    }
}

// INICIO DE SESION     

export const servicioInicioSesion = async(req, res) => {
    try{
        const {email, password} = req.body
        if(!email || !password) return res.sendStatus(400)  
        await inicioSesion(req, res)
    } catch (error) {
        responderFront(res, error.codigoRes, error.message)
    }
}
export const inicioSesion = async(req, res) => {
    const {email, password} = req.body
    const conexionBDD = await getConection()
    const result = await conexionBDD.request().query(getId(email, password))
    
    try{
        if(!result.recordset[0]){
            throw new emailIncorrecto(501)
        }    

        let id = result.recordset[0].id
        const user = {id : id}
        const accessToken = generateAccessToken(user)
        res.header('authorization', accessToken).json({
            message: 'Usuario Autenticado'
            ,token: accessToken
        })
    } catch(error) {
        throw error
    }
}

//generador de token's
const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '6m'})
}

//validador de token's  
export const validateToken = (req, res, next) => {
    const accessToken = req.headers['authorization'] || req.query.accessToken
    if(!accessToken) res.send('Access denied')

    //verificamos el token que recibimos 
    jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
        if(err) {
            res.send('Access denied, token expired or incorrect')
        }else{
            next()
        }
    })
}
