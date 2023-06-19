import supertest from "supertest"
import { datosComp, datosVacio, formatoMailInc, formatoPassInc, sinEmail, sinPwd } from "./userController.mock.js"
import app from "#Config/http.js"
import { getUserByEmail } from "#Validations/customGeneralValidations.js"
const api = supertest(app)

describe('User Controller', () => {
    describe('Create Count Service', () => {
        test('Doesnt receive data.', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(datosVacio)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Doesnt receive email.', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(sinEmail)
                expect(res.statusCode)
                .toBe(501)
            })
            test('Doesnt receive password.', async () => {
                const res = await api
                .post('/crearCuenta')
                .send(sinPwd)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Incorrect email format', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(formatoMailInc)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Incorrect password format', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(formatoPassInc)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Everything Ok', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(datosComp)
            expect(res.statusCode)
                .toBe(200)
        })

    })
    describe('Login Service', () => {
        test('Doesnt receive data', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(datosVacio)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Doesnt receive password', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(sinPwd)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Incorrect email format', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(formatoMailInc)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Incorrect password format', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(formatoPassInc)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Everything Ok', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(datosComp)
            expect(res.statusCode)
                .toBe(200)
        })
    })
    describe('Remove Count Service', () => {
        test('Wrong id', async () => {
            const res = await api
                .delete('/eliminarCuenta')
                .send(0)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Everything Ok: ', async () => {
            let idList = await getUserByEmail('juan.falco@gmail.com')
            let id = idList.recordset[0].id
            let obj = { id: id }
            const res = await api
                .delete('/eliminarCuenta')
                .send(obj)
            expect(res.statusCode)
                .toBe(200)
        })
    })
})