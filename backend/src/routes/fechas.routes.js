import express, {Router} from 'express'

// importo todos los controladores del controller
import {servicioMostrarFechas, servicioEliminarFecha, servicioGuardarFecha, servicioModificarFecha, verificarFecha, servicioMostrarFecha} from '#Controllers/controller.js'

const fechaRouter = Router()

fechaRouter.use(express.urlencoded({extended: true}))
//! Sirve para que el front pueda acceder a la informacion que da el backend

fechaRouter.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

fechaRouter.get('/fechas', servicioMostrarFechas)
fechaRouter.get('/unaFecha', servicioMostrarFecha)
fechaRouter.post('/guardarFecha', servicioGuardarFecha)
fechaRouter.put('/modificarFecha', servicioModificarFecha)
fechaRouter.delete('/eliminarFecha', servicioEliminarFecha)
fechaRouter.post('/verificarFecha', verificarFecha)

export default fechaRouter
