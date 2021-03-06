const express = require('express')
const cors = require('cors')
const path = require('path')
const expressSession = require('express-session')
const app = express()
const http = require('http').createServer(app)

// Express App Config
const session = expressSession({
    secret: 'coding is amazing',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})
app.use(express.json())
app.use(session)

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public/mister-BITcoin')))
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:4200', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        credentials: true
    }
    app.use(cors(corsOptions))
}
const authRoutes = require('./api/auth/auth.routes')
const contactRoutes = require('./api/contact/contact.routes')
const {connectSockets} = require('./services/socket.service')

//routes
const setupAsyncLocalStorage = require('./middlewares/setupAls.middleware')
app.all('*', setupAsyncLocalStorage)
app.use('/api/auth', authRoutes)
app.use('/api/contact', contactRoutes)
connectSockets(http, session)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030
http.listen(port, () => {
    logger.info('Server is running on port: ' + port);
})