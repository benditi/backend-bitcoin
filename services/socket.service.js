const asyncLocalStorage = require('./als.service');
const logger = require('./logger.service');

var gIo = null

function connectSockets(http, session) {
    gIo = require('socket.io')(http, {
        cors: {
            origin: '*',
        }
    })
    gIo.on('connection', socket => {
        console.log('New socket', socket.id)
        socket.on('disconnect', socket => {
            console.log('Someone disconnected')
        })
        socket.on('chat topic', topic => {
            if (socket.myTopic === topic) return;
            if (socket.myTopic) {
                socket.leave(socket.myTopic)
            }
            socket.join(topic)
            socket.myTopic = topic
        })
        socket.on('is working', isWorking => {
            console.log('working status', isWorking);
            console.log('topic:', socket.myTopic);
            // emits only to sockets in the same room
            gIo.to(socket.myTopic).emit('is working', isWorking)
        })
    })
}


module.exports = {
    connectSockets,
}