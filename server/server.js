const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, { serveClient: true });

const port = 3000;

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

app.use( '/assets', express.static('./client/public') );

app.get('/', (req, res) => {
    res.render('index.html', { date: new Date() });
});

io.on('connection', function (socket) { 
    socket.emit('connected', 'You are connected!!!');

    socket.on('msg', content => {
        const msgObj = {
            date: new Date(),
            content: content,
            username: 'Danny'
        }
        socket.emit('message', msgObj);
    })
});

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`)
});