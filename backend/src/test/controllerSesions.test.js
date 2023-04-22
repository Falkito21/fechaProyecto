import supertest from "supertest"
import { servicioCrearCuenta } from "./../controllers/controllerSesion.js"
import { datosComp, datosVacio, formatoMailInc, formatoPassInc, sinEmail, sinPwd } from "./controllerSesion.mock.js"
import app from "#Config/http.js"
const api = supertest(app)

describe('Testeo del funcionamiento del controllerSecion', () => {
    describe('ServicioCrearCuenta', () => {
        test('No recibe los datos', async() => {
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
        test('Formato mail incorrecto', async() => {
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
        //tengo que agregar un eliminar cuenta 
        test('Todo OK', async () => {
            const res = await api 
            .post('/crearCuenta')
            .send(datosComp)
            expect(res.statusCode)
            .toBe(200)
        })
       
    })
    describe('ServicioInicioSesion', () => {
        test('No recibe los datos', async() => {
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
        test('Formato mail incorrecto', async() => {
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
})