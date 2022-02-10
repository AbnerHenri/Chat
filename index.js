const express = require('express')
const app = express();
const path = require('path')
const socketIo = require('socket.io')

app.use('/games', express.static(path.join(__dirname, 'public')))
app.use('/animes', express.static(path.join(__dirname, 'public')))
app.use('/filmes', express.static(path.join(__dirname, 'public')))
app.use('/musica', express.static(path.join(__dirname, 'public')))

const server = app.listen(3000, ()=>{ console.log('Server Running') })

const io = socketIo(server)

const messages = {games: [], animes: [], filmes: [], musica:[]}

// ------------------------------------------------------------- //

const games = io.of('/games').on('connection', socket =>{

    socket.emit('update_messages', messages.games)

    socket.on('new_message', (data)=>{
        messages.games.push(data)
        games.emit('update_message', messages.games)
    })
})

// ------------------------------------------------------------- //

const animes = io.of('/animes').on('connection', socket =>{

    socket.emit('update_messages', messages.animes)

    socket.on('new_message', (data)=>{
        messages.animes.push(data)
        animes.emit('update_message', messages.animes)
    })
})

// ------------------------------------------------------------- //

const filmes = io.of('/filmes').on('connection', socket =>{

    socket.emit('update_messages', messages.filmes)

    socket.on('new_message', (data)=>{
        messages.filmes.push(data)
        filmes.emit('update_message', messages.filmes)
    })
})

// ------------------------------------------------------------- //

const musica = io.of('/musica').on('connection', socket =>{

    socket.emit('update_messages', messages.musica)

    socket.on('new_message', (data)=>{
        messages.musica.push(data)
        musica.emit('update_message', messages.musica)
    })
})