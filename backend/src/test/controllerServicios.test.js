import supertest from "supertest"
import { sql } from "#Config/db.js"
import app from "#Config/http.js"
import {server} from "../index.js"
const api = supertest(app)

import {serviciosEliminarFechaCorr, serviciosEliminarFechaInc, serviciosGuardarFechaCorr, serviciosGuardarFechaCorr2, serviciosModificarFechaCorr, serviciosModificarFechaInc, serviciosMostrarFechaCorr, serviciosMostrarFechaCorr2, serviciosMostrarFechaIdMal} from './controllerServiciosMock.js'
import { mostrarFechas, servicioGuardarFecha } from "../controllers/controller.js"

//! **************************************************
//! * CORRER DOS VECES PARA VER SI FUNCIONA TODO OK  *
//! **************************************************

describe('Testeamos las funciones de SERVICIO', () => {
    describe('Verificamos el servicio servicioMostrarFechas', () => {
        test('Caso en el cual trae los datos correctamente', async () => {
            await api
            .get('/fechas')
            .expect(200)
        })
        test('Caso en el cual la ruta es incorrecta', async () => {
            await api
            .get('/fechas/fds')
            .expect(404)
        })
    })
    describe('Verificamos el servicio guardarFecha', () => {
        test('Caso en dode la fecha esta OK', async () => {
            let mes = Math.floor(Math.random()*30)            
            let dia = new Date().getDate()
            let diaC = dia
             let fechaNew = serviciosGuardarFechaCorr.FechaDia + diaC
             serviciosGuardarFechaCorr.FechaDia = fechaNew
             const res = await api 
             .post('/guardarFecha')
             .send(serviciosGuardarFechaCorr2)
            expect(res.status)
            .toBe(200)
            
        })
        test('Caso en donde la fecha es Erronea', async () => {
             const res = await api 
             .post('/guardarFecha')
             .send(serviciosGuardarFechaCorr)
            expect(res.status)
            .toBe(501)
        })
        test('Caso en donde la ruta es incorrecta', async () => {
            const res = await api
            .post('/guardarFeca')
            .send(serviciosGuardarFechaCorr)
            expect(res.status)
            .toBe(404)
        })
    })
    describe('Verificamos el servicio servicioMostrarFecha', () => {
        test('Caso en el cual trae la fecha indicada', async () => {
            let datos = await mostrarFechas()
            serviciosMostrarFechaCorr.FechaID = datos[0].FechaID
            await api
            .get('/unaFecha')
            .send(serviciosMostrarFechaCorr)
            .expect(200)
        })
        test('Caso en el cual lanza un error', async() => {
            await api 
            .get('/unaFecha')
            .send(serviciosMostrarFechaIdMal)
            .expect(501)
        })
        test('Caso en el cual la ruta es incorrecta', async () => {
            await api
            .get('/unaFeca')
            .send(serviciosMostrarFechaCorr2)
            .expect(404)
        })
    })
    describe('Verificamos el servicio modificarFecha', () => {
        test('Caso donde la fecha se modifica correctamente', async() => {
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
    afterAll(() => {
        sql.close()
        server.close()
    })
})