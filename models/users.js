const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    location:[
        {
         county:{
             type:String,
             required:false,
             default:null,
         },
         town:{
             type:String,
             required:false,
             default:null
         },
         ward:{
             type:String,
             required:false,
             default:null
         }
        }
      ]
},{timestamps:true}
);

module.exports = mongoose.model("user",userSchema);