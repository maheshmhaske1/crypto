var express = require('express');
var router = express.Router();
const accountSid = 'AC4c38c1cf8d3f902edbbbe41d980a7dbc';
const authToken = 'bd285e004159b63f964969bd746200f1';
const client = require('twilio')(accountSid, authToken);


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
router.get('/getAll', userController.getAll)
router.get('/get/:userId', userController.getById)
router.delete('/delete/:userId', userController.delete)
router.put('/update/:userId', userController.updateUser)

router.post('/wallet/add', userWallet.addInWallet)
router.get('/wallet/:userId', userWallet.getWalletDetails)


module.exports = router;
