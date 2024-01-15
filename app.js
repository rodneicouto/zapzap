import express from 'express';

import {Client} from 'whatsapp-web.js';
import qrcode from 'qrcode-terminal';
import * as whatsappService from './src/services/whatsapp.service.js';

import logger from 'morgan';
import bodyParser from 'body-parser'
import indexRoutes from './src/routes/index.router.js';
const app = express();

//Handler http request data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

app.use('/',indexRoutes);

app.use(logger('dev'));

const client = new Client({
	puppeteer: {
		args: ['--no-sandbox'],
	}
})

client.on('qr', (qr) => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', (msg) => {
    // Fired on all message creations, including your own
        if (msg.fromMe) {
            whatsappService.markToNotAnswer(msg.to)            
        }
});
    

client.on('message', async message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
    else {
        let chat = await message.getChat();
        console.log( 'MSG: ' + message.from + " | " + message.body);
        if (chat.isGroup) {
            //faz nada, ignora grupo
            console.log( 'ignora msg de grupo');
        } else {
            let _message = await whatsappService.receiveMessage(message.from, message.body)
            if( _message) {
                message.reply(_message); 
            }
        }       
    }
    
});
 

client.initialize();


export default app;