

const amqp = require('amqplib/callback_api');

const amqp_url = "amqp://zbundxlc:KDCLeX8RyS5d4lvHp-oZYDxnT32wmOUQ@bear.rmq.cloudamqp.com/zbundxlc";

module.exports.publish = function(msgKey, msgPayload)
{
    amqp.connect(amqp_url, function(err, conn) {
        //conn.createChannel(function (err))
    });
}