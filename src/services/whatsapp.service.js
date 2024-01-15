const temporaryData = {};
import { getProperty } from '../utilities/config.utils.js';
import * as FileService from './file.service.js';
import unidecode from 'unidecode';
import NodeCache from 'node-cache'

const EXPIRATION_TIME = Number(getProperty('MESSAGE_LIFETIME', '30'));

const myCache = new NodeCache();

const notAnswerCache = new NodeCache();

let messages;

function addToTemporaryData(key, value) {
    myCache.set(key, value, EXPIRATION_TIME);
}

export async function cleanMessage() {
    messages = undefined;
}

export function markToNotAnswer(userId, time) {
    if( !time) {
        time = 12 * 60 * 60; //12horas
    }
    notAnswerCache.set(userId, true, time ); //12horas
}

export async function receiveMessage(userId, message) {  
    if( !messages) {
        console.log( '** Lendo Arquivos **');
        messages = await FileService.readFiles();
    }
    message = message || '';
    if( notAnswerCache.get(userId) ) {
        //significa q respondeu e ficara sem o bot por 12 horas
        return null;
    }
    let currentMessage = myCache.get(userId);
    if( !currentMessage) {
        //primeira msg
        let initial = messages['_initial_'];
        addToTemporaryData(userId, initial.id);
        return `${initial.conteudo}\n\n${initial.menu}`;
    }
    currentMessage = messages[currentMessage];
    message =  unidecode(message.toLowerCase());
    let _messageRota = currentMessage.rotas[message];
    if( _messageRota == null ) {
        _messageRota = currentMessage.rotas['*'];
    }
    if( _messageRota != null ) {
        let _newMessage = messages[_messageRota];
        if( _newMessage ) {
            addToTemporaryData(userId, _newMessage.id);
            //verifia se o ultimo digoto do id da msg nova é T
            if( _newMessage.id.endsWith('t')) {
                //se for com T eh terminal e volta ao comeco
                myCache.del(userId);
            }
            if( _newMessage.id.endsWith('a')) {
                myCache.del(userId);
                //se for com A coloca 5 minutos para digitar mais 
                markToNotAnswer(userId, 5 * 60);
            }
            return `${_newMessage.toString()}`            
        }               
    }
    else {
        return `Opção inválida. Por favor escolha umas das opções do menu abaixo.\n\n${currentMessage.menu || ''}`
    }

    return null;
}