const express = require('express')
const {getContacts, getContact, updateContact, addContact, removeContact} = require('./contact.controller')
const router = express.Router()
const {requireAuth} = require('../../middlewares/requireAuth.middleware')

router.get('/', getContacts)
router.get('/:id', getContact)
router.put('/:id', requireAuth, updateContact)
router.post('/', addContact)
router.delete('/:id', removeContact)
module.exports = router