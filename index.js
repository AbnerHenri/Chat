const express = require('express')
const app = express();
const path = require('path')
const socketIo = require('socket.io')

app.use('/', express.static(path.join(__dirname, 'public')))


const server = app.listen(3000, ()=>{ console.log('Server Running') })

const io = socketIo(server)

const messages = []

io.on('connection', (socket)=>{
    console.log('New Connection')
    
    socket.on('new_message', (data)=>{
        messages.push(data)
        io.emit('update_message', messages)
    })
})