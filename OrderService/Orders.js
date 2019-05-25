const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const amqp = require("amqplib/callback_api");
app.use(bodyParser.json());
const Message_listener = require("./Message_listener");

// receive events
const qname = "orderQ";
const msgKey = "orderKey";
const ex = "Orderexc";

//Ampq connect
amqp.connect(
  "amqp://zbundxlc:KDCLeX8RyS5d4lvHp-oZYDxnT32wmOUQ@bear.rmq.cloudamqp.com/zbundxlc",
  (err, conn) => {
    conn.createChannel((err, ch) => {
      var queue = "Firstqueue";
      var message = { type: "2", content: "Hello Rabbit" };

      ch.assertQueue(queue, { durable: false });
      ch.publish(queue, Buffer.from(JSON.stringify(message)));
      console.log("Message was sent");
    });
  }
);

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
  Message_listener.consume().then(function(res) {
    console.log(res);
    order
      .save()
      .then(() => {
        console.log("Order created with succes");
      })
      .catch(err => {
        throw err;
      });

    res.send("Order has been added!");
  });
});

// Model is Loaded
require("./Order");
const Order = mongoose.model("Order");

app.listen(8081, () => {
  console.log("Orders - up running");
});
