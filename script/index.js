// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => {
    // abrir o data_cobranca como uma lista de maps [["nome", "celular","CadUser"], ["nome", "celular","CadUser"]]
    for (let i = 0; i < coisa.lenght(); i++)
      let numeroTratado = coisa[i].celular;

    start(client), client.sendText(`${numeroTratado}@c.us`, 'Pomba 8==>')
    })
  .catch((erro) => {
    console.log(erro);
  });

function start(client) {
  client.onMessage((message) => {

    if (message.body === 'Hi' && message.isGroupMsg === false) {
      client
        .sendText(message.from, 'Danilo gostoso lindo michellangelo grosso')
        .then((result) => {
          console.log('Result: ', result); //return object success
        })
        .catch((erro) => {
          console.error('Error when sending: ', erro); //return object error
        });
    }
  });
}
