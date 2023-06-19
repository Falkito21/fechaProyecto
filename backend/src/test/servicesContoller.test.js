import supertest from "supertest"
import { sql } from "#Config/db.js"
import app from "#Config/http.js"
import {server} from "../index.js"
const api = supertest(app)

import {serviciosEliminarFechaCorr, serviciosEliminarFechaInc, serviciosGuardarFechaCorr, serviciosGuardarFechaCorr2, serviciosModificarFechaCorr, serviciosModificarFechaInc, serviciosMostrarFechaCorr, serviciosMostrarFechaCorr2, serviciosMostrarFechaIdMal} from './servicesController.mock.js'
import { mostrarFechas } from "../controllers/dateController.js"
import { datosVacio } from "./userController.mock.js"

describe('Services Controller', () => {
    describe('Display dates service', () => {
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
            expect(res.status)
            .toBe(200)
            
        })
        test('Error date', async () => {
             const res = await api 
             .post('/guardarFecha')
             .send(serviciosGuardarFechaCorr)
            expect(res.status)
            .toBe(500)
        })
        test('Wrong route', async () => {
            const res = await api
            .post('/guardarFeca')
            .send(serviciosGuardarFechaCorr)
            expect(res.status)
            .toBe(404)
        })
    })
    describe('Display date service', () => {
        test('Get correct date', async () => {
            let datos = await mostrarFechas()
            serviciosMostrarFechaCorr.FechaID = datos[0].FechaID
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
        test('Incorrect date', async () => {
            await api
            .get('/unaFeca')
            .send(serviciosMostrarFechaCorr2)
            .expect(404)
        })
    })
    describe('Modify Date Service', () => {
        test('Successfully modified', async() => {
            let datos = await mostrarFechas()
            serviciosModificarFechaCorr.FechaID = datos[0].FechaID
            const res = await api
            .put('/modificarFecha')
            .send(serviciosModificarFechaCorr)
            expect(res.status)
            .toBe(200)
        })
        test('Caso donde la fecha es Erronea', async () => {
            const res = await api 
            .put('/modificarFecha')
            .send(serviciosModificarFechaInc)
            expect(res.status)
            .toBe(501)
        })
        test('Caso en donde la ruta es incorrecta', async () => {
            const res = await api
            .put('/modificarFeca')
            .send(serviciosGuardarFechaCorr)
            expect(res.status)
            .toBe(404)
        })
    })
    describe('Verificamos el servicio eliminarFecha', () => {
        test('Caso en el cual esta TODO OK', async() => {
            let datos = await mostrarFechas()
            serviciosEliminarFechaCorr.FechaID = datos[0].FechaID
            const res = await api 
            .delete('/eliminarFecha')
            .send(serviciosEliminarFechaCorr)
            expect(res.status)
            .toBe(200)
        })
        test('Caso en el cual lanza ERROR', async () => {
            
            const res = await api
            .delete('/eliminarFecha')
            .send(serviciosEliminarFechaInc)
            expect(res.status)
            .toBe(501)
        })
    })

    describe('Se verifica el servicio servicioCrearCuenta', () => {
        test('Caso que no contiene body', async()  => {
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
