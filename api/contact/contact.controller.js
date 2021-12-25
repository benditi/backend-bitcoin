const contactService = require('./contact.service')
const bcrypt = require('bcrypt')

async function getContacts(req, res){
    try {
        var queryParams = req.query;
        console.log('inside controller');
        const users = await contactService.query(queryParams) 
        res.send(users)
    } catch(err) {
        res.status(500).send({ err: 'Failed to get users' })
    }
}

async function getContact(req, res){
    console.log('inside one');
    try {
        console.log('req.params.id', req.params.id);
        const contact = await contactService.getById(req.params.id)
        res.send(contact) 
    } catch (err) {
        res.status(500).send({ err: 'Failed to get contact' })
    }
}
async function updateContact(req, res){
    try {
        const contact = req.body
        const savedContact = await contactService.update(contact)
        res.send(savedContact)
    } catch (err){
        res.status(500).send({ err: 'Failed to update contact' }) 
    }
}

async function addContact(req, res){
    try {
        const contact = req.body;
        contact.coins =100;
        const saltRounds = 10
        const password = '1234';
        const hash = await bcrypt.hash(password.toString(), saltRounds)
        contact.password = hash;
        contact.myContacts = [];
        contact.isAdmin = false;
        console.log('controller contact', contact);
        const addedContact = await contactService.add(contact)
        res.json(addedContact)
      } catch (err) {
        res.status(500).send({ err: 'Failed to add contact' })
      }
}

async function removeContact(req, res) {
    try {
      console.log('backend-remove-data', req.params);
      const contactId = req.params.id;
      const removedId = await contactService.remove(contactId)
      res.send(removedId)
    } catch (err) {
      logger.error('Failed to remove contact', err)
      res.status(500).send({ err: 'Failed to remove contact' })
    }
  }


module.exports = {
    getContacts,
    getContact,
    updateContact,
    addContact,
    removeContact
}