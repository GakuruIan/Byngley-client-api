const bcyrpt = require('bcryptjs');
const User = require('../models/users');


//user registration
exports.register=async(req,res)=>{
     const {firstname,lastname,email,password} = req.body;
     const newUser = new User({firstname,lastname,email,password});

      bcyrpt.genSalt(10,(err,salt)=>{
        bcyrpt.hash(newUser.password,salt,(err,hash)=>{
            if(err) throw err; 
            
            newUser.password =hash;
            try{
                newUser.save();
                res.status(200).json({"message":"success"})
           }
           catch(e){
                res.status(500).json(e)
           }
        })
      })   
}

