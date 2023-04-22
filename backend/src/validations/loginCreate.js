import { loginCreateRepositorio } from "#Helpers/loginCreateRepositories.js";
import { formatoEmailIncorrecto, formatoPassIncorrecto } from "./../errors/usuarioErrors.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { validarVacio } from "./validaciones.js";


export const crearDatosUser = async(email, password) => {
    let resultId = await loginCreateRepositorio.obtenerId(email, password)
    if(!resultId.recordset[0]){
        throw new emailIncorrecto(501)
    }
    let id = resultId.recordset[0].id
    let user
    return user = {id: id}
}


export const crearToken = async (res, tokenUser) => {
    return res.header('authorization', tokenUser).json({
        message: 'Usuario  Creado y autenticado'
        ,token: tokenUser
    })
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
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
        let cumple = regex.test(pwd)
        if(!cumple){
            throw new formatoPassIncorrecto(501)
        } 
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
        throw error
    }
}

//generador de token's
export const generateAccessToken = (user) => {
    try {
        return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '24h'})
    } catch (error) {
        throw error
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


//validador de token's  
export const validateToken = (req, res, next) => {
    const accessToken = req.headers['authorization'] || req.query.accessToken
    try {
        if(!accessToken || accessToken === undefined) {
            res.send('Access denied')
        }
        //verificamos el token que recibimos 
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
            if(err) {
                res.send('Access denied, token expired or incorrect')
            }else{
                next()
            }
        })
    } catch (error) {
        throw error
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
