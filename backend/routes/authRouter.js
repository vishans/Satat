const express = require('express');
const router = express.Router();
const controller = require('../controller/authController.js')

router.route('/')
      .post(controller);


module.exports = router;