import { formatDate} from "#Validations/customGeneralValidations.js"
import {removeDate, saveDate, modifyDate, displayDate, displayDates} from "#Controllers/dateController.js"
import { contieneNum, correcto, dobleEspacios, idMal, idString, idVacio, noFecha } from "./dateController.Mock.js"
import { conSignos, fechaMenor, noDescripcion, soloNum } from "./validationsMock.js"

// Mocks


describe('Testeo del FUNCIONAMIENTO de las funciones del CONTROLLER', () => {
    
    describe('Verificamos la funcion saveDate', () => {
        test('Caso en el cual la descripcion tiene doble espacios', async() => {
            try {
                await saveDate(dobleEspacios)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('No se permiten dos o mas espacios en blanco juntos')
            }
        })
        test('Caso en el cual el dia esta mal o vacia', async() => {
            try {
                await saveDate(noFecha)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de el dia es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion esta mal o vacia', async() => {
            try {
                await saveDate(noDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de la descripcion es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)            }
        })
        test('Caso en el cual la fecha es menor a la fecha del dia actual', async() => {
            let fecha = formatFecha(new Date())
            try {
                await saveDate(fechaMenor)
            } catch (error) {
                expect(error.message)
                .toBe('La fecha no puede ser menor o igual a '+ fecha)
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion no es de tipo texto', async () => {
            try {
                await saveDate(soloNum)
            } catch (error) {
                expect(error.message)
                .toBe('El texto de la descripcion no debe contener numeros')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion contiene signos', async () => {
            try {
                await saveDate(conSignos)
            } catch (error) {
                expect(error.message)
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual esta todo OK', async() => {
            await saveDate(correcto)
            expect(200)
        })
        test('Caso en el cual la fecha esta duplicada', async () => {
            let fecha = formatFecha(correcto.FechaDia)
            try {
                    await saveDate(correcto)
            } catch (error) {
                expect(error.message)
                .toBe('La fecha: '+ fecha + ' YA existe.')
            }
            //tiene sentido enviar una fecha que esta ok?
            //si es asi como hago para que cada vez que hago un test me cambie la fecha??
        })
       
    })
    describe('Verificamos la funcion displayDates', () => {
        test('Unico caso en el cual trae los datos', async () => {
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
    describe('Verificamos la funcion displayDate', () => {
        test('Caso en el que el ID esta vacio', async () => {
                try {
                    await displayDate(idVacio)
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de id es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no es de tipo numerico', async () => {
                try {
                    await displayDate(idString)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id no es de tipo numero.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no exista', async () => {
                // let id = displayDateIdNoExist.FechaID
                try {
                    await displayDate(idMal)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id: ' + idMal.FechaID + ' no existe.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID si existe', async () => {
                let info = await displayDates()

                let fechaId = info[0]
                let data = await displayDate(fechaId)
                expect(data[0].FechaID)
                .toBe(fechaId.FechaID)
                expect(data[0].FechaDescripcion)
                .toBe(fechaId.FechaDescripcion)
            })
    })
    describe('Verificamos la funcion modifyDate', () => {
            test('Caso en el cual la descripcion de la fecha contenga doble espacios', async () => {
                const dataBase = await displayDates()
                    correcto['FechaID'] = dataBase[0].FechaID
                    correcto.FechaDescripcion = dobleEspacios.FechaDescripcion
                try {
                    await modifyDate(correcto) 
                } catch (error) {
                    expect(error.message)
                    .toBe('No se permiten dos o mas espacios en blanco juntos')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el dia esta vacio', async () => {
                const info = await displayDates()
                noFecha['FechaID'] = info[0].FechaID
                try {
                    await modifyDate(noFecha)  
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de el dia es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual la descripcion esta vacia', async () => {
                const info = await displayDates()
                noDescripcion['FechaID'] = info[0].FechaID
                try {
                    await modifyDate(noDescripcion)
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de la descripcion es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no es numerico', async () => {
                correcto['FechaID'] = '432'
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id no es de tipo numero.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual la descripcion contiene numeros', async () => {
                const info = await displayDates()
                correcto['FechaID'] = info[0].FechaID
                correcto.FechaDescripcion = contieneNum.FechaDescripcion
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('El texto de la descripcion no debe contener numeros')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no exista', async () => {
                correcto['FechaID'] = 2
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id: ' + correcto.FechaID + ' no existe.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el el cual la fecha es antigua', async () => {
                let fechaAct = new Date()
                let fechaHoy = formatFecha(fechaAct)
                const info = await displayDates()
                correcto['FechaID'] = info[0].FechaID
                correcto.FechaDia = fechaMenor.FechaDia
                correcto.FechaDescripcion = 'fechass lskdjfa'
                try {
                    await modifyDate(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('La fecha no puede ser menor o igual a ' + fechaHoy)
                    expect(error.codigoRes)
                    .toBe(501)
                }                    
            })
    })
    describe('Verificamos la funcion removeDate', () => {
        test('Caso en el cual el ID esta vacio', async () => {
            try {
                await removeDate(idVacio)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }                       
        })
        test('Caso de que el ID no sea numerico', async () =>{
            try {
                await removeDate(idString)
            } catch (error) {
                expect(error.message)
                .toBe('El id no es de tipo numero.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual el ID es incorrecto', async () => {
            let id = idMal.FechaID
            try {
                await removeDate(idMal)
            } catch (error) {
                expect(error.message)
                .toBe('El id: ' + id + ' no existe.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual es ID esta OK', async () => {
            const info = await displayDates()
            const fechaEliminar = {
                FechaID: info[0].FechaID
            }
            await removeDate(fechaEliminar)
            expect(200)
        })
    })
})
