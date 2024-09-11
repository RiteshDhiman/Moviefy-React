const express = require('express');
const { signUpEmailPass } = require('../controllers/signUpEmailPass.controller.js');

const router = express.Router();

router.post('/signup', signUpEmailPass)


module.exports = router