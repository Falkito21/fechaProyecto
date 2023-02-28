import { verificarDuplicado, verificarId, putFecha, deleteFechas, deleteFecha, postFechas, getFecha, getFechas } from "#Database/querys.js"
import { fechaDefault } from "./mock.js"
describe('Testeo del FUNCIONAMIENTO de las funciones de QUERYS', () => {
    describe('Verificamos la funcion verificarDuplicado', () => {
        test('Caso en el que ya existe una fecha', () => {
                verificarDuplicado(fechaDefault.FechaDia)
                expect(verificarDuplicado(fechaDefault.FechaDia))
                .toBe("SELECT FechaDia FROM Fechas WHERE FechaDia = '" + fechaDefault.FechaDia + "';")
            })
        test('Caso en el que se genere algun error en la query', () => {
            try {
                verificarDuplicado(fechaDefault.FechaDa)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de fecha en verificarDuplicado es incorrecto o esta vacio.')
            }
        })
        test('Caso en el que todo salga ok en la query', () => {
            verificarDuplicado(fechaDefault.FechaDia)
            expect(verificarDuplicado(fechaDefault.FechaDia))
            .toBe("SELECT FechaDia FROM Fechas WHERE FechaDia = '" + fechaDefault.FechaDia + "';")
        })
    })
    describe('Verificamos la funcion verificarId', () => {
        test('Caso de que genere un error en la query', () => {
            try {
                verificarId(fechaDefault.FechaDa)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id en verificarId es incorrecto o esta vacio.')
            }
        })
        test('Caso de que los datos y la query esten OK', () => {
            expect(verificarId(1140))
            .toBe("SELECT FechaID FROM Fechas WHERE FechaID = '1140';")
        })
    })
    describe('Verificamos la funcion putFecha', () => {
        test('Caso de que los datos y la query esten ok', () => {
            putFecha(1, fechaDefault.FechaDia, fechaDefault.FechaDescripcion)
            expect(putFecha(30, fechaDefault.FechaDia, fechaDefault.FechaDescripcion))
            .toBe("UPDATE Fechas SET FechaDia = '2034-04-09', FechaDescripcion = 'Primera fecha de testing' WHERE fechaID = '30';")
        })
        test('Caso de que se genere un error en la query con la fecha', () => {
            try {
                putFecha(1, fechaDefault.a, fechaDefault.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de dia en putFecha es incorrecto o esta vacio.')
            }
        })
        test('Caso de que se genere un error en la query con la descripcion', () => {
            try {
                putFecha(1, fechaDefault.FechaDia, fechaDefault.FechaDecripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de descripcion en putFecha es incorrecto o esta vacio.')
            }
        })
        test('Caso de que se genere un 2do error en la query con la descripcion', () => {
            try {
                putFecha(1, fechaDefault.FechaDia, 3)
            } catch (error) {
                expect(error.message)
                .toBe('La descripcion no es de tipo texto.')
            }
        })
        test('Caso de que se genere un error en la query con el ID', () => {
            try {
                putFecha( "" , fechaDefault.FechaDia, fechaDefault.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id en putFecha es incorrecto o esta vacio.')
            }
        })
    })
    describe('Verificamos la funcion deleteFechas', () => {
        test('Unico caso donde la query este OK', () => {
            deleteFechas()
            expect(deleteFechas())
            .toBe("DELETE FROM Fechas;")
        })
    })
    describe('Verificamos la funcion deleteFecha', () => {
        test('Caso en el que se genere un error en la query o en el Id', () => {
            try {
                deleteFecha("")
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id en idFecha es incorrecto o esta vacio.')
            }
        })
        test('Caso en el que la query este OK', () => {
            deleteFecha(1140)
            expect(deleteFecha(1140))
            .toBe("delete from Fechas where FechaID = '1140';")
        })
    })
    describe('Verificamos la funcion postFechas', () => {
        test('Caso de que se genere un error en la query con la fecha', () => {
            try {
                postFechas(fechaDefault.a, fechaDefault.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de postFechas es incorrecto o esta vacio.')
            }
        })
        test('Caso de que se genere un error en la query con la descripcion', () => {
            try {
                postFechas(fechaDefault.FechaDia, fechaDefault.FechaDecripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de postFechas es incorrecto o esta vacio.')
            }
        })
        test('Caso de que se genere un 2do error en la query con la descripcion', () => {
            try {
                postFechas(fechaDefault.FechaDia, 3)
            } catch (error) {
                expect(error.message)
                .toBe('La descripcion no es de tipo texto.')
            }
        })
        test('Caso en el que la query este todo OK', () => {
            postFechas(fechaDefault.FechaDia, fechaDefault.FechaDescripcion)
            expect(postFechas(fechaDefault.FechaDia, fechaDefault.FechaDescripcion))
            .toBe("insert into Fechas ( FechaDia, FechaDescripcion) VALUES ('2034-04-09', 'Primera fecha de testing');")
        })
    })
    describe('Validamos la funcion getFecha', () => {
        test('Caso de que se genere un error en la query con el ID', () => {
            try {
                getFecha('')
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id en getFecha es incorrecto o esta vacio.')
            }
        })
        test('Caso en el que la query esta todo OK', () => {
            getFecha(1)
            expect(getFecha(1))
            .toBe("SELECT FechaID, FechaDescripcion,FechaDia FROM Fechas WHERE FechaID = '1'")
        })
    })
    describe('Validamos la funcion getFechas', () => {
        test('Unico caso en el cual la query este todo OK', () => {
            expect(getFechas())
            .toBe('SELECT FechaID, FechaDescripcion,FechaDia FROM  Fechas')
        })
    })
})
