const express = require('express');
const { favouriteController } = require('../controllers/favourites/fav.controller');
const router = express.Router()

router.post('/fav', favouriteController)

module.exports = router