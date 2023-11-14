// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
const venom = require('venom-bot');

const fs = require('fs');

// Caminho para o arquivo JSON
const caminhoArquivo = 'data_cobranca.json';
var dados_cobranca = 0;

// Lê o conteúdo do arquivo


venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => {
    // abrir o data_cobranca como uma lista de maps [["nome", "celular","CadUser"], ["nome", "celular","CadUser"]]
    let tamanho_dados = Object.keys(dados_cobranca).length;

    let numeros = enviaZap();
    let mensagem = 'Pomba 8==>';

    for (let i = 0; i < numeros.length; i++){
      client.sendText(`${numeros[i]}@c.us`, mensagem);
    }

    start(client), client.sendText(`${numeroTratado}@c.us`, mensagem);
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


function enviaZap (){

    let numeros = [];

    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
        if (err) {
          console.error('Erro ao ler o arquivo:', err);
          return;
        }
        try {
          // Converte o conteúdo para um objeto JavaScript
           const dados = JSON.parse(data);
      
            let tamanho_dados = Object.keys(dados).length;
      
            for (let i = 0; i < dados; i++){
              let numeroTratado = dados[i].celular;
              numeros.push(numeroTratado);
            }
      
            return numeros;
      
        } 
        catch (parseError) {
          console.error('Erro ao analisar o JSON:', parseError);
        }
    });
}
