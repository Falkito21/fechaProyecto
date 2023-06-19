import { responseFront} from '#Helpers/stateResponseFront.js';
import { bodyValidate, createDataUser, desencryptPassword, emptyValidate, encriptPassword, generalUserValidations, generateAccessToken, gmailValidate, idValidations, passwordValidate, tokenCreate } from '#Validations/customGeneralValidations.js'
import { emailInUseError, emptyElementError, incorrectEmailError } from '#Errors/userErrors.js';
import { countRepository } from '#Helpers/countRepository.js';
import jwt_decode from 'jwt-decode'

export const createCountService = async(req, res) => {
    try{
        bodyValidate(req.body)
        const accessToken = await createCount(req, res)
        const payload = jwt_decode(accessToken)
        await tokenCreate(res, accessToken, payload)
    } catch(error) { 
        responseFront(res, error.statusCode, error.message)
    }
}
const createCount = async(req, res) => {
    const {email, password} = req.body
    try{        
        await emptyValidate(email,'email')
        await emptyValidate(password, 'password')
        await gmailValidate(email)
        const responseRepositoryCountEmail = await countRepository.checkMail(email)
        if(responseRepositoryCountEmail.recordset[0]) throw new emailInUseError(501)
        await passwordValidate(password)
        let pwd = await encriptPassword(password)
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
        responseFront(res, error.statusCode, error.message)
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
        throw error
    }
}

export const getUserService = async(req, res) => {
    const {email} = req.body
    try {
        return await getUser(email)
    } catch (error) {
        responseFront(res, error.statusCode, error.message)
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
        responseFront(res, error.statusCode, error.message)
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