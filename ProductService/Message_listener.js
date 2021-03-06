var amqp = require("amqplib/callback_api");
// Load mongoose
const mongoose = require("mongoose");
const MP = require("./Message_publisher");
// Using the Product Model
require("./Product");
const Product = mongoose.model("Product");
Isapproved = true;

//Connect
mongoose.connect(
  "mongodb+srv://new-user_31:new-user_31@miniproject-1ksmj.mongodb.net/Product?retryWrites=true",
  () => {
    console.log("DB is connected - Product Service");
  }
);
module.exports.consume = function(ex, qname, msgKey) {
  const amqp_url =
    "amqp://auspdbep:c3dBw8zAlGxWmmeBiIMOT4l559Ohz7yT@macaw.rmq.cloudamqp.com/auspdbep";
  amqp.connect(amqp_url, function(err, conn) {
    conn.createChannel(function(err, ch) {
      ch.assertExchange(ex, "direct", { durable: true });
      ch.assertQueue(
        qname,
        { exclusive: false },
        function(err, q) {
          console.log(
            " [*] Waiting for messages in %s. To exit press CTRL+C",
            q.queue
          );
          ch.bindQueue(q.queue, ex, msgKey);
          ch.consume(
            q.queue,
            function(msg) {
              ch.ack(msg);
              var msgJson = JSON.parse(msg.content.toString());
              console.log(msgJson);
              msgJson.forEach(product => {
                Product.findById(product.ProductId).then(res => {
                  if (res.ItemsInStock < res.ItemsReserved + product.Quantity) {
                    Isapproved = false;
                  }
                });
              });

              if (Isapproved) {
                console.log("1");

                msgJson.forEach(product => {
                  Product.findByIdAndUpdate(product.ProductId, {
                    ItemsReserved: product.ItemsReserved + product.Quantity
                  });
                  console.log("product:", product);
                });
                console.log("1");
                MP.publish("statusOrder", "completed");
              } else {
                console.log("2");

                MP.publish("statusOrder", "cancelled");
              }
            }
          );
        }
      );
    });
  });
};

