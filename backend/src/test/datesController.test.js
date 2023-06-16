import { formatDate} from "#Validations/customGeneralValidations.js"
import {removeDate, saveDate, modifyDate, displayDate, displayDates} from "#Controllers/dateController.js"
import { contieneNum, correcto, doubleSpaces, idMal, idString, idVacio, noFecha } from "./datesController.Mock.js"
import { conSignos, fechaMenor, noDescripcion, soloNum } from "./validationsMock.js"

// Mocks


describe('Date Controller', () => {
    
    describe('saveDate', () => {
        test('Description has double spaces', async() => {
            try {
                await saveDate(doubleSpaces)
            } catch (error) {
                expect(error.statusCode)
                .toBe(501)
                expect(error.message)
                .toBe('Two or more consecutive blank spaces are not allowed.')
            }
        })
        test('Day is wrong or empty', async() => {
            try {
                await saveDate(noFecha)
            } catch (error) {
                expect(error.message)
                .toBe('The value of date is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Description is wrong or empty', async() => {
            try {
                await saveDate(noDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('The value of description is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)            }
        })
        test('Date is less or equal to current date', async() => {
            let fecha = formatDate(new Date())
            try {
                await saveDate(fechaMenor)
            } catch (error) {
                expect(error.message)
                .toBe('The date can not be less or equal to '+ fecha + '.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Description is not type text', async () => {
            try {
                await saveDate(soloNum)
            } catch (error) {
                expect(error.message)
                .toBe('The description text must not contain numbers.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Description has signs', async () => {
            try {
                await saveDate(conSignos)
            } catch (error) {
                expect(error.message)
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Everything its OK', async() => {
            await saveDate(correcto)
            expect(200)
        })
        test('Duplicate date', async () => {
            let fecha = formatDate(correcto.FechaDia)
            try {
                    await saveDate(correcto)
            } catch (error) {
                expect(error.message)
                .toBe('The date: '+ fecha + ' already exists.')
            }
        })
       
    })
    describe('Display dates', () => {
        test('Get the dates', async () => {
            let data = await displayDates()
            let obj = data[0]
            expect(obj)
            .toHaveProperty('FechaID')
            expect(obj)
            .toBeDefined()
            expect(obj)
            .toHaveProperty('FechaDescripcion')
            expect(obj)
            .toBeDefined()
            expect(obj)
            .toHaveProperty('FechaDia')
            expect(obj)
            .toBeDefined()
        })
    })
    describe('Display Date', () => {
        test('Id is empty', async () => {
                try {
                    await displayDate(idVacio)
                } catch (error) {
                    expect(error.message)
                    .toBe('The value of id is incorrect or is empty.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Id is not numeric', async () => {
                try {
                    await displayDate(idString)
                } catch (error) {
                    expect(error.message)
                    .toBe('The id is not of number type.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('ID doesnt exist', async () => {
                try {
                    await displayDate(idMal)
                } catch (error) {
                    expect(error.message)
                    .toBe('The id: '+ idMal.FechaID + ' doesnt exist.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('ID exist', async () => {
                let info = await displayDates()

                let fechaId = info[0]
                let data = await displayDate(fechaId)
                expect(data[0].FechaID)
                .toBe(fechaId.FechaID)
                expect(data[0].FechaDescripcion)
                .toBe(fechaId.FechaDescripcion)
            })
    })
    describe('Modify date', () => {
            test('Description has double spaces', async () => {
                const dataBase = await displayDates()
                    correcto['FechaID'] = dataBase[0].FechaID
                    correcto.FechaDescripcion = doubleSpaces.FechaDescripcion
                try {
                    await modifyDate(correcto) 
                } catch (error) {
                    expect(error.message)
                    .toBe('Two or more consecutive blank spaces are not allowed.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Day is empty', async () => {
                const info = await displayDates()
                noFecha['FechaID'] = info[0].FechaID
                try {
                    await modifyDate(noFecha)  
                } catch (error) {
                    expect(error.message)
                    .toBe('The value of date is incorrect or is empty.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Description is empty', async () => {
                const info = await displayDates()
                noDescripcion['FechaID'] = info[0].FechaID
                try {
                    await modifyDate(noDescripcion)
                } catch (error) {
                    expect(error.message)
                    .toBe('The value of description is incorrect or is empty.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Id is not a number', async () => {
                correcto['FechaID'] = '432'
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('The id is not of number type.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Descripcion has numbers', async () => {
                const info = await displayDates()
                correcto['FechaID'] = info[0].FechaID
                correcto.FechaDescripcion = contieneNum.FechaDescripcion
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('The description text must not contain numbers.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Id doesnt exist', async () => {
                correcto['FechaID'] = 2
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('The id: ' + correcto.FechaID + ' doesnt exist.')
                    expect(error.statusCode)
                    .toBe(501)
                }
            })
            test('Old date', async () => {
                let fechaAct = new Date()
                let fechaHoy = formatDate(fechaAct)
                const info = await displayDates()
                correcto['FechaID'] = info[0].FechaID
                correcto.FechaDia = fechaMenor.FechaDia
                correcto.FechaDescripcion = 'fechass lskdjfa'
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('The date can not be less or equal to ' + fechaHoy + '.')
                    expect(error.statusCode)
                    .toBe(501)
                }                    
            })
    })
    describe('Remove date', () => {
        test('Id is empty', async () => {
            try {
                await removeDate(idVacio)
            } catch (error) {
                expect(error.message)
                .toBe('The value of id is incorrect or is empty.')
                expect(error.statusCode)
                .toBe(501)
            }                       
        })
        test('Id is not a number', async () =>{
            try {
                await removeDate(idString)
            } catch (error) {
                expect(error.message)
                .toBe('The id is not of number type.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Wrong id', async () => {
            let id = idMal.FechaID
            try {
                await removeDate(idMal)
            } catch (error) {
                expect(error.message)
                .toBe('The id: '+ id + ' doesnt exist.')
                expect(error.statusCode)
                .toBe(501)
            }
        })
        test('Id is OK', async () => {
            const info = await displayDates()
            const fechaEliminar = {
                FechaID: info[0].FechaID
            }
            await removeDate(fechaEliminar)
            expect(200)
        })
    })
})
