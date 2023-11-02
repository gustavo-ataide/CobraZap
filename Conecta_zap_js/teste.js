const fs = require('fs');
const qrcode = require('qrcode-terminal');
const { Client, LocalAuth} = require('whatsapp-web.js');

// Caminho onde os dados da sessão serão armazenados
const SESSION_FILE_PATH = './session.json';

// Carrega os dados da sessão se eles foram salvos anteriormente
let sessionData;
if (fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Usa os valores salvos
const client = new Client({
    authStrategy: sessionData ? new LocalAuth({ session: sessionData }) : new LocalAuth()
});
console.log(client)
// Salva os valores da sessão no arquivo após a autenticação bem-sucedida
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});
console.log("Autentifiquei????")
// Exibe o QR code para autenticação se não houver dados de sessão salvos
if (!sessionData) {
    console.log("Entreii???")
     
    client.on('qr', qr => {
        console.log("Entreii 2???")
        qrcode.generate(qr, {small: true});
    });
}

// Inicializa o cliente
client.initialize();