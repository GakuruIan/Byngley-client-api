const Order = require('../models/orders')
require('dotenv').config();
const stripe = require('stripe')(process.env.STRIPE_SECRET) 

exports.CreateOrder=async(req,res)=>{
   const orders =  req.body

   const products = orders.product
   const amount = orders.total
   let Ordered_products = []
   let line_items=[]

   for(let product in products){
       let {_id,title,size,color,price,quantity,Images} = products[product]

       Ordered_products.push({
        _id,
        size,
        color,
        price,
        quantity
       })

       line_items.push({
        price_data:{
          currency:'Kes',
          product_data:{
            name:title,
            images:[Images[0].path],
            metadata:{
              size,
              quantity
            }
          },
          unit_amount:price*100,
        },
        adjustable_quantity: {
          enabled: true,
          minimum: 1,
          maximum: 10,
        },
        quantity
       })
   }

  
   try {

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        phone_number_collection: {
          enabled: true,
        },
        shipping_address_collection: {
          allowed_countries: ['US', 'KE'],
        },
        shipping_options:[
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 0,
                currency: 'kes',
              },
              display_name: 'Free shipping',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 5,
                },
                maximum: {
                  unit: 'business_day',
                  value: 7,
                },
              },
            },
          },
          {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {
                amount: 150000,
                currency: 'kes',
              },
              display_name: 'Next day air',
              delivery_estimate: {
                minimum: {
                  unit: 'business_day',
                  value: 1,
                },
                maximum: {
                  unit: 'business_day',
                  value: 1,
                },
              },
            },
          },
        ],
        line_items,
        mode: 'payment',
        success_url: `http://localhost:5173/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: 'http://localhost:5173/cancel',
      });

      res.json({url:session.url});

   } catch (error) {
    console.log(error)
      res.status(500).json(error)
   }
   
// add webhook

}