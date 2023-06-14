 import express from 'express'
 import {config} from 'dotenv'
 import cors from 'cors'
 import routes from '#Routes/routes.js'
 config()
 const app = express()
 app.set('port', process.env.PORT)
 app.use(express.json())
 app.use(express.urlencoded({extended: false}))
 app.use(cors())
 app.use(routes)

 export default app