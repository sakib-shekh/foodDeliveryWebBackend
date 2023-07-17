const mongoose = require('mongoose');

const {Schema}=mongoose;

const UserSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    },
    isAdmin:{
        type:Number,
        default:0
    },
    isVerified:{
        type:Number,
        default:0
    }
})
module.exports = mongoose.model('user',UserSchema);