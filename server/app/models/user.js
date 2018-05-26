var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    login: String,
    password: String,
    name: {
        firstName: String,
        lastName: String
    },
    biography: String,
    created: {
        type: Date,
        default: Date.now
    },
    myMarkers: Array
});

module.exports = mongoose.model('User', userSchema);