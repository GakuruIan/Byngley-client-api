const products = require('../models/products')

exports.FetchProducts = async(req,res)=>{

    try {
        const Products = await products.find();
        res.status(200).json(Products);
    } 
    catch (error) {
        req.status(500).json(error);
    }
}


exports.FetchProduct = async(req,res)=>{
    let id = req.params.id;
    
    try {
        const Product = await products.findOne({title:id})
        res.status(200).json(Product)
    } 
    catch (error) {
        res.status(500).json(error);
    }
}