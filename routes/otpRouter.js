var express = require('express');
var router = express.Router();
const otpController = require('../controller/otp.controller')

router.post('/send', otpController.sendOtp)
router.get('/send/:mobile', otpController.sendOtpMobile)
router.post('/verify', otpController.verifyOtp)

module.exports = router;
