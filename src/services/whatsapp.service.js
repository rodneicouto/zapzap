const temporaryData = {};
import { getProperty } from '../utilities/config.utils.js';
import * as FileService from './file.service.js';
import unidecode from 'unidecode';
import NodeCache from 'node-cache'

const EXPIRATION_TIME = Number(getProperty('MESSAGE_LIFETIME', '30'));

const myCache = new NodeCache();

let messages;

function addToTemporaryData(key, value) {
    myCache.set(key, value, EXPIRATION_TIME);
}

export async function cleanMessage() {
    messages = undefined;
}

export async function receiveMessage(userId, message) {
    console.log( "#####################")
    console.log( 'from: ' + userId + " | " + message)
    if( !messages) {
        console.log( 'Lendo arquivos ');
        messages = await FileService.readFiles();
    }
    message = message || '';
    let currentMessage = myCache.get(userId);
    if( !currentMessage) {
        //primeira msg
        let initial = messages['_initial_'];
        addToTemporaryData(userId, initial.id);
        return initial.conteudo;        
    }
    currentMessage = messages[currentMessage];
    console.log(currentMessage);
    message =  unidecode(message.toLowerCase());
    if( currentMessage.rotas[message] != null ) {
        let _newMessage = messages[currentMessage.rotas[message]];
        if( _newMessage ) {
            if(_newMessage.menu ) {
                addToTemporaryData(userId, _newMessage.id);
                return `${_newMessage.conteudo}\n\n${_newMessage.menu}`;
            }
            else {
                myCache.del(userId);
                return `${_newMessage.conteudo}`
            }         
        }               
    }
    else {
        return `Opção inválida. Por favor escolha umas das opções do menu abaixo.\n\n${currentMessage.menu || ''}`
    }

    return null;
}