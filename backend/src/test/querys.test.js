import { verificarDuplicado } from "#Database/querys.js"
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
})