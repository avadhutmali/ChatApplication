const mongoose = require("mongoose")

const userScheme = mongoose.Schema({
    username :{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    }
})

const user = mongoose.model("user",userScheme)
module.exports = user;