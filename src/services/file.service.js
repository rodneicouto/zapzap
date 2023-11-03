import { createReadStream } from 'fs';
import unidecode from 'unidecode';
import { getProperty } from '../utilities/config.utils.js';
import Mensagem from "../models/message.model.js";

export async function readFiles() {
    let linhas = await readLines();
    let messages;
    let currentMessage;
    let options = 'linha';
    for (let index = 0; index < linhas.length; index++) {
        const linha = linhas[index].trim();
        if (linha.startsWith("::")) {  
            options = 'linha';         
            currentMessage = new Mensagem();
            currentMessage.id = unidecode(linha.split('::').join('').toLowerCase());   
            if( messages == null ) {
                messages = {};
                messages['_initial_'] = currentMessage;
            }
            messages[currentMessage.id] = currentMessage;                    
        }
        else {
            if (linha.startsWith("==")) {
                options = 'menu';    
                continue;
            }
            else if (linha.startsWith(">>")) {
                let rota = linha.split('>>').join('');
                rota = rota.split('->');
                let destino = rota[1];
                let origens = rota[0].split(' OR ');
                for (let index = 0; index < origens.length; index++) {
                    const _origem = origens[index];
                    currentMessage.rotas[unidecode(_origem.trim().toLowerCase())] = unidecode(destino.trim().toLowerCase());
                }
                continue;
            }
            else {
                if( options == 'linha') {
                    if( currentMessage.conteudo ) currentMessage.conteudo+='\n';
                    else currentMessage.conteudo = '';
                    currentMessage.conteudo+=linha;
                }
                else if( options == 'menu') {
                    if( currentMessage.menu ) currentMessage.menu+='\n';
                    else currentMessage.menu = '';
                    currentMessage.menu+=linha;
                }        
            }
        }
    }
    return messages;
   // console.log( JSON.stringify(messages));
}

function readLines() {
    return new Promise( (resolve, reject) => {

        const arquivo = getProperty('MESSAGES');

        const leitor = createReadStream(arquivo, 'utf8');
        const linhas = [];

        leitor.on('data', (dados) => {
            linhas.push(...dados.split('\n'));
        });

        leitor.on('end', () => {
            resolve(linhas);
            console.log('Leitura concluída.');
        });

        leitor.on('error', (err) => {
            console.error('Ocorreu um erro na leitura do arquivo:', err);
        });
    })
}