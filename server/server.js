const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, { serveClient: true });
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/chatik');
mongoose.Promise = require('bluebird');

const port = 3000;

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

app.use( '/assets', express.static('./client/public') );

app.get('/', (req, res) => {
    res.render('index.html', { date: new Date() });
});

require('./sockets')(io)

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`)
});