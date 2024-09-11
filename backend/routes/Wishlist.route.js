const express = require('express');
const { addToWishList } = require('../controllers/addToWishlist.controller.js');
const fetchWatclist = require('../controllers/fetchWatchlist.js');

const router = express.Router();

router.post('/wishlist', addToWishList)
router.get('/watchlist', fetchWatclist)


module.exports = router