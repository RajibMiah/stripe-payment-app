import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type: String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        match:  [/^\S+@\S+\.\S+$/, 'Please enter a valid email address']
    },
    password:{
        type:String,
        required:true,
        minLength:6
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    },
    isActive:{
        type:Boolean,
        default:true
    },
    createdAt:{
        type:Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('User' , userSchema);