const express = require('express');
const trackMovie = require('../controllers/movieTrack.controller');
const trackTv = require('../controllers/tvTrack.controller');
const fetchTracking = require('../controllers/fetchTracking');

const router = express.Router();

router.post('/movie', trackMovie)
router.post('/tv', trackTv)
router.get('/fetch', fetchTracking)

module.exports = router