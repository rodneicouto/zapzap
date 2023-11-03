
import { readFiles } from '../services/file.service.js';
import * as whatsappService from '../services/whatsapp.service.js';

export async function start(req, res) {
  let linhas  = await readFiles();
 // console.log( 'lll', linhas );
  res.status(200).json({ message: 'OK'});
}

export async function message(req, res) {
  let msg = req.body;
  let toSend = await whatsappService.receiveMessage(msg.from, msg.body) 
  res.status(200).json({ message: toSend });
}

export async function clean(req, res) {
  await whatsappService.cleanMessage();
  res.status(200).json({ message: 'OK'});
}
