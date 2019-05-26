var amqp = require("amqplib/callback_api");
// Load mongoose

module.exports.consume = function(ex, qname, msgKey) {
  const amqp_url =
    "amqp://auspdbep:c3dBw8zAlGxWmmeBiIMOT4l559Ohz7yT@macaw.rmq.cloudamqp.com/auspdbep";
  amqp.connect(amqp_url, function(err, conn) {
    conn.createChannel(function(err, ch) {
      ch.assertExchange(ex, "direct", { durable: true });
      ch.assertQueue(qname, { exclusive: false }, function(err, q) {
        console.log(
          " [*] Waiting for messages in %s. To exit press CTRL+C",
          q.queue
        );
        
        
        ch.bindQueue(q.queue, ex, msgKey);
        ch.consume(q.queue , function(msg) {
          ch.ack(msg);
          var msgJson = JSON.parse(msg.content.toString());
          console.log(msgJson);
          
          return msgJson;
        });
        
     
    });
  });
});
}
