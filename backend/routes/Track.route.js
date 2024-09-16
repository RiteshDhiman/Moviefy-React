const express = require('express');
const trackMovie = require('../controllers/tracking/movieTrack.controller');
const trackTv = require('../controllers/tracking/tvTrack.controller');
const fetchTracking = require('../controllers/fetch/fetchTracking');

const router = express.Router();

router.post('/movie', trackMovie)
router.post('/tv', trackTv)
router.get('/fetch', fetchTracking)

module.exports = router