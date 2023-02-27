import { verificarDuplicado, verificarId } from "#Database/querys.js"
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
                expect(error)
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
                expect(error)
                .toBe('El valor de id en verificarId es incorrecto o esta vacio.')
            }
        })
        test('Caso de que los datos y la query esten OK', () => {
            expect(verificarId(1140))
            .toBe("SELECT FechaID FROM Fechas WHERE FechaID = '1140';")
        })
    })
    
})