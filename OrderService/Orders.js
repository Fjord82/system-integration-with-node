const express = require("express")
const app = express()
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const channel = require("./Publisher")
app.use(bodyParser.json())

 //Connect
mongoose.connect("mongodb+srv://new-user_31:new-user_31@miniproject-1ksmj.mongodb.net/Order?retryWrites=true", () => {
    console.log("DB is connected - Orders");
});
var oChannel;

app.post("/order", (req, res) => {
    if (!oChannel) {
        oChannel = await channel();
      }
   
    var newOrder = {
        Date: req.body.Date,
        ProductOrder: req.body.ProductOrder,
        Status: req.body.Status
    }

    var order = new Order(newOrder);

    order.save().then(() => {
        console.log("Order created with succes")
    }).catch((err) => {
        throw err;
    });

    res.send("Created Order!");
})

// Model is Loaded
require("./Order")
const Order = mongoose.model("Order")

app.listen(8081, () => {
    console.log("Orders - up running");
})