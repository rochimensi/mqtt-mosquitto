let mqtt = require('mqtt');
let prompt = require('prompt');
let client  = mqtt.connect(process.env.MOSQUITTO_HOST);
let clients = {};

let processConnection = () => {
  prompt.get(['nameTopic'], (err, result) => {
    if(!result.nameTopic) return processConnection();

    // clientName;topic
    let clientName = result.nameTopic.split(';')[0];
    let topic = result.nameTopic.split(';')[1];
    client.subscribe(topic);
    clients[client.options.clientId] = {
      who: clientName,
      topic: topic
    };
    prompt.get(['message'], processMessage);
  });
};

let processMessage = (err, result) => {
  let payload = {
    name: clients[client.options.clientId].who,
    msg: result.message,
    sent_at: new Date()
  };
  client.publish(clients[client.options.clientId].topic,  JSON.stringify(payload));
  prompt.get(['message'], processMessage);
};

client.on('connect', () => {
  prompt.start();
  processConnection();
});

client.on('message', (topic, message) => {
  let mensaje = message.toString();
  let payload = JSON.parse(mensaje);
  console.log(`[${payload.sent_at},${payload.city}]${payload.name}:${payload.msg}`);
  if(JSON.parse(mensaje).msg.indexOf("EXIT_ROOM") > -1) {
    prompt.stop();
    client.end();
  }
});
