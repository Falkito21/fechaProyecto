import express, {Router} from 'express'
import {displayDateService, displayDatesService, saveDateService, modifyDateService, removeDateService} from '#Controllers/dateController.js'
import { createCountService, getUserService, loginService, removeCountService } from '#Controllers/userController.js'
import {tokenValidate} from '#Validations/customGeneralValidations.js'

const dateRoute = Router()
dateRoute.use(express.urlencoded({extended: true}))
//! Sirve para que el front pueda acceder a la informacion que da el backend
dateRoute.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin','*');
    res.setHeader('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');
    res.setHeader('Access-Control-Allow-Methods','Content-Type','Authorization');
    next(); 
})

dateRoute.post('/inicioSesion', loginService)
dateRoute.post('/traerUser', getUserService)
dateRoute.post('/crearCuenta', createCountService)
dateRoute.delete('/eliminarCuenta', removeCountService)
dateRoute.get('/fechas', tokenValidate, displayDatesService)
dateRoute.get('/unaFecha', displayDateService)
dateRoute.post('/guardarFecha', saveDateService)
dateRoute.put('/modificarFecha', modifyDateService)
dateRoute.delete('/eliminarFecha', removeDateService)

export default dateRoute