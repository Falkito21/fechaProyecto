 import express from 'express'
 import {config} from 'dotenv'
 import cors from 'cors'
 import fechaRouter from '#Routes/fechas.routes.js'
console.error("res")
 config()
 const app = express()
 app.set('port', process.env.PORT)
 app.use(express.json())
 app.use(express.urlencoded({extended: false}))
 app.use(cors())
 app.use(fechaRouter)

 export default app