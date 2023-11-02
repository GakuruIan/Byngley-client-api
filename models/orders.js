const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
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
            },
            size:{
               typeof:String,
            },
            color:{
               typeof:String
            },
            price:{
                type:Number,
                required:true
            }
        }
     ],
     amount:{
        type:Number,
        required:true
     },
     payment:{
        type:String,
        required:true,
        default:"pending"
     },
     status:{
        type:String,
        default:"pending"
     }
},{timestamps:true})

module.exports = mongoose.model("orders",orderSchema);