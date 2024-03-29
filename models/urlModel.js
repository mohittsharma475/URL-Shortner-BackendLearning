
const mongoose = require("mongoose");


const urlSchema  =  new mongoose.Schema({

    shortId:{
        type:String,
        required:true,
        Uunique:true
    },

    redirectUrl:{
        type:String,
        required:true,
    },
    visitHistory: [{timestamp:{type:Number}}],
    creadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "user",
    }
    
},{
    timestamps:true
});

const urlModel =  mongoose.model("url",urlSchema);
module.exports={
    urlModel
}