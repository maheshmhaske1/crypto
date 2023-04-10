const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authenticateUser = auth.authenticate_user

const crypto = require('../controller/cryptoController')

router.get('/get-news', authenticateUser, crypto.getCryptoNews)
router.get('/get-detail/:currency_name', authenticateUser, crypto.getCryptoDetails)
router.get('/get-topGainerLoser', authenticateUser, crypto.getTopGainerAndLoser)
router.get('/get-top100', authenticateUser, crypto.getTop50)

module.exports = router
