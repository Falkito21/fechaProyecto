import { formatoEmailIncorrecto, formatoPassIncorrecto } from "./../errors/usuarioErrors.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const validarGmail = async (gmail) => {
    //No supere los límites permitidos (256 caracteres para la dirección completa y 64 caracteres 
    const regex = /^(?=.{1,256})(?=.{1,64}@)[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z]{2,})$/
    let cumple = regex.test(gmail)
    if(!cumple) throw new formatoEmailIncorrecto(501)
    if(cumple) return gmail
}
export const validarVacio = async (data) => {
    if(data === null || data === '' || data === undefined) throw new e
}
export const validarPass = async (pwd) => { 
    try{
    // Al menos 8 caracteres de longitud
    // Al menos una letra mayúscula
    // Al menos una letra minúscula
    // Al menos un número
    // Al menos un carácter especial 
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    let cumple = regex.test(pwd)
    if(!cumple) throw new formatoPassIncorrecto(501)
    if(cumple) return pwd
    } catch(error) {
        throw error
    }
}
export const encriptPass = async (password) => {
    const saltos = await bcrypt.genSalt(10)
    const pwd = await bcrypt.hash(password, saltos)
    return pwd
}

//generador de token's
export const generateAccessToken = (user) => {
    return jwt.sign(user, process.env.TOKEN_SECRET, {expiresIn: '6m'})
}

export const desencryptPass = async(password) => { 
    let hash = process.env.HASH_DESENCRYPT
    let pwdIgual = bcrypt.compare(password, hash)
    return pwdIgual
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