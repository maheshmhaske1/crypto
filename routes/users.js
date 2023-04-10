var express = require('express');
var router = express.Router();
const userController = require('../controller/user.controller')
const userWallet = require('../controller/userWallet.controller')


/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});


router.post('/create', userController.createUser)
router.post('/login', userController.login)
router.post('/is-found', userController.isUserExist)
router.post('/reset-password', userController.resetPassword)

router.post('/wallet/add', userWallet.addInWallet)
router.get('/wallet/:userId', userWallet.getWalletDetails)


module.exports = router;
