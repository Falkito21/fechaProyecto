import express from 'express'
import path from 'path'


const app = express()

app.use(express.static(path.join(process.cwd(), 'views')))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.get('/',  (req, res) => {
    res.sendFile(path.join(process.cwd(),'views' ,'inicio.html'))
})
app.get('/fechas',  (req, res) => {
    res.sendFile(path.join(process.cwd(),'views/html' ,'index.html'))
})
app.get('/sessionUser',  (req, res) => {
    res.sendFile(path.join(process.cwd(),'views' ,'inicio.html'))
})
app.get('/createUser',  (req, res) => {
    res.sendFile(path.join(process.cwd(),'views/html' ,'crearCuenta.html'))
})
app.get('*', (req, res) => {
    const {method, url} = req
    res.status(404).send(
        `
        <h1>Página no encontrada</h1>
        <p>URL solicitada: [${method}] ${url}</p>
        <p>Fecha y hora: ${new Date().toLocaleString()}</p>
        `
    )
})
const PORT = 3200
const server = app.listen(PORT, () => console.log('Servidor Express a la escucha en el puerto: ' + PORT))
 server.on('error', error => console.error(`Error al tratar de iniciar el servidor Express en el puerto: ` + PORT + '. EL error es el siguiente: ' + error.message))