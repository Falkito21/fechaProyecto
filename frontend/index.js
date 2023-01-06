const express = require('express')

const app = express()

app.use(express.static('views'))
app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.get('/fecha', (req, res) => {
    res.sendFile(__dirname+'/views/index.html')
})
app.get('*', (req, res) => {
    const {method, url} = req
    res.status(404).send(
        `
        <h1>Resurso no encotrado</h1>
        <p>URL solicitada: [${method}] ${url}</p>
        <p>Fecha y hora: ${new Date().toLocaleString()}</p>
        `
    )
})

PORT = 3200
const server = app.listen(PORT, () => console.log('Servidor Express a la escucha en el puerto: ' + PORT))
 server.on('error', error => console.error(`Error al tratar de iniciar el servidor Express en el puerto: ` + PORT + '. EL error es el siguiente: ' + error.message))