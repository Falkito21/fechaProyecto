import { responseFront} from '#Helpers/stateResponseFront.js';
import { bodyValidate, createDataUser, desencryptPassword, generalUserValidations, generateAccessToken, idValidations, tokenCreate } from '#Validations/customGeneralValidations.js'
import { incorrectEmailError } from '#Errors/userErrors.js';
import { countRepository } from '#Helpers/countRepository.js';
import jwt_decode from 'jwt-decode'

export const createCountService = async(req, res) => {
    try{
        bodyValidate(req.body)
        const accessToken = await createCount(req, res)
        const payload = jwt_decode(accessToken)
        await tokenCreate(res, accessToken, payload)
    } catch(error) { validacionesGenericas
        responseFront(res, error.responseCode, error.message)
    }
}
const createCount = async(req, res) => {
    const {email, password} = req.body
    try{
        await (email, password)
        const result = await countRepository.checkMail(email)
        if(result.recordset[0]) throw new emailEnUso(501)
        let pwd = await encriptPass(password)
        await countRepository.insertUser(email, pwd)
        let user = await createDataUser(email)
        return await generateAccessToken(user)
    }catch(error){
        throw error
    }
}

// INICIO DE SESION     ########

export const loginService = async(req, res, next) => {
    try{
        bodyValidate(req.body)
        const {email, password} = req.body
        const accessToken = await login(email, password)
        const payload = jwt_decode(accessToken)
        await tokenCreate(res, accessToken, payload)
        next()
    } catch (error) {
        responseFront(res, error.responseCode, error.message)
    }
}
const login = async(emailUser, passwordUser) => {
    try{
         await generalUserValidations(emailUser, passwordUser)
        const igual = await desencryptPassword(emailUser, passwordUser)
        if(!igual) throw new incorrectEmailError(501)
        let userData = await createDataUser(emailUser)
        return generateAccessToken(userData)
    } catch(error) {
        console.log(error)
        throw error
    }
}

export const getUserService = async(req, res) => {
    const {email} = req.body
    try {
        return await getUser(email)
    } catch (error) {
        responseFront(res, error.responseCode, error.message)
    }
}
export const getUser = async(email) => {
    try {
        return await countRepository.getUser(email)
    } catch (error) {
        throw error
    }
} 
export const removeCountService = async(req, res) => {
    try {
        bodyValidate(req.body)
        const {id} = req.body
        await removeCount(id)
        responseFront(res, 200, 'User successfully deleted')
    } catch (error) {
        responseFront(res, error.responseCode, error.message)
    }
}
const removeCount = async(idUser) => {
    try {
        await idValidations(idUser)
        await countRepository.removeCount(idUser)
    } catch (error) {
        throw error
    }
}