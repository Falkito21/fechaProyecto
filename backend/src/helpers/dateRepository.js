import { executeQuery } from '#Config/db.js'
import { duplicateCheckQuery } from '#Database/dateQuerys.js'
import { dateRemoveQuery, datesGetQuery, dateGetQuery, dateSaveQuery, dateModifyQuery, idCheckQuery } from '#Database/dateQuerys.js'

export class dateRepository{
    static getDates = async() => {
        try {
            let responseListQueryDates = await executeQuery(dateGetQuery())
            return responseListQueryDates
        } catch (error) {
            throw error
        }
    }
    static getDate = async(id) => {
        try {
            let responseQueryDate = await executeQuery(datesGetQuery(id))
            return responseQueryDate
        } catch (error) {
            throw error
        } 
    }
    static saveDate = async (day, descripcion) => {
        try {
            await executeQuery(dateSaveQuery(day,descripcion))
        } catch (error) {
            throw error
        } 
    }
    static modifyDate = async (id, day, description) => {
        try {
            await executeQuery(dateModifyQuery(id, day, description))
        } catch (error) {
             throw error
        } 
    }
    static removeDate = async (id) => {
        try {
            await executeQuery(dateRemoveQuery(id))
        } catch (error) {
            throw error
        }
    }
    static idCheck = async(id) => {
        try {
            return await executeQuery(idCheckQuery(id))
        } catch (error) {
            throw error
        }
    }
    static duplicateCheck = async(date) => {
        try {
            return await executeQuery(duplicateCheckQuery(date))
        } catch (error) {
            throw error 
        }
    }
    
}
