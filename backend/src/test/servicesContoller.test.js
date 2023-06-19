import supertest from "supertest"
import { sql } from "#Config/db.js"
import app from "#Config/http.js"
import {server} from "../index.js"
const api = supertest(app)

import {serviciosEliminarFechaCorr, serviciosEliminarFechaInc, serviciosGuardarFechaCorr, serviciosGuardarFechaCorr2, serviciosModificarFechaCorr, serviciosModificarFechaInc, serviciosMostrarFechaCorr, serviciosMostrarFechaCorr2, serviciosMostrarFechaIdMal} from './servicesController.mock.js'
import { displayDates } from "../controllers/dateController.js"
import { datosVacio } from "./userController.mock.js"

describe('Services Controller', () => {
    describe('Display dates Service', () => {
        test('Everything ok', async () => {
            await api
            .get('/fechas')
            .expect(200)
        })
        test('Wrong route', async () => {
            await api
            .get('/fechas/fds')
            .expect(404)
        })
    })
    describe('Save date', () => {
        test('Date is OK', async () => {
             const res = await api 
             .post('/guardarFecha')
             .send(serviciosGuardarFechaCorr2)
            expect(res.statusCode)
            .toBe(200)
            
        })
        test('Error date', async () => {
             const res = await api 
             .post('/guardarFecha')
             .send(serviciosGuardarFechaCorr)
            expect(res.statusCode)
            .toBe(500)
        })
        test('Wrong route', async () => {
            const res = await api
            .post('/guardarFeca')
            .send(serviciosGuardarFechaCorr)
            expect(res.statusCode)
            .toBe(404)
        })
    })
    describe('Display date Service', () => {
        test('Get correct date', async () => {
            let datos = await displayDates()
            serviciosMostrarFechaCorr.id = datos[0].id
            await api
            .get('/unaFecha')
            .send(serviciosMostrarFechaCorr)
            .expect(200)
        })
        test('Throw error', async() => {
            await api 
            .get('/unaFecha')
            .send(serviciosMostrarFechaIdMal)
            .expect(501)
        })
        test('Wrong date', async () => {
            await api
            .get('/unaFeca')
            .send(serviciosMostrarFechaCorr2)
            .expect(404)
        })
    })
    describe('Modify Date Service', () => {
        test('Successfully modified', async() => {
            let datos = await displayDates()
            serviciosModificarFechaCorr.id = datos[0].id
            const res = await api
            .put('/modificarFecha')
            .send(serviciosModificarFechaCorr)
            expect(res.statusCode)
            .toBe(200)
        })
        test('Wrong Date', async () => {
            const res = await api 
            .put('/modificarFecha')
            .send(serviciosModificarFechaInc)
            expect(res.statusCode)
            .toBe(501)
        })
        test('Wrong route', async () => {
            const res = await api
            .put('/modificarFeca')
            .send(serviciosGuardarFechaCorr)
            expect(res.statusCode)
            .toBe(404)
        })
    })
    describe('Remove Date Service', () => {
        test('Everything is Ok', async() => {
            let datos = await displayDates()
            serviciosEliminarFechaCorr.id = datos[0].id
            const res = await api 
            .delete('/eliminarFecha')
            .send(serviciosEliminarFechaCorr)
            expect(res.statusCode)
            .toBe(200)
        })
        test('Throw error', async () => {
            
            const res = await api
            .delete('/eliminarFecha')
            .send(serviciosEliminarFechaInc)
            expect(res.statusCode)
            .toBe(501)
        })
    })

    describe('Create Count Service', () => {
        test('Dont have body', async()  => {
            try {
                await api 
                .get('/')
                .send(datosVacio)
            } catch (error) {
                expecto('jlfasfd')
            }

        })
    })

    afterAll(() => {
        sql.close()
        server.close()
    })

})
