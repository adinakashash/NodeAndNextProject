const mongoose = require('mongoose')

const UserSchema=new mongoose.Schema({
    googleId: String,
    displayName: String,
    firstName: String,
    lastName: String,
    image: String,
    phone:String,
    enail:String,
    adderss:String,
})

module.exports = mongoose.model('User', UserSchema);
