//Funciones del validador
import { formatFecha} from "./../validations/validaciones.js"
//Funciones del controlador
import {eliminarFecha, guardarFecha, modificarFecha, mostrarFecha, mostrarFechas} from "../controllers/controller.js"
import { contieneNum, correcto, dobleEspacios, idMal, idString, idVacio, noFecha } from "./controllerMock.js"
import { conSignos, fechaMenor, noDescripcion, soloNum } from "./validacionesMock.js"

// Mocks


describe('Testeo del FUNCIONAMIENTO de las funciones del CONTROLLER', () => {
    
    describe('Verificamos la funcion guardarFecha', () => {
        test('Caso en el cual la descripcion tiene doble espacios', async() => {
            try {
                await guardarFecha(dobleEspacios)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('No se permiten dos o mas espacios en blanco juntos')
            }
        })
        test('Caso en el cual el dia esta mal o vacia', async() => {
            try {
                await guardarFecha(noFecha)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de el dia es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion esta mal o vacia', async() => {
            try {
                await guardarFecha(noDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de la descripcion es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)            }
        })
        test('Caso en el cual la fecha es menor a la fecha del dia actual', async() => {
            let fecha = formatFecha(new Date().toLocaleString())
            try {
                await guardarFecha(fechaMenor)
            } catch (error) {
                expect(error.message)
                .toBe('La fecha no puede ser menor o igual a '+ fecha)
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion no es de tipo texto', async () => {
            try {
                await guardarFecha(soloNum)
            } catch (error) {
                expect(error.message)
                .toBe('El texto de la descripcion no debe contener numeros')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion contiene signos', async () => {
            try {
                await guardarFecha(conSignos)
            } catch (error) {
                expect(error.message)
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual esta todo OK', async() => {
            await guardarFecha(correcto)
            expect(200)
        })
        test('Caso en el cual la fecha esta duplicada', async () => {
            try {
                    await guardarFecha(correcto)
            } catch (error) {
                expect(error.message)
                .toBe('La fecha: '+ correcto.FechaDia + ' YA existe.')
            }
            //tiene sentido enviar una fecha que esta ok?
            //si es asi como hago para que cada vez que hago un test me cambie la fecha??
        })
       
    })
    describe('Verificamos la funcion mostrarFechas', () => {
        test('Unico caso en el cual trae los datos', async () => {
            let data = await mostrarFechas()
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
    describe('Verificamos la funcion mostrarFecha', () => {
        test('Caso en el que el ID esta vacio', async () => {
                try {
                    await mostrarFecha(idVacio)
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de id es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no es de tipo numerico', async () => {
                try {
                    await mostrarFecha(idString)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id no es de tipo numero.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no exista', async () => {
                // let id = mostrarFechaIdNoExist.FechaID
                try {
                    await mostrarFecha(idMal)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id: ' + idMal.FechaID + ' no existe.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID si existe', async () => {
                let info = await mostrarFechas()

                let fechaId = info[0]
                let data = await mostrarFecha(fechaId)
                expect(data[0].FechaID)
                .toBe(fechaId.FechaID)
                expect(data[0].FechaDescripcion)
                .toBe(fechaId.FechaDescripcion)
            })
    })
    describe('Verificamos la funcion modificarFecha', () => {
            test('Caso en el cual la descripcion de la fecha contenga doble espacios', async () => {
                const dataBase = await mostrarFechas()
                    correcto['FechaID'] = dataBase[0].FechaID
                    correcto.FechaDescripcion = dobleEspacios.FechaDescripcion
                try {
                    await modificarFecha(correcto) 
                } catch (error) {
                    expect(error.message)
                    .toBe('No se permiten dos o mas espacios en blanco juntos')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el dia esta vacio', async () => {
                const info = await mostrarFechas()
                noFecha['FechaID'] = info[0].FechaID
                try {
                    await modificarFecha(noFecha)  
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de el dia es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual la descripcion esta vacia', async () => {
                const info = await mostrarFechas()
                noDescripcion['FechaID'] = info[0].FechaID
                try {
                    await modificarFecha(noDescripcion)
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
                    await modificarFecha(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id no es de tipo numero.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual la descripcion contiene numeros', async () => {
                const info = await mostrarFechas()
                correcto['FechaID'] = info[0].FechaID
                correcto.FechaDescripcion = contieneNum.FechaDescripcion
                try {
                    await modificarFecha(correcto)
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
                    await modificarFecha(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id: ' + correcto.FechaID + ' no existe.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el el cual la fecha es antigua', async () => {
                let fechaAct = new Date().toLocaleDateString()
                let fechaHoy = formatFecha(fechaAct)
                const info = await mostrarFechas()
                correcto['FechaID'] = info[0].FechaID
                correcto.FechaDia = fechaMenor.FechaDia
                correcto.FechaDescripcion = 'fechass lskdjfa'
                try {
                    await modificarFecha(correcto)
                } catch (error) {
                    expect(error.message)
                    .toBe('La fecha no puede ser menor o igual a ' + fechaHoy)
                    expect(error.codigoRes)
                    .toBe(501)
                }                    
            })
    })
    describe('Verificamos la funcion eliminarFecha', () => {
        test('Caso en el cual el ID esta vacio', async () => {
            try {
                await eliminarFecha(idVacio)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }                       
        })
        test('Caso de que el ID no sea numerico', async () =>{
            try {
                await eliminarFecha(idString)
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
                await eliminarFecha(idMal)
            } catch (error) {
                expect(error.message)
                .toBe('El id: ' + id + ' no existe.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual es ID esta OK', async () => {
            const info = await mostrarFechas()
            const fechaEliminar = {
                FechaID: info[0].FechaID
            }
            // const fechaEliminar2 = {
            //     FechaID: info[1].FechaID
            // }
            // await eliminarFecha(fechaEliminar2)
            await eliminarFecha(fechaEliminar)
            expect(200)
        })
    })
})
