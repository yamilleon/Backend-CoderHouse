const express = require('express');
const moment = require('moment');
const { Router } = require('express')
const contAiner = require("./contArch");
const fileProducts = new contAiner('../products.txt');
const filePurchase = new contAiner('../purchase.txt');

const routerSession = new Router()

const routerProducts = new Router()
routerProducts.use(express.json())
routerProducts.use(express.urlencoded({ extended: true}))

const routerPurchase = new Router()
routerPurchase.use(express.json())
routerPurchase.use(express.urlencoded({extended: true}))

let soyAdmin = false;
//Verify si el admin es true?
function soloAdmins (req, res, next) {
    if(soyAdmin) {
        next()
    } else {
        const text = `ruta ${req.originalUrl},metodo ${req.method} Not authorized`
        res.json({ error: -1, descripcion: text })
    }
}

// product date
const getDate = () => {
    const daTe = moment();
    return daTe.format("DD/MM/YYYY HH:mm:ss")
}

const codeGenerator = async () => {
    const dataProducts = await fileProducts.retrive()
    let exit = true;
    //generate
    while (exit) {
        let code = parseInt(Math.random() * 100) + 1
        const codeExist = dataProducts.find(element => element.code == code)
        if (!codeExist){
            return code ;
        }
    }
}

//Ruta Principal : api/sesion/
//api/sesion/login
routerSession.get('/login', (req, res) => {
    soyAdmin = true
    res.sendStatus(200)
})
//api/sesion/logout
routerSession.get('/logout', (req, res) => {
    soyAdmin = false
    res.sendStatus(200)
})

//Ruta Principal: api/productos/
//api/productos/
routerProducts.get("/", (req, res) => {
    fileProducts.retrive().then(prods => {
        res.json(prods)
    })
})
//api/productos/:id
routerProducts.get("/:id", (req, res) => {
    let id = parseInt(req.params.id);
    fileProducts.retriveId(id).then(prods => {
        res.json(prods)
    })
})
//api/productos/
routerProducts.post("/", soloAdmins, async (req, res) => {
    const code = await codeGenerator();
    const date = getDate()
    const obj = {...req.body, code, date }
    fileProducts.save(obj).then(prods => {
        res.json(prods)
    })
})
//api/productos/:id
routerProducts.put("/:id", soloAdmins, async (req, res) => {
    const code = await codeGenerator();
    const date = getDate()
    const obj = {...req.body, code, date }
    let id = parseInt(req.params.id);
    fileProducts.update(obj, id).then(prods => {
        res.json(prods)
    })
})
//api/productos/:id
routerProducts.delete("/:id", soloAdmins, (req, res) => {
    let id = parseInt(req.params.id);
    fileProducts.delete(obj, id).then(prods => {
        res.json(prods)
    })
})

//Ruta Principal:api/carrito/
//api/carrito
routerPurchase.post("/", (req, res) => {
    const carrito = {productos: [], timestamp: getDate()}
    filePurchase.save(carrito).then(carrito => {
        res.json(carrito.id)
    })
})
//api/carrito/:id
routerPurchase.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id);
    filePurchase.retriveId(id).then(carrito => {
        carrito.productos = []
        filePurchase.update(carrito, id).then(arrayCarrito => {
            res.json(arrayCarrito)
        })
    })
})
//api/carrito/:id/productos
routerPurchase.get("/:id/productos", (req, res) => {
    const id = parseInt(req.params.id);
    filePurchase.retriveId(id).then(carrito => {
        res.json(carrito.productos)
    })
})

//api/carrito/:id/productos/
routerPurchase.post("/:id/productos/", (req, res) => {
    const id = parseInt(req.params.id);
    const id_prod = req.body.id;
    filePurchase.retriveId(id).then(carrito =>{
        return fileProducts.retriveId(id_prod).then(prods => {
            carrito.productos.push(prods)
            return carrito
        })
    }).then(carrito => {
        filePurchase.update(carrito, id).then(compraUpdate => {
            res.json(compraUpdate)
        })
    })
})
//api/carrito/:id/productos/:id_prod
routerPurchase.delete("/:id/productos/:id_prod", (req, res) =>{
    const id = parseInt(req.params.id);
    const id_prod = parseInt(req.params.id_prod);
    filePurchase.retriveId(id).then(carrito => {
        const arraAux = carrito.productos.filter(item => item.id != id_prod);
        carrito.productos.splice(0)
        carrito.productos.push(...arraAux)
        return carrito
    }).then(carrito => {
        filePurchase.update(carrito, id).then(compraUpdate => {
            res.json(compraUpdate)
        })
    })
})

module.exports = {
    routerProducts, routerPurchase, routerSession
}