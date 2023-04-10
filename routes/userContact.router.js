const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const authenticateUser = auth.authenticate_user

const userContact = require('../controller/contact.controller')

router.post('/add', authenticateUser, userContact.addCOntact)
router.get('/get/:userId', authenticateUser, userContact.getAllContact)
router.post('/edit', authenticateUser, userContact.editContact)
router.delete('/delete/:contactId', authenticateUser, userContact.deleteContact)

module.exports = router
