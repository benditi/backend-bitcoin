const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
module.exports = {
    query,
    getById,
    update,
    add,
    remove,
    getByName
}

async function query(filterBy) {
    try {
        // const criteria = _buildCriteria(filterBy)
        const collection = await dbService.getCollection('contact')
        const contacts = await collection.find().toArray()
        return contacts
    } catch (err) {
        throw err
    }
}

async function getById(contactId) {
    try {
        const collection = await dbService.getCollection('contact')
        // console.log('collection', collection);
        console.log('service contactId', contactId);
        const contact = await collection.findOne({ '_id': ObjectId(contactId) })
        console.log('service contact', contact);
        // delete contact.password
        return contact
    } catch (err) {
    throw err;
    }
}

async function update(contact) {
    try {
        contact._id = ObjectId(contact._id)
        const collection = await dbService.getCollection('contact')
        await collection.updateOne({ _id: contact._id }, { $set: contact })
        return contact; 
    } catch (err) {
        throw err
    }
}

async function add(contact) {
    try {
        const collection = await dbService.getCollection('contact')
        console.log('service collection', collection);
        const addedContact = await collection.insertOne(contact)
        return addedContact
    } catch (err) {
        throw err
    }
}

async function remove(contactId) {
    try {
        const collection = await dbService.getCollection('contact')
        await collection.deleteOne({ '_id': ObjectId(contactId) })
        return contactId
    } catch (err) {
        logger.error(`cannot remove contact ${contactId}`, err)
        throw err
    }
}

async function getByName(name) {
    try {
        const collection = await dbService.getCollection('contact')
        const contact = await collection.findOne({ 'name': name })
        return contact
    } catch (err) {
    throw err;
    }
}