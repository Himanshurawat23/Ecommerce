const express = require('express')
const app=express()
const path =require('path')
const mongoose = require('mongoose');
const seedDB =require('./seed.js');
const ejsMate = require('ejs-mate')
const methodOverride = require('method-override')
const flash =require('connect-flash')
const session =require('express-session')
const passport= require('passport')
const LocalStrategy=require('passport-local')
const User= require('./models/User.js')
const dotenv = require('dotnev')
dotenv.config()



const productRoutes = require('./routes/product')
const reviewRoutes =require('./routes/review')
const authRoutes =require('./routes/auth')
const userRoutes = require('./routes/user.js')
const cartRoutes=require('./routes/cart.js')
const paymentRoutes=require('./routes/payment.js')

mongoose.connect('mongodb://127.0.0.1:27017/shopping-sam-app')
.then(()=>{
    console.log("DB connected successfully with mongoose")
})
.catch((err)=>{
    console.log("DB not connected successfully with mongoose")
})


let configSession= {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie:{
        httpOnly: true ,
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000 ,
        maxAge: 7 * 24 * 60 * 60 * 1000
    }
}

app.engine('ejs', ejsMate);// it takes 2 argument first file extension and second is name of the engine or to connect engine
app.set('view engine' , 'ejs') // tera kaam kya hai file ko read karna
app.set('views', path.join(__dirname,'views'))// view folder 
app.use(express.static(path.join(__dirname, 'public')))// public folder
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))
app.use(flash())
app.use(session(configSession))


app.get('/',(req,res)=>{
    res.render('products/home')
})
app.use(passport.initialize())
app.use(passport.session())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())


app.use((req,res,next)=>{
    res.locals.currentUser = req.user
    res.locals.success = req.flash('success')
    res.locals.error = req.flash('error');
    next();
})

// PASSPORT LOCAL WALA
passport.use(new LocalStrategy(User.authenticate()));
//** view engine is a default engine which is tarcking the ejs file and a default engine present in Express and we can change the defult behaviour of engine to ejs-mate is another engine to see the ejs file
//seeding Database
// when we refreshing or saving the app.js then the below function seedDB run on every save or Refresh then we have to do run the seedDB function for Once and afterc running that we have to comment out
// seedDB();

app.use(productRoutes) //har incoming request pe routes wale folder mai products par render kare 
app.use(reviewRoutes)  // har incoming request pe routes wale folder mai reviews par render kare
app.use(authRoutes)
app.use(userRoutes)
app.use(cartRoutes)
app.use(paymentRoutes)

app.listen(8080,()=>{
    console.log('server connected at 8080')
})