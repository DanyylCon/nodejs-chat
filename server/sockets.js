const MessageModel = require('./models/message');

module.exports = io => {
    io.on('connection', function (socket) { 
        socket.emit('connected', 'You are connected!!!');
    
        socket.join('all');
    
        socket.on('msg', content => {
           
            const msgObj = {
                date: new Date(),
                content: content,
                username: socket.id
            }

            MessageModel.create(msgObj, err => { 
                if (err) return console.error("Message Model", err);
                
                socket.emit('message', msgObj);
                socket.to('all').emit('message', msgObj);
            });
    
        })
    });
    
}
