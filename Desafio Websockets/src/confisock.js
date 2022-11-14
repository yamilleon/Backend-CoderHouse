const contAiner = require('./contArch')
const contMensajes = new contAiner('./mensajes.txt')

const contProductos = new contAiner('./products.txt')

const idFunction = async (product) => {
    const productos = await contProductos.retrive()
    if (productos.length != 0) {
        let arrayId = productos.map(item => item.id);
        let highId = Math.max(...arrayId);
        productos.id = highId + 1;
    } else productos.id = 0
}

const confiSocket = (io) => {
    io.on('connection', socket => {
        socket.emit('conexion', 'succes connection')

        socket.on('mensaje', async mensaje => {
            await contMensajes.save(mensaje)
            const mensajes = await contMensajes.retrive()
            io.sockets.emit('mensajes', mensajes)
        })
        socket.on('getprodcuts', async () => {
            const productss = await contProductos.retrive()
            io.sockets.emit('showProducts', productss)
        })
        socket.on('addProduct', async products => {
            await idFunction(products)
            await contProductos.save(products)
            const productsa = await contProductos.retrive()
            io.sockets.emit('showProducts', productsa)
        })
    })
}
 
module.exports = { confiSocket }