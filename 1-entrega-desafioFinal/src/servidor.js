const express = require('express')
const http = require('http')

const { routerProducts, routerSession, routerPurchase } = require('./router.js')

const app = express();
const httpServer = new http.Server(app)

app.use('/api/sesion/', routerSession)
app.use('/api/productos/', routerProducts)
app.use('/api/carrito/', routerPurchase)


//Error

app.all('*', (req, res) =>{
    const text = `ruta ${req.originalUrl},metodo ${req.method}no implementada`
    res.status(404).json({error: -2, descripcion: text});
})
module.exports = { servidor: httpServer} 