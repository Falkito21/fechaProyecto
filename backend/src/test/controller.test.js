import { formatFecha } from "#Helpers/validaciones.js"
import { format } from "prettier"
import {guardarFecha, modificarFecha} from "../controllers/controller.js"
import { fechaConDescripcionConDobleEspacios, fechaConDescripcionErronea, fechaConFechaAntigua, fechaDescripcionConSignos, fechaModificarConDescNum, fechaModificarDobleEspacios, fechaModificarFechaAnt, fechaModificarIdCorrect, fechaModificarIdError, fechaModificarSinDesc, fechaModificarSinDia, fechaOkDistinta, fechaRepetida, fechaSinDescripcion, fechaSinDia, fechaAct, fechaModificarFechaRep} from "./mock.js"

// describe('Verificamos la funcion mostrarFechas', () => {
    //     test('Unico caso en el cual esta todo OK', async () => {
        //         let fechas = await mostrarFechas()
        //         expect(fechas)
        //         .toEqual(fechasEjemplo)
        //     })
        // })
describe('Testeo del FUNCIONAMIENTO de las funciones del CONTROLLER', () => {
    describe('Verificamos la funcion guardarFecha', () => {
        test('Caso en el cual la descripcion tiene doble espacios', async() => {
            try {
                await guardarFecha(fechaConDescripcionConDobleEspacios)
            } catch (error) {
                expect(error.message)
                .toBe('No se permiten dos o mas espacios en blanco juntos')
                expect(error.codigoRes)
                .toBe(501)
            }
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
                    await modificarFecha(fechaModificarFechaAnt)
                } catch (error) {
                    expect(error.message)
                    .toBe('La fecha no puede ser menor o igual a ' + fechaAct)
                    expect(error.codigoRes)
                    .toBe(501)
                }                    
            })
    })
})