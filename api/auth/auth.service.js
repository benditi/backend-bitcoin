const bcrypt = require('bcrypt')
const contactService = require('../contact/contact.service')
const logger = require('../../services/logger.service')

async function login(name, password) {
    logger.debug(`auth.service - login with name: ${name}`)

    const user = await contactService.getByName(name)
    console.log('user', user);
    if (!user) return Promise.reject('Invalid name or password')
    const match = await bcrypt.compare(password, user.password)
    console.log('match', match);
    if (!match) return Promise.reject('Invalid name or password')
    delete user.password
    return user
}

async function signup(name, password) {
    const saltRounds = 10
    logger.debug(`auth.service - signup with name: ${name}`)
    if (!name || !password) return Promise.reject('name and password are required!')
    console.log('auth-service', name, password,);
    const hash = await bcrypt.hash(password.toString(), saltRounds)
    console.log('auth-service hash', hash);
    return contactService.add({
        name,
        password: hash,
        phone: '',
        email: '',
        coins: 100,
        moves: [],
        myContacts: [],
        isAdmin: false
    })
}

module.exports = {
    signup,
    login,
}