const { Router } = require('express')

const router = new Router()

router.get("/", (req,res) => {
    res.render("pages/form")
})

module.exports = {
    router
}