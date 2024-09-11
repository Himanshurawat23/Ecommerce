

const express = require('express')
const User = require('../models/User') 
const passport = require('passport')
const router= express.Router()// work as a mini instance. we cannot export app from app.js into product.js because instance cannot be export

// to show the form for signup
router.get('/register',(req,res)=>{
    res.render('auth/signup')
})

// actually want to register the user in DB

router.post('/register',async (req,res)=>{
    try{
        let {email,password,username,role} = req.body
        const user = new User({email,username,role})
       const newUser = await User.register(user,password) // yeh Schema ke upar lagta hai
        // res.redirect('/login')
        req.login(newUser, (err)=>{
             if(err){return next(err)}
             req.flash('success','Welcome, you are registerd Successfully')
             return res.redirect('/products')
        })
    }
    catch(e){
        req.flash('error' , e.message)
        return res.redirect('/products')
    }
})

//to get login form
router.get('/login',(req,res)=>{
    res.render('auth/login')
})

//to actually login via DB
router.post('/login',
passport.authenticate('local', 
{ failureRedirect: '/login',
 failureMessage: true 
}),
(req,res)=>{
   req.flash('success' , 'welcome back')
   res.redirect('/products')
})

// LogOut
router.get('/logout', (req,res)=>{
    async ()=>{
        await req.logout()
    }
    req.flash('success' , 'Good Bye Firends , See you again')
   res.redirect('/login')
})

module.exports = router // we are sending to app.js which is a main file. when this main file run it sends to different file  