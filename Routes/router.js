const express = require('express');
const UserController = require('../Controllers/Users')
const ProductController = require('../Controllers/products')
const OrderController = require('../Controllers/order')
const PaymentController = require('../Controllers/payment')
const passport = require('passport')
const jwt = require('jsonwebtoken')

const router = express.Router();


// getting profile
router.get('/profile',passport.authenticate('jwt', { session: false }),(req,res)=>{
    const {password,...userinfo} = req.user._doc;
    res.status(200).json({userinfo})
})

// fetching all products
router.get('/products',ProductController.FetchProducts);

// fetching a single product
router.get('/product/:id',ProductController.FetchProduct);

// Getting successfull payment
router.get('/success',PaymentController.SuccessPayment);


// create order / place order
router.post('/create/order',OrderController.CreateOrder);

// users register route
router.post('/register',UserController.register);


//login  user
router.post('/login',passport.authenticate('local',{session:false}),
     (req,res)=>{
        jwt.sign({id:req.user._id},'secret',{expiresIn:"1d"},(err,accesstoken)=>{
             if(err){
                return res.status(401).json({
                    message:"failed Login",
                    accesstoken:null
                })
             }
            //   prevent sending user password
             const {password,...userinfo} = req.user._doc;
             //setting token
             res.status(200).json({user:userinfo,accesstoken})
        })
      }
     );



module.exports = router;