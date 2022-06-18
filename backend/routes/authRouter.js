const express = require('express');
const router = express.Router();
const {signUpPost, signUpView} = require('../controller/authController.js')

router.route('/')
      .post(signUpPost)
      .get(signUpView)


module.exports = router;