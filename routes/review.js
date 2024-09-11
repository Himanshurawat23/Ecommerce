

const express = require('express')
const router= express.Router()// work as a mini instance. we cannot export app from app.js into product.js because instance cannot be export
const Product = require('../models/Product')
const Review = require('../models/Review')
const {validateReview} =require('../middleware')

router.post('/products/:id/review', validateReview , async(req,res)=>{
  try{
     let {id} =req.params
    let {rating, comment}=req.body
    const product= await Product.findById(id)
   const review = new Review({rating , comment})// js class to make model of review
   product.reviews.push(review)
   await review.save()
   await product.save()
    req.flash('success' ,'Review added successfully')
  res.redirect(`/products/${id}`)
  } 
  catch(e){
    res.status(500).render('error', {err:e.message})
  }
})
// router.post('/user/profile/:id',isLoggedIn,async(req,res)=>{
//    let {id} = req.params

// })



module.exports = router // we are sending to app.js which is a main file. when this main file run it sends to different file  