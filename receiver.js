var amqp = require('amqplib');

amqp.connect('amqp:localhost').
  then(conn => {
      return conn.createChannel();
  }).
  then(ch => {
      var q = 'hello';

      ch.assertQueue(q, {durable: true});

      console.log(" [*] Waiting for message in %s. To exit press CTRL + C", q);

      return ch.consume(q, function(msg) {
        var jsonObj = JSON.parse(msg.content.toString());
        console.log("SellerNetworkId: %s", jsonObj.SellerNetworkId);
      }, {noAck: true});
  }).
  catch(err => {
      console.log('Error happened: ', err);
  });
