const mongoose = require('mongoose')

const productSchema = mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
    },
    Images:[
        {
            path:{
                type:String,
                required:true
            },
            filename:{
                type:String,
                required:true
            }
        }
    ],
    catergories:{
        type:String
    },
    size:{
        type:Array
    },
    color:{
        type:Array
    },
    price:{
        type:Number,
        required:true
    }
},{timestamp:true});

module.exports = mongoose.model('products',productSchema);