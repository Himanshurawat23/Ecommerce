// const Product = require('./models/Product');
// const Review = require('./models/Review');
const Product = require('./models/Product');
const {productSchema, reviewSchema} = require('./schema')



// middleware
 const validateProduct = (req, res,next)=>{
    const {name, img , price, desc} =  req.body;
    const {error} = productSchema.validate({name, img , price, desc})
    if(error){
        return res.render('error',{err:error.message});
    }
    next(); // agar error nahi chala toh edit or add karne wala kaam karega yeh next() kaa kaam hai
}


const validateReview = (req, res,next)=>{
    const {rating , comment} =  req.body;
    const {error} = reviewSchema.validate({rating , comment})
    if(error){
        return res.render('error',{err:error.message})
    }
    next(); // agar error nahi chala toh edit or add karne wala kaam karega yeh next() kaa kaam hai
}

const isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','please login flash')
        return res.redirect('/login')
    }
    next()
}

const isSeller = (req,res,next)=>{
       if(!req.user.role){
        req.flash('error','You don"t have the permision to do that')
        return res.redirect('/products')
       }
       else if(!req.user.role !== 'seller'){
        req.flash('error','You don"t have the permision to do that')
        return res.redirect('/products')
       }
       next()
}

const isProductAuthor = async (req,res,next)=>{
       let {id} = req.params
       let product = await Product.findById(id)
       if(!product.author.equals(req.user._id)){
        req.flash('error','how dare you to do that')
        return res.redirect('/products')
       }
       next()
}
module.exports = {isProductAuthor,isLoggedIn, validateProduct, validateReview, isSeller}