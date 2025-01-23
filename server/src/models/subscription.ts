import mongoose from "mongoose";

const subscriptionsSchema = new mongoose.Schema({
    plan:{
        type:String,
        enum:["one-time" , "weekly" , "free-trail" , "subscription"],
        required:true
    },
    startDate:{
        type:Date,
        default: Date.now
    },
    endDate:{
        type:Date,
    },
    isCancelled:{
        type:Boolean,
        default:false
    }
})


module.exports = mongoose.model("Subscription" , subscriptionsSchema);