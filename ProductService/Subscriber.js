//subscriber.js
var jackrabbit = require('jackrabbit');
var url = process.env.CLOUDAMQP_URL || "amqp://localhost";

var rabbit = jackrabbit(url);
var exchange = rabbit.default();

var hello = exchange.queue({ name: 'example_queue', durable: true });
hello.consume(onMessage);

function onMessage(data,ack) {
  console.log('received:', data);
  ack();
}