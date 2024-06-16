const mongoose = require('mongoose')

const UsersSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:String,
    password:String
})


module.exports=mongoose.model('User',UsersSchema)