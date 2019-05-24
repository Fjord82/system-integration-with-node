const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
app.use(bodyParser.json())

mongoose.connect()

app.listen(8081, () => {
    console.log("Orders - up running");
})