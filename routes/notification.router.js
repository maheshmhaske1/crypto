const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const authenticateUser = auth.authenticate_user

const notification = require('../controller/notification.controller')

router.post('/add',authenticateUser,notification.createNotification)
router.post('/get',authenticateUser,notification.getNotification)
router.post('/mark-read',authenticateUser,notification.markNotificationAsRead)
router.post('/mark-all-read',authenticateUser,notification.markAllNotificationAsRead)

module.exports = router
