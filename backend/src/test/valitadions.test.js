import {dateCompare, formatDate, bodyValidate, numberTextValidate, textSignsValidate, doubleSpacesValidate, eraDateValidate, idDateValidate, typeStringValidate, emptyValidate} from '#Validations/customGeneralValidations.js'
import { conSignos, contieneNum, correcto, dobleEspacios, noDescripcion, noFecha, soloNum, validarBodyVacio } from './validationsMock.js'

describe('Custom General Validations', () => {
    describe('Body validate', () => {
        test('Dont has body', () => {
            try {
                bodyValidate(validarBodyVacio)
            } catch (error) {
                expect(error.message)
                .toBe('El BODY no esta recibiendo informacion')
                expect(error.statusCode)
                .toBe(501)
            }
        })
    })
    describe('Empty validate', () => {
        test('Dont has description',() => {
            try {
                emptyValidate(noDescripcion.description, 'Fecha descripcion');
            } catch (error) {
                expect(error.message)
                .toBe('The value of Fecha descripcion is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Dont has a date', () => {
            try {
                emptyValidate(noFecha.date, 'date')
            } catch (error) {
                expect(error.message)
                .toBe('The value of date is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501) 
            }
        })
    })
        test('Has double spaces', () => {
            try {
                doubleSpacesValidate(dobleEspacios.description)
            } catch (error) {
                expect(error.message)
                .toBe('Two or more consecutive blank spaces are not allowed.')
                expect(error.statusCode)
                .toBe(501)
            }
            
        })
    describe('Number in text validate', () => {
        test('Description conatin numbers', () => {
            try {
                numberTextValidate(contieneNum.description)
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('The description text must not contain numbers.')
            }
        })
    })
    describe('Type string validate', () => {
        test('Description is not type string', () => {
            try {
                typeStringValidate(soloNum.description)
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('The description is not of text type.')
            }
        })
    })
    describe('Text sings validate', () => {
        test('Has sing in text', () => {
            try {
                textSignsValidate(conSignos)
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('The description can not containt symbols($%^&&)')
            }
        })
    })
    describe('Verificamos la funcion dateCompare', () => {
        test('Date after today', () => {
                let fechaHoy = new Date()
                , fechaUser = correcto.date
                dateCompare(fechaUser, fechaHoy)
                expect(dateCompare(fechaUser, fechaHoy))
                .toBe(true)
        })
        test('Date equal to today', () => {
                let fechaHoy = new Date() 
                fechaHoy = fechaHoy.toLocaleDateString()
                dateCompare(fechaHoy, fechaHoy)
                expect(dateCompare(fechaHoy, fechaHoy))
                .toBe(false)            
        })
        test('Date before today', () => {
            let fechaHoy = new Date()
            fechaHoy = fechaHoy.toLocaleDateString()
            let fechaAnt = '2018-05-14'
            dateCompare(fechaAnt, fechaHoy)
            expect(dateCompare(fechaAnt, fechaHoy))
            .toBe(false)
        })
    })
    describe('Format date', () => {
        test('Get correct format', ()=> {
            let fechaFormateada = formatDate('5-2-2022')
            expect(fechaFormateada)
            .toBe('2022/05/02')
        })
    })
    describe('Era date validate', () => {
        test('Date after today', () => {
            try {
                eraDateValidate(correcto.date)
                expect(eraDateValidate(correcto.date))
                .toBe(correcto.date)
            } catch (error) {
                throw error
            }
        })
        test('Date equal to today', () => {
            let fechaHoy = new Date()
            let fechaAct = formatDate(fechaHoy)
            try {
                eraDateValidate(fechaAct)
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('The date can not be less or equal to ' + fechaAct + '.')
            }
        })
        test('Date before today', () => {
            let fechaHoy = new Date()
            let fechaAct = formatDate(fechaHoy)
            let fechaUser = '2020-12-01'
            try {
                eraDateValidate(fechaUser)
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('The date can not be less or equal to ' + fechaAct + '.')
            }
        })
    })
    describe('Double spaces validate', () => {
        test('The date already exist', async () => {
            try {
                await doubleSpacesValidate('2033/04/10')
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('La fecha: 2033/04/10 YA existe.')
            }
        })
    })
    describe('Id date validate', () => {
        test('Id id undefined',async () => {
            try {
                await idDateValidate(correcto.id)
            } catch (error) {
                expect(error.message)
                .toBe('The value of id is incorrect or is empty.')
            }
        })
        test('Id dont exist', async () => {
            try {
                await idDateValidate(1)
            } catch (error) {
                expect(error.message)
                .toBe('The id: 1 doesnt exist.')
            }
        })
    })
})