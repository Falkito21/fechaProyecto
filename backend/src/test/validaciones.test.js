import { guardarFecha, mostrarFechas } from '../controllers/controller.js'
import {compararFechas, formatFecha, validarBody, validarNumEnTexto, validarCaracteresConSignos, validarDobleEspacios, validarEpocaFecha, validarId, validarTipoString, validarVacio, validarDuplicado} from './../validations/validaciones.js'
import { conSignos, contieneNum, correcto, dobleEspacios, noDescripcion, noFecha, soloNum, validarBodyVacio } from './validacionesMock.js'

describe('Testeo del FUNCIONAMIENTO de las funciones de VALIDACIONES', () => {
    describe('Verificacion de la funcion validarBody', () => {
        test('Caso en el que no contega nada el body', () => {
            try {
                validarBody(validarBodyVacio)
            } catch (error) {
                expect(error.message)
                .toBe('El BODY no esta recibiendo informacion')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el que el body contiene datos', () => {
                validarBody(correcto)
                expect(correcto.FechaDia).toEqual(correcto.FechaDia)
                expect(correcto.FechaDescripcion).toEqual('Primera fecha de testing')
        })
    })
    describe('Verificacion de la funcion validarVacio', () => {
        test('Caso de que no tenga descripcion',() => {
            try {
                validarVacio(noDescripcion.FechaDescripcion, 'Fecha descripcion');
            } catch (error) {
                expect(error.message)
                .toBe('El valor de Fecha descripcion es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso de que no tenga una fecha', () => {
            try {
                validarVacio(noFecha.FechaDia, 'fecha dia')
            } catch (error) {
                expect(error.message)
                .toBe('El valor de fecha dia es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501) 
            }
        })
    })
    describe('Verificacion de la funcion validarDobleEspacios', () => {
        test('Caso de que no contenga un doble espacio la descripcion', () => {
                let dobleEspacios = validarDobleEspacios(correcto.FechaDescripcion)
                expect(dobleEspacios)
                .toBe('Primera fecha de testing')
        })
        test('Caso de que la descripcion contenga doble espacio', () => {
            try {
                validarDobleEspacios(dobleEspacios.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('No se permiten dos o mas espacios en blanco juntos')
                expect(error.codigoRes)
                .toBe(501)
            }
            
        })
    })
    describe('Verificamos la funcion validarCadaCaracter', () => {
        test('Caso de que los caracteres de la descripcion esten todos bien', () => {
            let cadaCaracter = validarNumEnTexto(correcto.FechaDescripcion)
            expect(cadaCaracter)
            .toBe(correcto.FechaDescripcion)
        })
        test('Caso donde los caracteres de la descripcion contiene Numeros', () => {
            try {
                validarNumEnTexto(contieneNum.FechaDescripcion)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('El texto de la descripcion no debe contener numeros')
            }
        })
    })
    describe('Verificamos la funcion validarTipoString', () => {
        test('Caso de que la descripcion sea de tipo String', () => {
            validarTipoString(correcto.FechaDescripcion)
            expect(validarTipoString(correcto.FechaDescripcion))
            .toBe(correcto.FechaDescripcion)
        })
        test('Caso de que la descripcion no sea de tipo String', () => {
            try {
                validarTipoString(soloNum.FechaDescripcion)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('La descripcion no es de tipo texto.')
            }
        })
    })
    describe('Verificamos la funcion validarCaracteres', () => {
        test('Caso de que la descripcion este correctamente', () => {
            let signosEnDescript = validarCaracteresConSignos(correcto.FechaDescripcion)
            expect(signosEnDescript)
            .toBe(correcto.FechaDescripcion)
        })
        test('Caso de que la descripcion contenga signos', () => {
            try {
                validarCaracteresConSignos(conSignos)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('La descripcion no puede contener signos($%^&&)')
            }
        })
    })
    describe('Verificamos la funcion compararfechas', () => {
        test('Caso de que la fecha sea mayor a la fecha de hoy', () => {
                let fechaHoy = new Date()
                , fechaUser = correcto.FechaDia
                compararFechas(fechaUser, fechaHoy)
                expect(compararFechas(fechaUser, fechaHoy))
                .toBe(true)
        })
        test('Caso de que la fecha sea igual a la fecha de hoy', () => {
                let fechaHoy = new Date() 
                fechaHoy = fechaHoy.toLocaleDateString()
                compararFechas(fechaHoy, fechaHoy)
                expect(compararFechas(fechaHoy, fechaHoy))
                .toBe(false)            
        })
        test('Caso de que la fecha sea menor a la fecha de hoy', () => {
            let fechaHoy = new Date()
            fechaHoy = fechaHoy.toLocaleDateString()
            let fechaAnt = '2018-05-14'
            compararFechas(fechaAnt, fechaHoy)
            expect(compararFechas(fechaAnt, fechaHoy))
            .toBe(false)
        })
    })
    describe('Verificamos la funcion formatFecha', () => {
        test('Unico caso en el cual devuelve el formato correcto', ()=> {
            let fechaFormateada = formatFecha('5-2-2022')
            expect(fechaFormateada)
            .toBe('2022/05/02')
        })
    })
    describe('Verificamos la funcion validarEpocaFecha', () => {
        test('Caso en el cual la fecha es mayor a la actual', () => {
            try {
                validarEpocaFecha(correcto.FechaDia)
                expect(validarEpocaFecha(correcto.FechaDia))
                .toBe(correcto.FechaDia)
            } catch (error) {
                console.log(error)
            }
        })
        test('Caso en el cual la fecha es igual a la actual', () => {
            let fechaHoy = new Date()
            let fechaAct = formatFecha(fechaHoy)
            try {
                validarEpocaFecha(fechaAct)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('La fecha no puede ser menor o igual a ' + fechaAct)
            }
        })
        test('Caso en el cual la fecha es menor a la actual', () => {
            let fechaHoy = new Date()
            let fechaAct = formatFecha(fechaHoy)
            let fechaUser = '2020-12-01'
            try {
                validarEpocaFecha(fechaUser)
            } catch (error) {
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('La fecha no puede ser menor o igual a ' + fechaAct)
            }
        })
    })
    describe('Validamos la funcion validarDuplicado', () => {
        test('Caso de que ya exista una fecha en la base de datos', async () => {
            try {
                await validarDuplicado('2033/04/10')
            } catch (error) {
                console.log(error)
                expect(error.codigoRes)
                .toBe(501)
                expect(error.message)
                .toBe('La fecha: 2033/04/10 YA existe.')
            }
        })
    })
    describe('Validamos la funcion validarId', () => {
        test('Caso de que el ID sea undefined',async () => {
            try {
                await validarId(correcto.FechaId)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id en verificarId es incorrecto o esta vacio.')
            }
        })
        test('Caso de que el ID no exista', async () => {
            try {
                await validarId(1)
            } catch (error) {
                expect(error.message)
                .toBe('El id: 1 no existe.')
            }
        })
    })
})