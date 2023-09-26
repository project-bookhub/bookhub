const express = require("express")
const app = express()
require("dotenv").config()
const port = process.env.serverPort
const nunjucks = require("nunjucks")

const router = require("./src/index")

app.set("view engine", "html")
nunjucks.configure({
    express: app
})

app.use(router)
app.use((err, req, res, next) => {

    // 4444: DB error
    if (err.message === "4444") res.status(500).send("DB Error!")

});


app.listen(port, () => {
    console.log(`server listen ${port}`)
})