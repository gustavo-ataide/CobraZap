const fs = require('fs');
const venom = require('venom-bot');

const caminhoArquivo = 'data_cobranca.json';

venom
  .create(
    'session-name', //name of session
    (base64Qr, asciiQR) => {
      console.log(asciiQR); // Opcional to log the QR in the terminal
      var matches = base64Qr.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
        response = {};

      if (matches.length !== 3) {
        return new Error('Invalid input string');
      }
      response.type = matches[1];
      response.data = new Buffer.from(matches[2], 'base64');

      var imageBuffer = response;
      require('fs').writeFile(
        'out.png',
        imageBuffer['data'],
        'binary',
        function (err) {
          if (err != null) {
            console.log(err);
          }
        }
      );
    },
    undefined,
    { logQR: false, multidevice: false } // for version not multidevice use false.(default: true)
  )
  .then((client) => {
    enviaZap()
      .then(numeros => {
        let mensagem = 'Pomba 8==>';
        for (let i = 0; i < numeros.length; i++){
          client.sendText(`5583996575302@c.us`, mensagem);
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
  