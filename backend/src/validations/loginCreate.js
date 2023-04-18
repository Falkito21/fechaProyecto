import { loginCreateRepositorio } from "#Helpers/loginCreateRepositories.js";
import { formatoEmailIncorrecto, formatoPassIncorrecto } from "./../errors/usuarioErrors.js"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const validarGmail = async (gmail) => {
    //No supere los límites permitidos (256 caracteres para la dirección completa y 64 caracteres 
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
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
export const validarSiExiste = async (dato, infoPass) => {
    //si la pwd es true y el datos trae info
    try {
        if(infoPass) {
            if(!dato.recordset[0]){
                throw new emailIncorrecto(501)
            }
        }  
    } catch (error) {
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

export const desencryptPass = async(email, password) => { 
    let data = await loginCreateRepositorio.traerPwd(email)
    let pwdBDD = data.recordset[0].password
    let pwdIgual = await bcrypt.compare(password, pwdBDD)
    return pwdIgual
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