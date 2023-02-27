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
                verificarDuplicado(fechaDefault.FechaDia)
            } catch (error) {
                expect(error)
                .toEqual('Error en validarDuplicad: ', error)
            }
        })
    })
})