
//Schema -> model -> to interact with DB -> how we can do that BY the help of mongoose 

const mongoose = require('mongoose')

const reviewSchema=new mongoose.Schema({
   rating:{
   type:Number,
   min:0,
   max:5
   },

   comment:{
type: String,
trim : true
   }
},{timestamps:true})// timeestamps ka use time btaane ke liye use hoga kis time par review diya gaya hai yeh 2 cheej provide karta hai 1->currentime and 2->updatetime

let Review = mongoose.model('Review',reviewSchema) // now are model is ready. it is a JS file.
// model collection ke barabar hai

// now how we can exchange the two js files by Export of module
module.exports =  Review;  // or hum JS file ko use karte hai export karne ke liye