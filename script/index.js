const venom = require('venom-bot');
const fs = require('fs');

// Caminho para o arquivo JSON
const caminhoArquivo = 'data_cobranca.json';

venom
  .create({
    session: 'session-name', //name of session
    multidevice: false // for version not multidevice use false.(default: true)
  })
  .then((client) => {
    enviaZap()
      .then(numeros => {
        let mensagem = 'Pomba 8==>';
        for (let i = 0; i < numeros.length; i++){
          client.sendText(`${numeros[i]}@c.us`, mensagem);
        }
      })
      .catch(err => console.error(err));

  })
  .catch((erro) => {
    console.log(erro);
  });


function enviaZap() {
  return new Promise((resolve, reject) => {
    fs.readFile(caminhoArquivo, 'utf8', (err, data) => {
      if (err) {
        console.error('Erro ao ler o arquivo:', err);
        reject(err);
      }
      try {
        const dados = JSON.parse(data);
        let numeros = dados.map(dado => dado.celular);
        resolve(numeros);
      } catch (parseError) {
        console.error('Erro ao analisar o JSON:', parseError);
        reject(parseError);
      }
    });
  });
}
