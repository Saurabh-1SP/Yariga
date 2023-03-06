import express, { request } from 'express'
import Property from '../mongodb/models/property.js';

import {getSearchProperties} from '../controllers/property.controller.js'

const router = express.Router();

router.route('/').get(getSearchProperties)

export default router;
