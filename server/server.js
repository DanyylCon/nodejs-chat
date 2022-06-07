const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const server = require('http').Server(app);
const io = require('socket.io')(server, { serveClient: true });
const mongoose = require('mongoose');

const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'zw2J5ZvcsxGh3WsSTBVK'
};

passport.use( new Strategy( opts, function (jwt_payload, done) {
    if( jwt_payload != void(0) ) return done( false, jwt_payload );
    done();
} ));

mongoose.connect('mongodb://localhost:27017/chatik');
mongoose.Promise = require('bluebird');

const port = 3000;

nunjucks.configure('./client/views', {
    autoescape: true,
    express: app
});

app.use( '/assets', express.static('./client/public') );

function verifyAuth( req, res, next ){
    passport.authenticate('jwt', {session: false}, (err, decryptToken, jwtError) => {
        if( err != void(0) || jwtError != void(0) ) return res.render( 'index.html', { error: err || jwtError } );
        req.user = decryptToken;
        next();
    })( req, res, next );
}

app.get('/', verifyAuth, (req, res) => {
    res.render('index.html', { date: new Date() });
});

require('./sockets')(io)

server.listen(port, '0.0.0.0', () => {
    console.log(`Server is listening on port ${port}`)
});