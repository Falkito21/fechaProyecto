
import dayjs from 'dayjs'
import { dateRepository } from '#Helpers/dateRepository.js'
import { bodyError, compareDatesError, doubleSpacesError, duplicateError, emptyElementError, formatDateError, idError, numInTextError, oldDateError, signsError, typeError } from '#Errors/dateErrors.js'

import { countRepository } from "#Helpers/countRepository.js";
import { createTokenError, encryptPasswordError, generateAccessTokenError, incorrectEmailFormatError, incorrectPasswordFormatError } from "#Errors/userErrors.js"
import { incorrectEmailError } from '#Errors/userErrors.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'


export const idDateValidate = async (data) => {
    try {
        const repositoryIdResponse = await dateRepository.idCheck(data)
        if(!repositoryIdResponse.recordset[0]) throw new idError(data, 501)
        return true
    } catch (error) {
        throw error
    }
}
export const emptyValidate = (data, type) => {
    try {
        if(data === '' || data === null || data === undefined || data === ' ') throw new emptyElementError(type, 501)
        return data
    } catch (error) {
        throw error
    }
}
export const typeNumValidate = (data) => {
    try {
        if(typeof data !== 'number') throw new typeError('The id', 'number', 501)
        return data
    } catch (error) {
        throw error
    }
} 
export const typeStringValidate = (data) => {
    try {
        if(typeof data !== 'string') throw new typeError('description', 'text', 501)
        return numberTextValidate(data)
    } catch (error) {
        throw error
    }
}
export const numberTextValidate = (text) => {
    try {
        const NUMBERS = new RegExp("^([^0-9]*)$")
        let NotContainNumbers = NUMBERS.test(text)
        if(NotContainNumbers) return text
        throw new numInTextError(501)
    } catch (error) {
        throw error
    }
}
export const duplicateValidate = async(data) => {
    try {
        data = formatDate(data)
        const result = await dateRepository.duplicateCheck(data)
        if(result.recordset[0]) throw new duplicateError(data, 501) 
        return data
    } catch (error) {
        throw error 
    }
}
export const doubleSpacesValidate = (data) => {
    try {
        const ESPACES_INPUT = /([  ]{2,})/
        let meetsCondition = ESPACES_INPUT.test(data)
        if(meetsCondition) throw new doubleSpacesError(501)
        return data
    } catch (error) {
        throw error
    }
}
export const textSignsValidate = (data) => {
    try {
        const LETRAS_INPUT = /^[ a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/;
        let meetsCondition = LETRAS_INPUT.test(data)
        if(!meetsCondition) throw new signsError(501)
        return data
    } catch (error) {
        throw error
    }
}
export const eraDateValidate = (data) => {
    try {
        let currentDate = new Date()
        let currentDateFormat = formatDate(currentDate)
        let dataUser = formatDate(data)
        let older = dateCompare(dataUser, currentDateFormat)
        if(!older) throw new oldDateError(currentDateFormat, 501)
         return data
    } catch (error) {
        throw error
    }
}
export const formatDate = (date) => {
    try {
        let dateFormat = dayjs(date).format('YYYY/MM/DD')
        return dateFormat
    } catch (error) {
        throw new formatDateError(501)
    }
}
export const dateCompare = (dateUser, todayDate) => {
    try {
        let dateOk = dayjs(dateUser).isAfter(dayjs(todayDate))
        return dateOk   
    } catch (error) {
        throw new compareDatesError(501)
    }
}
export const bodyValidate = (info) => {
    try {
        if(Object.keys(info).length === 0) throw new bodyError(501)
        return info
    } catch (error) {
        throw error
    }
}

export const generalValidation = async(id, date, description, avoidValidation = true) => {
    try {
        if (id !== false){
            await dateIdValidations(id)
        }
        if (description !== false){
            await dateDescriptionValidations(description)
        }
        if (date !== false){
            await dateValidations(date, avoidValidation)
        }
    } catch (error) {
        throw error
    }
}  
const dateIdValidations = async (id) => {
    try {
        emptyValidate(id, 'id')
        typeNumValidate(id)
        await idDateValidate(id)
    } catch (error) {
        throw error
    }
}  
const dateDescriptionValidations = async (description) => {
    try {
        doubleSpacesValidate(description)
        emptyValidate(description, 'description')
        numberTextValidate(description)
        typeStringValidate(description)
        textSignsValidate(description)
    } catch (error) {
        throw error
    }
}  
const dateValidations = async (date, avoidValidation) => {
    try {
        emptyValidate(date, 'date')
        eraDateValidate(date)
        if(!avoidValidation){
            await duplicateValidate(date)
        }
    } catch (error) {
        throw error
    }
}  
//USER VALIDATIONS

export const createDataUser = async(email) => {
    try {
        let responseRepository = await countRepository.getUserEmail(email)
        if(!responseRepository.recordset[0]) throw new incorrectEmailError(501)
        return responseRepository.recordset[0]
    } catch (error) {
        throw error
    }
}
export const tokenCreate = async (res, tokenUser, payload) => {
    try {
        return res.header('authorization', tokenUser)
        .header('X-Custom-Header', payload.dataUser.id)
        .header('email', payload.dataUser.email)
        .json({
            message: 'User created and authenticated successfully'
            ,token: tokenUser
            ,payload: payload
        })
    } catch (error) {
        throw new createTokenError(501)
    }
}
export const gmailValidate = async (email) => {
    try {
        const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
        let cumple = regex.test(email)
        if(!cumple) throw new incorrectEmailFormatError(501)
        return email
    } catch (error) {
        throw error
    }
}
export const passwordValidate = async (pwd) => { 
    try{
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])([A-Za-z\d$@$!%*?&]|[^ ]){8,15}$/
        let cumple = regex.test(pwd)
        if(!cumple) throw new incorrectPasswordFormatError(501) 
        return pwd
    } catch(error) {
        throw error
    }
}
export const encriptPassword = async (password) => {
    try {
        const saltos = await bcrypt.genSalt(10)
        return await bcrypt.hash(password, saltos)
    } catch (error) {
        throw new encryptPasswordError(501)
    }
}
export const generateAccessToken = async(user) => {
    try {
        return jwt.sign({dataUser: user}, process.env.TOKEN_SECRET, {expiresIn: '2h'})
        // await countRepository.insertarUserCompleto(user.id, tokenUser) 
    } catch (error) {
        throw new generateAccessTokenError(501)
    }
}
export const desencryptPassword = async(email, password) => { 
    try {
        let data = await countRepository.getPassword(email)
        let pwdBDD = data.recordset[0].password
        return await bcrypt.compare(password, pwdBDD)
    } catch (error) {
        throw error
    }
}
export const tokenValidate = (req, res, next) => {
    const accessToken = req.headers['authorization'] || req.query.accessToken
    try {
        if(!accessToken || accessToken === undefined) res.send('Access denied')
        jwt.verify(accessToken, process.env.TOKEN_SECRET, (err, user) => {
            if(err) {
                res.send('Access denied, token expired or incorrect')
            }
            next()
        })
    } catch (error) {
        throw error
    }
}
export const idValidations = async (idData) => {
    try {
        await emptyValidate(idData, 'id')
        await userIdValidation(idData)
    } catch (error) {
        throw error
    }
}
export const userIdValidation = async (datos) => {
    try {
        const responseIdRepository = await countRepository.getUserId(datos)
        if(!responseIdRepository.recordset[0]) throw new idError(datos, 501)
        return true
    } catch (error) {
        throw error
    }
}
export const getUserById = async(datos) => {
    try {
        return await countRepository.getId(datos)
    } catch (error) {
        throw error
    }
}
export const generalUserValidations = async (userEmail, userPassword) => {
    try {
        await emptyValidate(userEmail, 'email')
        await emptyValidate(userPassword, 'password')
        await gmailValidate(userEmail)
        await passwordValidate(userPassword)
    } catch (error) {
        throw error
    }
}

export const getUserByEmail = async(email) => {
    try {
        await gmailValidate(email)
        return await countRepository.getUserEmail(email)
    } catch (error) {
        throw error
    }
}