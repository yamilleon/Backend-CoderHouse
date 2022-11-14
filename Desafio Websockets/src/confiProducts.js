const contAiner = require('./contArch')
const contProducts = new contAiner('../protducts.txt')

const idFunction = async () => {
    const products = await contProducts.retrive()
    if (products.length != 0 ) {
        let arrayId = products.map(item => item.id);
        let highId = Math.max(...arrayId);
        id = highId + 1;
    } else id = 1;
    return id
}

const confiSocketProducts = (io) => {
    io.on('connection', socket => {
        socket.emit('idProducts', idFunction());
        
        socket.on('addProducst', async products => {
            console.log(products);
            await contProducts.save(products)
            const productos = await contProducts.retrive()
            io.socket.emit('showProducts', productos)
        })
    })
}

module.exports = {confiSocketProducts}