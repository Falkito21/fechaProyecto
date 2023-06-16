import { responseFront} from '#Helpers/stateResponseFront.js';
import { bodyValidate, generalValidation} from '../validations/customGeneralValidations.js'
import { dateRepository } from '#Helpers/dateRepository.js';  
import { responseType } from '#Helpers/stateResponseFront.js';

export const displayDatesService = async (req, res) => {
    try{
        const {authorization} = req.headers
        if(!authorization) {
            throw error
        }
        let responseListDates  = await displayDates()
        responseFront(res, 200, responseListDates)
    }catch(error){
        responseType(res, error)
    }
}  
export const displayDates = async () => {
    try {
        const responseRepositoryDates = await dateRepository.getDates()
        return responseRepositoryDates.recordset
    } catch (error) {
        throw error
    }
}  
export const displayDateService = async (req, res) => {
    try {
        bodyValidate(req.body)
        let responseDate = await displayDate(req.body)
        responseFront(res, 200, responseDate)
    } catch (error) {
        responseType(res, error)
    }
}  
export const displayDate = async (data) => {
    try{
        let bodyDateId = data.FechaID
        await generalValidation(bodyDateId, false, false)
        const responseRepositoryDate = await dateRepository.getDate(bodyDateId)
        return responseRepositoryDate.recordset 
    }catch(error){  
        throw error
    }
}  
export const saveDateService = async (req, res) => {
    try {
        bodyValidate(req.body)
        await saveDate(req.body)
        responseFront(res, 200, 'Successfully save')
    } catch (error) {
        responseType(res, error)
    }
}  
export const saveDate = async (data) => {
    try {
        let dayDateBody = data.FechaDia
        let descriptionDateBody = data.FechaDescripcion
        await generalValidation(false, dayDateBody, descriptionDateBody, false)
        await dateRepository.saveDate(dayDateBody, descriptionDateBody)
    } catch (error) {
        throw error
    }
}  
export const modifyDateService = async (req, res) => {
    try{
        bodyValidate(req.body)
        await modifyDate(req.body)
        responseFront(res, 200, 'Successfully modify')
    }catch (error){
        responseType(res, error)
    }
}  
export const modifyDate = async (data) => {
    try {
        const {FechaID, FechaDia, FechaDescripcion} = data
        await generalValidation(FechaID, FechaDia, FechaDescripcion)
        await dateRepository.modifyDate(FechaID, FechaDia, FechaDescripcion)
    } catch (error) {
        throw error
    } 
}  
export const removeDateService = async (req, res) => {
    try {
        bodyValidate(req.body)
        await removeDate(req.body)
        responseFront(res, 200, 'Remove successfully') 
    } catch (error) {
        responseType(res, error)
    }
}
export const removeDate = async (data) => {
    try { 
        let idDate = data.FechaID
        await generalValidation(idDate, false, false)
        await dateRepository.removeDate(idDate)       
    } catch (error) {
        throw error
    }
}  
