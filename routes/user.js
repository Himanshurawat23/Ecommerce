const express = require('express')
const router= express.Router()
const {isLoggedIn} = require('../middleware')
const User = require('../models/User')


// to get user Profile page

router.get('/user/profile/:id',isLoggedIn,async (req,res)=>{
    try{
    const userId = req.params.id
    const user = await User.findById(userId)
    if(!user){
        return res.status(401).json({
            msg:req.flash('msg'),
        })
    }
    console.log(user.username)
    res.render('users/profile', { currentUser: user });
    }
  catch(e){
    res.status(505).render('error',{err:e.message})
  }
})

module.exports = router