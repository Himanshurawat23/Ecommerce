

const express = require('express')
const Product = require('../models/Product')
const router = express.Router()// work as a mini instance. we cannot export app from app.js into product.js because instance cannot be export
const Review = require('../models/Review')
const {validateProduct,isLoggedIn,isSeller,isProductAuthor} = require('../middleware')



// to show all the products
router.get('/products',isLoggedIn, async(req,res)=>{
     try{
        let products = await Product.find({});// it returns a promise which use async and await
        res.render('products/index',{products})
     }
     catch(e){
        res.status(505).render('error' , {err:e.message})
     }
})


/// to show the form for adding the new product
router.get('/product/new',isLoggedIn, (req,res)=>{
    try{
    res.render('products/new')
    }
    catch(e){
        res.status(505).render('error',{err:e.message})
    }
})

// to actually  add the new product

// app.js mai jayega dekhega konsa middleware chala hai Eg product.js wala chala toh fir konsa route hit hua hai usko find karega hamare case mai '/products' hai us mai dekhega ki koi miidleware hai kya agar hai jaise ki validateProduct hai toh kha se require ho raha hai find kiya fir middleware.js mai 
// hai fir useke baad next() wala method run hoga uske baad async apna kaam karega  aise code ka flow ho raha hai
router.post('/products', validateProduct,isLoggedIn,isSeller, async(req,res)=>{
    try{
    let {name, img , price, desc} = req.body
    await Product.create({name, img , price, desc, author:req.user._id})
    req.flash('success', 'product added successfully')
    res.redirect('/products')
    }
    catch(e){
        res.status(505).render('error',{err:e.message})
    }
})

// to show particular product
router.get('/products/:id',isLoggedIn, async(req,res)=>{
    try{
    let {id} = req.params
    let foundProduct = await Product.findById(id).populate('reviews')
    res.render('products/show' , {foundProduct,msg:req.flash('msg')})
    }
    catch(e){
        res.status(505).render('error',{err:e.message})
    }
})
// form to edit the Product
router.get('/products/:id/edit',isLoggedIn, async(req,res)=>{
    try{
    let {id} = req.params
    let foundProduct = await Product.findById(id)
    res.render('products/edit',{foundProduct})
    }
    catch(e){
        res.status(505).render('error',{err:e.message})
    }
})

// to actually edit the data in DB
router.patch('/products/:id' , validateProduct ,isLoggedIn, async(req,res)=>{
    try{
    let {id}=req.params;
    let {name , img ,price ,desc}=req.body // data hame body se milega 
    await Product.findByIdAndUpdate(id , {name , img ,price ,desc})
    req.flash('success', 'product edited successfully')
    res.redirect(`/products/${id}`)
    }
    catch(e){
        res.status(505).render('error',{err:e.message}) 
    }
})


// to delete the product

router.delete('/products/:id',isLoggedIn,isProductAuthor,async(req,res)=>{
    try{
          let {id}=req.params
          const product = await Product.findById(id)

        //   for(let id of  product.reviews){
        //     await Review.findByIdAndDelete(id) 
        //   }
          await Product.findByIdAndDelete(id);
          req.flash('success', 'product deleted successfully')
          res.redirect('/products')
    }
    catch(e){
        res.status(505).render('error' , {err:e.message}) 
    }

})
module.exports=router // we are sending to app.js which is a main file. when this main file run it sends to different file 