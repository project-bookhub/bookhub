const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.serverPort







app.listen(port, () => {
    console.log(`server listen ${port}`)
})