const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.serverPort

const nunjucks = require("nunjucks")

app.set("view engine", "html")
nunjucks.configure({
    express: app
})







app.listen(port, () => {
    console.log(`server listen ${port}`)
})