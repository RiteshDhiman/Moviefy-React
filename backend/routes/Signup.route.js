const express = require('express');
const { signUpEmailPass } = require('../controllers/auth.controller');

const router = express.Router();

router.post('/signup', signUpEmailPass)

module.exports = router