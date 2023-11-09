const wppconnect = require('@wppconnect-team/wppconnect');

wppconnect.create({
    // ...
    session: 'mySessionName',
    //isLogged: "isLogged",
    puppeteerOptions: {
      userDataDir: './tokens/mySessionName', // or your custom directory
    },
    // ...
  }).then((client) => {
    // Enviar uma mensagem de texto
    client
      .sendText('558396575302@c.us', 'Sua mensagem de texto aqui')
      .then((response) => {
        console.log('Mensagem enviada com sucesso:', response);
      })

      .catch((error) => {
        console.error('Erro ao enviar mensagem:', error);
      });
  })
  .catch((error) => console.log(error));

  /*
  wppconnect.create({
    // ...
    session: 'mySessionName',
    puppeteerOptions: {
      userDataDir: './tokens/mySessionName', // or your custom directory
    },
    // ...
  }).then((client) => start(client))
  .catch((error) => console.log(error));
  */
