const mongoose = require('mongoose');

const paymentSchema = mongoose.Schema({
    id:{
        typeof:String,
        required:true
    },
    amount:{
        typeof:Number,
        required:true
    },
    currency:{
        typeof:String
    },
    status:{
        typeof:String,
         required:true
    },
    clientsecret:{
        typeof:String,
        required:true
    },
    orderId:{
        typeof:String,
        required:true
    },
    payment_method:{
        typeof:String
    },
    receipt_email:{
        typeof:String,
        required:true
    },
    data:{
        typeof:Array,
        required:true
    },
    total:{
        typeof:Number,
        required:true
    }
},{timestamp:true})

module.exports = mongoose.model("payment",paymentSchema);