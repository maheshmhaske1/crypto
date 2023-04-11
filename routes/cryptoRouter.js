const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const authenticateUser = auth.authenticate_user

const crypto = require('../controller/cryptoController')

router.get('/get-news', crypto.getCryptoNews)
router.get('/get-detail/:currency_name', crypto.getCryptoDetails)
router.get('/get-topGainerLoser', crypto.getTopGainerAndLoser)
router.get('/get-top100', crypto.getTop50)

module.exports = router
