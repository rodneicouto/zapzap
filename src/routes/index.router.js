import express from 'express';
import { getProperty } from '../utilities/config.utils.js';
import whatssAppRouter from './whatsapp.router.js';

var router = express.Router();

router.use( `${getProperty('URL_BASENAME', '')}/`, whatssAppRouter);

router.get('*', (req, res) => res.status(400).send({
  message: 'Bad request.',
}));

export default router;