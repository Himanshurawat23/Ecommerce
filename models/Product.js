
//Schema -> model -> to interact with DB -> how we can do that BY the help of mongoose 

const mongoose = require('mongoose')
const Review =require('./Review')
const productSchema = new mongoose.Schema({
   name: {
    type : String,
    trim : true,
    required : true // mendatory to give name
   },
   img:{
    type : String,
    trim : true
   } ,
   price:{
    type : Number,
   //  min : 0,
    required : true // mendatory to give price to the product 
   } ,
   desc: {
    type : String,
    trim : true
   },
   reviews:[
      {
         type: mongoose.Schema.Types.ObjectId,// ab hame object ki ID chaiye par woh dusre model mai hai toh uska yeh Method hai
         ref: 'Review'// kha se uthana hai Model ko
      }
   ],
   author:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
   }
})


// middleware jo bts mongodb oprerations karwane par use hote hai and iske andar pre and post 
// middleware hote hai which are basically used over the schema before the model is JS calss

productSchema.post('findOneAndDelete', async function(product){ // behind the scene findOneAndDelete middleware chal raha hai
   if(product.reviews.length>0){
      await Review.deleteMany({_id:{$in:product.reviews}})
   }
})

let Product = mongoose.model('Product',productSchema) // now are model is ready. it is a JS file.
// model collection ke barabar hai

// now how we can exchange the two js files by Export of module
module.exports = Product   // or hum JS file ko use karte hai export karne ke liye