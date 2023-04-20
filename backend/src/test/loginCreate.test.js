import { encriptPass, generateAccessToken, validarGmail, validarPass, validarSiExiste, validateToken } from "./../validations/loginCreate.js"
import { emailCorrecto, emailIncorrecto, passCorrecta, passIncorrecta } from "./loginCreate.mock.js"

describe('Testeo del funcionamiento de las validaciones de loginCreate', () => {
    describe('Verificamos la funcion validarGmail', () => {
        test('Caso en el que mail es correcto', async () => {
            let validacion = await validarGmail(emailCorrecto.email)
            expect(validacion)
            .toBe(emailCorrecto.email)
        })
        test('Caso en el que el mail tenga un formato incorrecto', async () => {
            try{
                await validarGmail(emailIncorrecto)
            }catch(error){
                expect(error.message)
                .toBe('El formato del mail no es el correcto')
            }
        })
    })
    describe('Verificamos la funcion validarPass', () => {
        test('Caso donde le formato de la contrasenia es correcto: ', async () => {
            let validacion = await validarPass(passCorrecta.password)
            expect(validacion)
            .toBe(passCorrecta.password)
        })
        test('Caso en el que la contrasenia es incorrecta', async () => {
            try {
                await validarPass(passIncorrecta)
            } catch (error) {
                expect(error.message)
                .toBe('La contraseña debe contar con los siguientes requisitos: 8 caracteres de longitud.\n Al menos una letra mayúscula\n Al menos una letra minúscula \nAl menos un número \nUn carácter especial')
            }
        })
    })
    describe('encriptPass', () => {
        test('Unico caso en el cual encripta correctamente', async () => {
            let validacion = await encriptPass('laLa21%^hyr')
            expect(validacion.length)
            .toBe(60)
        })
    })
})