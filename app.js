const express = require('express')
const app = express()
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const port = process.env.PORT || '3000'
const rCinema = require("./routers/movie")
const rDirector = require("./routers/director")


mongoose.connect("mongodb://localhost:27017/api")
const db = mongoose.connection
db.on('open' , ()=>console.log("mongodb running"))
db.on('error' , ()=>console.log(err))

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use(rCinema)
app.use(rDirector)


app.listen(port, () => console.log("server running"))