const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const MP = require("./Message_publisher.js");
const ML = require("./Message_listener");

app.use(bodyParser.json());

//Connect
mongoose.connect(
  "mongodb+srv://new-user_31:new-user_31@miniproject-1ksmj.mongodb.net/Order?retryWrites=true",
  () => {
    console.log("DB is connected - Orders");
  }
);

app.post("/order", (req, res) => {
  var newOrder = {
    Date: req.body.Date,
    ProductOrder: req.body.ProductOrder,
    Status: req.body.Status
  };
  var order = new Order(newOrder);
  console.log(order.ProductOrder);
  MP.publish("orderKey", order.ProductOrder).then(function() {
    ML.consume().then(res => {
      console.log(res);
      order
        .save()
        .then(() => {
          console.log("Order created with succes");
        })
        .catch(err => {
          throw err;
        });
    });
  });

  res.send("Order has been added!");
});

// Model is Loaded
require("./Order");
const Order = mongoose.model("Order");

app.listen(8081, () => {
  console.log("Orders - up running");
});
