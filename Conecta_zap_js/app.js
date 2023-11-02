const qrcode = require('qrcode-terminal');
const fs = require('fs');
const { Client, LegacySessionAuth } = require('whatsapp-web.js');

// Path where the session data will be stored
const SESSION_FILE_PATH = './session.json';

// Load the session data if it has been previously saved
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = require(SESSION_FILE_PATH);
}

// Use the saved values
const client = new Client({
    authStrategy: new LegacySessionAuth({
        session: sessionData,
    })
});

// Save session values to the file upon successful auth
client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});
 
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');

     // Number where you want to send the message.
    const num1 = "+557488745712";
    const num2 = "+558396575302";
    const num3 = "+558396953144";

    // Your message.
    const text = "Iniciando...";
    const text2 = "Passou duas horas...";

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId1 = num1.substring(1) + "@c.us";
    console.log(num1.substring(1))
    const chatId2 = num2.substring(1) + "@c.us";
    const chatId3 = num3.substring(1) + "@c.us";

    // Sending message. 
    client.sendMessage(chatId1, text);
    //client.sendMessage(chatId2, text);
    //client.sendMessage(chatId3, text);

    if (new Date().getMinutes() == 30){
        client.sendMessage(chatId1, text);
    }
});

client.on('message', message => {
    if(message.body === 'Zip') {
        message.reply('Zop');
    }
});

client.on('message_create', message => {
    if(message.body === 'Zip') {
        message.reply('Zop');
    }
});

client.initialize();
 