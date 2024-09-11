const express = require('express');
const { addToWishList } = require('../controllers/addToWishlist.controller.js');
const fetchWatclist = require('../controllers/fetchWatchlist.js');
const deleteWatchlist = require('../controllers/deleteWatchlist.js');

const router = express.Router();

router.post('/wishlist', addToWishList)
router.get('/watchlist', fetchWatclist)
router.post('/wishlistRemove', deleteWatchlist)


module.exports = router