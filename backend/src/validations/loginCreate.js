import { loginCreateRepositorio } from "#Helpers/loginCreateRepositories.js";
import { encriptarPassword, formatoEmailIncorrecto, formatoPassIncorrecto, validarToken } from "./../errors/usuarioErrors.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { validarVacio } from "./validaciones.js";
import { ErrorId } from "./../errors/erroresCustom.js";

export const crearDatosUser = async(email) => {
    try {
        let result = await loginCreateRepositorio.traerUser(email)
        if(!result.recordset[0]) throw new emailIncorrecto(501)
        return result.recordset[0]
    } catch (error) {
        throw error
    }
}
export const crearToken = async (res, tokenUser, payload) => {
    try {
        return res.header('authorization', tokenUser)
        .header('X-Custom-Header', payload.dataUser.id)
        .header('email', payload.dataUser.email)
        .json({
            message: 'Usuario  Creado y autenticado'
            ,token: tokenUser
            ,payload: payload
        })
    } catch (error) {
        throw new crearToken(501)
    }
}
export const validarGmail = async (gmail) => {
    try {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let cumple = regex.test(gmail)
        if(!cumple) throw new formatoEmailIncorrecto(501)
        if(cumple) return gmail
    } catch (error) {
        throw error
    }
}
export const validarPass = async (pwd) => { 
    try{
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        let cumple = regex.test(pwd)
        if(!cumple) throw new formatoPassIncorrecto(501) 
        if(cumple) return pwd
    } catch(error) {
        throw error
    }
}
export const encriptPass = async (password) => {
    try {
        const saltos = await bcrypt.genSalt(10)
        const pwd = await bcrypt.hash(password, saltos)
        return pwd
    } catch (error) {
        throw new encriptarPassword(501)
    }
}
export const generateAccessToken = async(user) => {
    try {
        let tokenUser =  jwt.sign({dataUser: user}, process.env.TOKEN_SECRET, {expiresIn: '2h'})
        // await loginCreateRepositorio.insertarUserCompleto(user.id, tokenUser)
        return tokenUser 
    } catch (error) {
        throw new generateAccessToken(501)
    }
}
export const desencryptPass = async(email, password) => { 
    try {
        let data = await loginCreateRepositorio.traerPwd(email)
        let pwdBDD = data.recordset[0].password
        let pwdIgual = await bcrypt.compare(password, pwdBDD)
        return pwdIgual
    } catch (error) {
        throw error
    }
}
export const validateToken = (req, res, next) => {
    const accessToken = req.headers['authorization'] || req.query.accessToken
    try {
        if(!accessToken || accessToken === undefined) res.send('Access denied')
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
            if(err) {
                res.send('Access denied, token expired or incorrect')
            }else{
                next()
            }
        })
    } catch (error) {
        throw new validarToken(501)
    }
}

export const validacionesGenericas = async (emailUser, passwordUser) => {
    try {
        await validarVacio(emailUser, 'email')
        await validarVacio(passwordUser, 'password')
        await validarGmail(emailUser)
        await validarPass(passwordUser)
    } catch (error) {
        throw error
    }
}
export const validacionesId = async (idData) => {
    try {
        await validarVacio(idData, 'id')
        await validarIdUser(idData)
    } catch (error) {
        throw error
    }
}

/** #### Valida el id, si se encunetra en la base de datos retorna true 
 * @param {Event}
 */  
export const validarIdUser = async (datos) => {
    try {
        const result = await loginCreateRepositorio.traerIdUser(datos)
        if(!result.recordset[0]) throw new ErrorId(datos, 501)
        if(result.recordset[0].FechaID == datos) return true
    } catch (error) {
        throw error
    }
}

export const traerUserIdPorMail = async(datos) => {
    try {
        return await loginCreateRepositorio.obtenerId(datos)
    } catch (error) {
        throw error
    }
}
