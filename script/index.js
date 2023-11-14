// Supports ES6
// import { create, Whatsapp } from 'venom-bot';
//const venom = require('venom-bot');

const fs = require('fs');

// Caminho para o arquivo JSON
const caminhoArquivo = 'data_cobranca.json';
var dados_cobranca = 0;

// Lê o conteúdo do arquivo
fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
  if (err) {
    console.error('Erro ao ler o arquivo:', err);
    return;
  }
  x = 1;
  try {
    // Converte o conteúdo para um objeto JavaScript
     const dados = JSON.parse(data);

      dados_cobranca = dados;

    // Teste, apagar depois
      //console.log('Conteúdo do arquivo JSON:', dados);

      //console.log(typeof dados);

      console.log(dados[0].nome);

      console.log(dados_cobranca[0].nome);

      let tamanho_dados = Object.keys(dados_cobranca).length;

      for (let i = 0; i < tamanho_dados; i++){
        let numeroTratado = dados[i].celular;
        if(numeroTratado == ""){
          console.log("Sem numero");
        }
        console.log(numeroTratado);
      }


  } catch (parseError) {
    console.error('Erro ao analisar o JSON:', parseError);
  }
});





/*
venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => {
    // abrir o data_cobranca como uma lista de maps [["nome", "celular","CadUser"], ["nome", "celular","CadUser"]]
    let tamanho_dados = Object.keys(dados_cobranca).length;

    for (let i = 0; i < tamanho_dados; i++){
      let numeroTratado = dados[i].celular;
    }

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
*/