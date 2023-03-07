//Funciones del validador
import { formatFecha, validarVacio } from "#Helpers/validaciones.js"

//Funciones del controlador
import {eliminarFecha, guardarFecha, modificarFecha, mostrarFecha, mostrarFechas} from "../controllers/controller.js"

// Mocks
import {fechaConDescripcionErronea, fechaConFechaAntigua, fechaDescripcionConSignos, fechaModificarConDescNum, fechaModificarDobleEspacios, fechaModificarFechaAnt, fechaModificarIdError, fechaModificarSinDesc, fechaModificarSinDia, fechaRepetida, fechaSinDescripcion, fechaSinDia, fechaAct, fechaModificarFechaRep, idFechaEliminarFechaVacio, idFechaEliminarFechaNoNum, fechaModificarIdNoNum, fechaModificarIdMal, fechaEliminarIdMal, mostrarFechaIdVacio, mostrarFechaIdNoNum, mostrarFechaIdNoExist, mostrarFechaIdExist} from "./mock.js"

describe('Testeo del FUNCIONAMIENTO de las funciones del CONTROLLER', () => {
    
    describe('Verificamos la funcion guardarFecha', () => {
        test('Caso en el cual la descripcion tiene doble espacios', async() => {
            
        })
        test('Caso en el cual el dia esta mal o vacia', async() => {
            try {
                await guardarFecha(fechaSinDia)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de el dia es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion esta mal o vacia', async() => {
            try {
                await guardarFecha(fechaSinDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de la descripcion es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)            }
        })
        test('Caso en el cual la fecha es menor a la fecha del dia actual', async() => {
            let fecha = formatFecha(new Date().toLocaleString())
            try {
                await guardarFecha(fechaConFechaAntigua)
            } catch (error) {
                expect(error.message)
                .toBe('La fecha no puede ser menor o igual a '+ fecha)
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion no es de tipo texto', async () => {
            try {
                await guardarFecha(fechaConDescripcionErronea)
            } catch (error) {
                expect(error.message)
                .toBe('El texto de la descripcion no debe contener numeros')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la descripcion contiene signos', async () => {
            try {
                await guardarFecha(fechaDescripcionConSignos)
            } catch (error) {
                expect(error.message)
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual la fecha esta duplicada', async () => {
            try {
                await guardarFecha(fechaRepetida)
            } catch (error) {
                expect(error.message)
                .toBe('La fecha: '+ fechaRepetida.FechaDia +' YA existe.')
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
                    await mostrarFecha(mostrarFechaIdVacio)
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de mostrarFecha es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no es de tipo numerico', async () => {
                try {
                    await mostrarFecha(mostrarFechaIdNoNum)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id no es de tipo numero.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no exista', async () => {
                let id = mostrarFechaIdNoExist.FechaID
                try {
                    await mostrarFecha(mostrarFechaIdNoExist)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id: ' + id + ' no existe.')
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
                try {
                    await modificarFecha(fechaModificarDobleEspacios) 
                } catch (error) {
                    expect(error.message)
                    .toBe('No se permiten dos o mas espacios en blanco juntos')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el dia esta vacio', async () => {
                try {
                    await modificarFecha(fechaModificarSinDia)  
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de el dia es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual la descripcion esta vacia', async () => {
                try {
                    await modificarFecha(fechaModificarSinDesc)
                } catch (error) {
                    expect(error.message)
                    .toBe('El valor de la descripcion es incorrecto o esta vacio.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no es numerico', async () => {
                try {
                    await modificarFecha(fechaModificarIdNoNum)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id no es de tipo numero.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual la descripcion contiene numeros', async () => {
                try {
                    await modificarFecha(fechaModificarConDescNum)
                } catch (error) {
                    expect(error.message)
                    .toBe('El texto de la descripcion no debe contener numeros')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el cual el ID no exista', async () => {
                let fechaId = fechaModificarIdError.FechaID
                try {
                    await modificarFecha(fechaModificarIdError)
                } catch (error) {
                    expect(error.message)
                    .toBe('El id: ' + fechaId + ' no existe.')
                    expect(error.codigoRes)
                    .toBe(501)
                }
            })
            test('Caso en el el cual la fecha es antigua', async () => {
                try {
                    let data = await mostrarFechas()
                    fechaModificarFechaAnt.FechaID = data[0].FechaID
                    await modificarFecha(fechaModificarFechaAnt)
                } catch (error) {
                    expect(error.message)
                    .toBe('La fecha no puede ser menor o igual a ' + fechaAct)
                    expect(error.codigoRes)
                    .toBe(501)
                }                    
            })
    })
    describe('Verificamos la funcion eliminarFecha', () => {
        test('Caso en el cual el ID esta vacio', async () => {
            try {
                await eliminarFecha(idFechaEliminarFechaVacio)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }                       
        })
        test('Caso de que el ID no sea numerico', async () =>{
            try {
                await eliminarFecha(idFechaEliminarFechaNoNum)
            } catch (error) {
                expect(error.message)
                .toBe('El id no es de tipo numero.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el cual el ID es incorrecto', async () => {
            let id = fechaEliminarIdMal.FechaID
            try {
                await eliminarFecha(fechaEliminarIdMal)
            } catch (error) {
                expect(error.message)
                .toBe('El id: ' + id + ' no existe.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
    })
})
