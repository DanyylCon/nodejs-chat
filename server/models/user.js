const mongoose = require('mongoose');
const { string } = require('nunjucks/src/filters');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: { type: String },
    password: { type: String },
    registered: { type: Date, default: Date.now }
}, {
    versionKey: false,
    collection: 'UsersCollection'
});

module.exports = mongoose.model('UserModel', UserSchema);