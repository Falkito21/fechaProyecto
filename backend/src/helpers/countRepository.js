import { executeQuery } from "#Config/db.js"
import { emailCheckQuery, userPasswordGetQuery, userCreateQuery, idGetQuery, userRemoveQuery, userIdCheckQuery, userGetQuery, tokenSaveQuery } from "#Database/userQuerys.js"

export class countRepository{
    static checkMail = async (mail) => {
        try {
            return await executeQuery(emailCheckQuery(mail))
        } catch (error) {
            throw error
        }
    }
    static getPassword = async (email) => {
        try {
            let data = await executeQuery(userPasswordGetQuery(email))
            return data
        } catch (error) {
            throw error
        }
    }
    static insertUser = async (email, password) => {
        try {
            await executeQuery(userCreateQuery(email, password))
        } catch (error) {
            throw error
        }
    }
    static getId = async (email) => {
        try {
            return await executeQuery(idGetQuery(email))
        } catch (error) {
            throw error 
        }
    }
    static removeCount = async (id) =>  {
        try {
            return await executeQuery(userRemoveQuery(id))
        } catch (error) {
            throw  error
        }
    }
    static getUserId = async (id) => {
        try {
            return await executeQuery(userIdCheckQuery(id)) 
        } catch (error) {
            throw error
        }
    }
    static getUser = async(email) => {
        try {
            return await executeQuery(userGetQuery(email))
        } catch (error) {
            throw error
        }
    }
    static insertUserToken = async(id, token) => {
        try {
            return await executeQuery(tokenSaveQuery(id, token))
        } catch (error) {
            throw error
        }
    }
}