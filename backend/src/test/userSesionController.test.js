import { encriptPassword, gmailValidate, passwordValidate } from "#Validations/customGeneralValidations.js"
import { emailCorrecto, emailIncorrecto, passCorrecta, passIncorrecta } from "./userSesionController.mock.js"

describe('Users Validations', () => {
    describe('Email Validate', () => {
        test('Everything Ok', async () => {
            let validacion = await gmailValidate(emailCorrecto.email)
            expect(validacion)
            .toBe(emailCorrecto.email)
        })
        test('Incorrect email format', async () => {
            try{
                await gmailValidate(emailIncorrecto)
            }catch(error){
                expect(error.message)
                .toBe('The email format is incorrect.')
            }
        })
    })
    describe('Password Validate', () => {
        test('Everything Ok', async () => {
            let validacion = await passwordValidate(passCorrecta.password)
            expect(validacion)
            .toBe(passCorrecta.password)
        })
        test('Incorrect password format', async () => {
            try {
                await passwordValidate(passIncorrecta)
            } catch (error) {
                expect(error.message)
                .toBe('The password must meet the following requirements:\n8 characters in length.\nAt least one uppercase letter. \nAt least one lowercase letter. \nAt least one number. \nA special character.')
            }
        })
    })
    describe('encriptPassword', () => {
        test('Everything Ok', async () => {
            let validacion = await encriptPassword('laLa21%^hyr')
            expect(validacion.length)
            .toBe(60)
        })
    })
})