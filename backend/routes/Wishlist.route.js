const express = require('express');
const { addToWishList } = require('../controllers/watchlater/addToWishlist.controller.js');
const fetchWatclist = require('../controllers/fetch/fetchWatchlist.js');
const deleteWatchlist = require('../controllers/watchlater/deleteWatchlist.js');

const router = express.Router();

router.post('/wishlist', addToWishList)
router.get('/watchlist', fetchWatclist)
router.post('/wishlistRemove', deleteWatchlist)


module.exports = router