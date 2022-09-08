const express = require('express')

const productos = require('./Entregable2-D3.js')

const app = express()

const PORT = 8080

app.get('/productos', (req, res) => {
    res.send(productos.getAll())
})

app.get('/productoRandom', (req, res) => {
    res.send(productos.productoRandom())
})

const server = app.listen(PORT, () => {

    console.log(`Servidor escuchando en el puerto ${PORT}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))