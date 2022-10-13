const express = require('express')
const router = express.Router()

const {userForId, publicationForId} = require('../controllers/searchId.controller')

router.get('/userForId/:id', userForId);

router.get('/publicationForId/:id', publicationForId);

module.exports = router