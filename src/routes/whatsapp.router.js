import * as controller from '../controllers/whatsapp.controller.js';

import express from 'express';

let router = express.Router();

router.get( '/start', controller.start );
router.post( '/message', controller.message );
router.post( '/clean', controller.clean );

export default router;