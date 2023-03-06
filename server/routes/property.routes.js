import express from 'express'

import {createProperty, deleteProperty, getAllProperties,getPropertyDetail,updateProperty, getSearchProperties} from '../controllers/property.controller.js'

const router = express.Router();

router.route('/').get(getAllProperties);
router.route('/').post(createProperty);
router.route('/:id').get(getPropertyDetail);
router.route('/:id').patch(updateProperty);
router.route('/:id').delete(deleteProperty);

export default router;