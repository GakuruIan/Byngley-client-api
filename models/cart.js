const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
     userId:{
        type:String,
        require:true
     },
     products:[
        {
            productId:{
                type:String
            },
            quantity:{
                type:Number,
                default:1
            }
        }
     ]
},{timestamps:true})