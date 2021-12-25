const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    console.log('inside login');
    const { name, password } = req.body
    console.log('name, password', name, password);
    try {
        const user = await authService.login(name, password)
        req.session.user = user
        console.log('controller user', user);
        res.json(user)
    } catch (err) {
        logger.error('Failed to Login ' + err)
        res.status(401).send({ err: 'Failed to Login' })
    }
}

async function signup(req, res) {
    try {
        const { name, password } = req.body
        const account = await authService.signup(name, password)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const user = await authService.login(name, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        logger.error('Failed to signup ' + err)
        res.status(500).send({ err: 'Failed to signup' })
    }
}

module.exports = {
    login,
    signup
}