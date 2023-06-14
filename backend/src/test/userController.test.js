import supertest from "supertest"
import { datosComp, datosVacio, formatoMailInc, formatoPassInc, sinEmail, sinPwd } from "./userController.mock.js"
import app from "#Config/http.js"
import { traerUserIdPorMail } from "#Validations/loginCreate.js"
const api = supertest(app)

describe('Testeo del funcionamiento del controllerSecion', () => {
    describe('ServicioCrearCuenta', () => {
        test('No recibe los datos', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(datosVacio)
            expect(res.status)
                .toBe(501)
        })
        test('No recibe email', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(sinEmail)
            expect(res.status)
                .toBe(501)
        })
        test('No recibe una password', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(sinPwd)
            expect(res.status)
                .toBe(501)
        })
        test('Formato mail incorrecto', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(formatoMailInc)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Formato password incorrecto', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(formatoPassInc)
            expect(res.statusCode)
                .toBe(501)
        })
        // tengo que agregar un eliminar cuenta 
        test('Todo OK', async () => {
            const res = await api
                .post('/crearCuenta')
                .send(datosComp)
            expect(res.statusCode)
                .toBe(200)
        })

    })
    describe('ServicioInicioSesion', () => {
        test('No recibe los datos', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(datosVacio)
            expect(res.statusCode)
                .toBe(501)
        })
        test('No recibe una password', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(sinPwd)
            expect(res.status)
                .toBe(501)
        })
        test('Formato mail incorrecto', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(formatoMailInc)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Formato password incorrecto', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(formatoPassInc)
            expect(res.statusCode)
                .toBe(501)
        })
        //tengo que agregar un eliminar cuenta 
        test('Todo OK', async () => {
            const res = await api
                .post('/inicioSesion')
                .send(datosComp)
            expect(res.statusCode)
                .toBe(200)
        })
    })
    describe('servicioEliminarCuenta', () => {
        test('Id inexistente: ', async () => {
            const res = await api
                .delete('/eliminarCuenta')
                .send(0)
            expect(res.statusCode)
                .toBe(501)
        })
        test('Todo OK: ', async () => {
            let idList = await traerUserIdPorMail('juan.falco@gmail.com')
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