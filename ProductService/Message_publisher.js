
const amqp = require('amqplib/callback_api');

const amqp_url = "amqp://auspdbep:c3dBw8zAlGxWmmeBiIMOT4l559Ohz7yT@macaw.rmq.cloudamqp.com/auspdbep";

module.exports.publish = function(msgKey, msgPayload )
{   
  amqp.connect(amqp_url, function(err, conn) {
      conn.createChannel(function(err, ch) {
        const exch = 'confirmOrderExc';
        
        ch.assertExchange(exch, 'direct', {durable: true});
        try {
            ch.publish(exch, msgKey, Buffer.from(JSON.stringify(msgPayload)));
        } catch (error) {
            throw error
        }
        
        return '';
      });   
      setTimeout(function() { conn.close();}, 500);
      console.log("closed channel");
    });

}; 