import supertest from 'supertest'
import {compararFechas, formatFecha, validarBody, validarCadaCaracter, validarCaracteres, validarDobleEspacios, validarEpocaFecha, validarId, validarTipoString, validarVacio, validarDuplicado} from '#Helpers/validaciones.js'
import  { fechaSinData, fechaDefault, fechaSinDescripcion, fechaSinDia, fechaSinCuerpo, fechaConDescripcionErronea, fechaConDiaConDobleEspacios, fechaConDescripcionConDobleEspacios, FechaDescripcionConNumeros, fechaDescripcionConSignos }  from '../test/mock.js'


describe('Testeo del FUNCIONAMIENTO de las funciones de VALIDACIONES', () => {
    describe('Verificacion de la funcion validarBody', () => {
        test('Caso en el que no contega nada el body', () => {
            try {
                validarBody(fechaSinCuerpo)
            } catch (error) {
                expect(error.message)
                .toBe('El BODY no esta recibiendo informacion')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el que el body contiene datos', () => {
                validarBody(fechaDefault)
                expect(fechaDefault.FechaDia).toEqual(fechaDefault.FechaDia)
                expect(fechaDefault.FechaDescripcion).toEqual('Primera fecha de testing')
        })
    })
    describe('Verificacion de la funcion validarVacio', () => {
        test('Caso de que no tenga descripcion',() => {
            try {
                validarVacio(fechaSinDescripcion.FechaDescripcion, 'Fecha descripcion');
            } catch (error) {
                expect(error.message)
                .toBe('El valor de Fecha descripcion es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso de que no tenga una fecha', () => {
            try {
                validarVacio(fechaSinDia.FechaDia, 'fecha dia')
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
                validarDobleEspacios(fechaDefault.FechaDescripcion)
                expect(validarDobleEspacios(fechaDefault.FechaDescripcion))
                .toBe('Primera fecha de testing')
        })
        test('Caso de que la descripcion contenga doble espacio', () => {
            try {
                validarDobleEspacios(fechaConDescripcionConDobleEspacios.FechaDescripcion)
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
            validarCadaCaracter(fechaDefault.FechaDescripcion)
            expect(validarCadaCaracter(fechaDefault.FechaDescripcion))
            .toBe(fechaDefault.FechaDescripcion)
        })
        test('Caso donde los caracteres de la descripcion contiene Numeros', () => {
            try {
                validarCadaCaracter(FechaDescripcionConNumeros.FechaDescripcion)
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
            validarTipoString(fechaDefault.FechaDescripcion)
            expect(validarTipoString(fechaDefault.FechaDescripcion))
            .toBe(fechaDefault.FechaDescripcion)
        })
        test('Caso de que la descripcion no sea de tipo String', () => {
            try {
                validarTipoString(fechaConDescripcionErronea.FechaDescripcion)
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
            validarCaracteres(fechaDefault.FechaDescripcion)
            expect(validarCaracteres(fechaDefault.FechaDescripcion))
            .toBe(fechaDefault.FechaDescripcion)
        })
        test('Caso de que la descripcion contenga signos', () => {
            try {
                validarCaracteres(fechaDescripcionConSignos)
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
                , fechaUser = fechaDefault.FechaDia
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
            formatFecha('5/2/2022')
            expect(formatFecha('5/2/2022'))
            .toBe('2022-05-02')
        })
    })
    describe('Verificamos la funcion validarEpocaFecha', () => {
        test('Caso en el cual la fecha es mayor a la actual', () => {
            try {
                validarEpocaFecha(fechaDefault.FechaDia)
                expect(validarEpocaFecha(fechaDefault.FechaDia))
                .toBe(fechaDefault.FechaDia)
            } catch (error) {
                console.log(error)
            }
        })
        test('Caso en el cual la fecha es igual a la actual', () => {
            let fechaHoy = new Date()
            fechaHoy = fechaHoy.toLocaleDateString()
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
            fechaHoy = fechaHoy.toLocaleDateString()
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
        describe('Validamos la funcion validarDuplicado', () => {
            test('Caso de que ya exista una fecha en la base de datos', async () => {
                try {
                    await validarDuplicado('2033/04/10')
                } catch (error) {
                    expect(error.codigoRes)
                    .toBe(501)
                    expect(error.message)
                    .toBe('La fecha: 2033/04/10 YA existe.')
                }
            })
        })
    })

})



















// describe('Checkeo general de todas las Rutas de la API', () => {
    

//     test('Guardar una fecha en formato json', async() => {
//         const data = {
//             FechaDia: "2024-04-09",
//             FechaDescripcion: "Primera fecha de testing" 
//         }
//         await api
//             .post('/guardarFecha')
//             .send(data)
//             .expect(200)
//             .then(async (res) => {
//                 expect(res.body.FechaID).toBeTrusthy()
//                 expect(res.body.FechaDia).toBe(data.FechaDia)
//                 expect(res.body.FechaDescripcion).toBe(data.FechaDescripcion)
//             })
//     })
    
    
    
    
    // test('Guarda una fecha en formato json', async() => {   
    //     const data = {
    //         FechaDia: "2024-04-09",
    //         FechaDescripcion: "Primera fecha de testing" 
    //     }
    //     await api
    //     .post('/guardarFecha')
    //     .send(data)
    //     .set('Accept', 'application/json')
    //     .expect('Content-Type', /application\/json/)
    //     .expect(200)
    // })

    // test('Retorna un json con un listado de fechas', async () => {
    // await api
    //     .get('/fechas')
    //     .expect(200)
    //     .expect('Content-Type', /application\/json/)
    // })
    
    // test('Eliminamos una fecha con un id determinado', async() => {
    //         await api
    //             .delete('/eliminarFecha')
    //         .send({
    //              FechaID: 1009   
    //         })
    //         expect(200)
    // })
// })

// afterAll(() => {
//     sql.close()
//     server.close()
// })