import { verificarDuplicado, verificarId, putFecha, deleteFechas, deleteFecha, postFechas, getFecha, getFechas } from "#Database/querys.js"
import { correcto } from "./validacionesMock.js"
describe('Testeo del FUNCIONAMIENTO de las funciones de QUERYS', () => {
    describe('Verificamos la funcion verificarDuplicado', () => {
        test('Caso en el que ya existe una fecha', () => {
                verificarDuplicado(correcto.FechaDia)
                expect(verificarDuplicado(correcto.FechaDia))
                .toBe("SELECT FechaDia FROM Fechas WHERE FechaDia = '" + correcto.FechaDia + "';")
            })
        test('Caso en el que se genere algun error en la query', () => {
            try {
                verificarDuplicado(correcto.FechaDa)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de fecha en verificarDuplicado es incorrecto o esta vacio.')
            }
        })
        test('Caso en el que todo salga ok en la query', () => {
            verificarDuplicado(correcto.FechaDia)
            expect(verificarDuplicado(correcto.FechaDia))
            .toBe("SELECT FechaDia FROM Fechas WHERE FechaDia = '" + correcto.FechaDia + "';")
        })
    })
    describe('Verificamos la funcion verificarId', () => {
        test('Caso de que genere un error en la query', () => {
            try {
                verificarId(correcto.FechaDa)
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
            putFecha(1, correcto.FechaDia, correcto.FechaDescripcion)
            expect(putFecha(30, correcto.FechaDia, correcto.FechaDescripcion))
            .toBe("UPDATE Fechas SET FechaDia = '2034-04-09', FechaDescripcion = 'Primera fecha de testing' WHERE fechaID = '30';")
        })
        test('Caso de que se genere un error en la query con la fecha', () => {
            try {
                putFecha(1, correcto.a, correcto.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de dia en putFecha es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso de que se genere un error en la query con la descripcion', () => {
            try {
                putFecha(1, correcto.FechaDia, correcto.FechaDecripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de descripcion en putFecha es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso de que se genere un 2do error en la query con la descripcion', () => {
            try {
                putFecha(1, correcto.FechaDia, 3)
            } catch (error) {
                expect(error.message)
                .toBe('La descripcion no es de tipo texto.')
            }
        })
        test('Caso de que se genere un error en la query con el ID', () => {
            try {
                putFecha( "" , correcto.FechaDia, correcto.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de id en putFecha es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
    })
    describe('Verificamos la funcion deleteFechas', () => {
        test('Unico caso donde la query este OK', () => {
            let asd = deleteFechas()
            expect(asd)
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
                expect(error.codigoRes)
                .toBe(501)
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
                postFechas(correcto.a, correcto.FechaDescripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de postFechas es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso de que se genere un error en la query con la descripcion', () => {
            try {
                postFechas(correcto.FechaDia, correcto.FechaDecripcion)
            } catch (error) {
                expect(error.message)
                .toBe('El valor de postFechas es incorrecto o esta vacio.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso de que se genere un 2do error en la query con la descripcion', () => {
            try {
                postFechas(correcto.FechaDia, 3)
            } catch (error) {
                expect(error.message)
                .toBe('La descripcion no es de tipo texto.')
                expect(error.codigoRes)
                .toBe(501)
            }
        })
        test('Caso en el que la query este todo OK', () => {
            postFechas(correcto.FechaDia, correcto.FechaDescripcion)
            expect(postFechas(correcto.FechaDia, correcto.FechaDescripcion))
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
                expect(error.codigoRes)
                .toBe(501)
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
            .toBe('SELECT FechaID,FechaDescripcion,FechaDia FROM  Fechas ORDER BY FechaDia ASC')
        })
    })
})