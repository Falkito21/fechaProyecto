import express, {Router} from 'express'
import {servicioMostrarFechas, servicioEliminarFecha, servicioGuardarFecha, servicioModificarFecha, servicioMostrarFecha} from '#Controllers/controller.js'
import { servicioCrearCuenta, servicioEliminarCuenta, servicioInicioSesion, servicioTraerUser } from './../controllers/controllerSesion.js'
import {validateToken} from './../validations/loginCreate.js'

const fechaRouter = Router()
fechaRouter.use(express.urlencoded({extended: true}))
//! Sirve para que el front pueda acceder a la informacion que da el backend
fechaRouter.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

fechaRouter.post('/inicioSesion', servicioInicioSesion)
fechaRouter.post('/traerUser', servicioTraerUser)
fechaRouter.post('/crearCuenta', servicioCrearCuenta)
fechaRouter.delete('/eliminarCuenta', servicioEliminarCuenta)
fechaRouter.get('/fechas', validateToken, servicioMostrarFechas)
fechaRouter.get('/unaFecha', servicioMostrarFecha)
fechaRouter.post('/guardarFecha', servicioGuardarFecha)
fechaRouter.put('/modificarFecha', servicioModificarFecha)
fechaRouter.delete('/eliminarFecha', servicioEliminarFecha)

export default fechaRouter