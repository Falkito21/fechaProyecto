import { servicioCrearCuenta } from "./../controllers/controllerSesion.js"
import { datosVacio } from "./controllerSesion.mock.js"

describe('Testeo del funcionamiento del controllerSecion', () => {
    describe('ServicioCrearCuenta', () => {
        test('Caso en el no recibe informacion en el body', async() => {
            try {
                await servicioCrearCuenta(datosVacio)
            } catch (error) {
                expect(error.message)
                .toBe('kjfldsa')
            }
        })
    })
})