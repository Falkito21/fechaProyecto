import express, {Router} from 'express'

// importo todos los controladores del controller
import {mostrarFechas, eliminarFecha, guardarFecha, modificarFecha, verificarFecha, mostrarFecha} from '#Controllers/controller.js'

const fechaRouter = Router()

fechaRouter.use(express.urlencoded({extended: true}))
//! Sirve para que el front pueda acceder a la informacion que da el backend

fechaRouter.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

fechaRouter.get('/fechas', mostrarFechas)
fechaRouter.get('/unaFecha', mostrarFecha)
fechaRouter.post('/guardarFecha', guardarFecha)
fechaRouter.put('/modificarFecha', modificarFecha)
fechaRouter.delete('/eliminarFecha', eliminarFecha)
fechaRouter.post('/verificarFecha', verificarFecha)

export default fechaRouter
