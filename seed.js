

// yeh file intial data enter karwane ke liye
const mongoose = require('mongoose')
const Product = require('./models/Product') // jo maine Product Model banaya hai usse kaise import kare apne seed .js mai to feed the data into DB 

//now we want to make the array to paas as an argument in insertMany() method in below
const products = [
    {
        name : "Iphone 14pro",
        img : "https://images.unsplash.com/photo-1684418259291-2e9d5052a6e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NjZ8fElwaG9uZSUyMDE0JTIwcHJvfGVufDB8fDB8fHww",
        price : 130000,
        desc : "very costly , aukaat ke bhaar"
    },
    {
        name : "Macbook m2 pro",
        img: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D",
        price: 250000,
        desc: "ye to bilkul aukaat ke bhaar hai"
    },
    {
        name : "Iwatch",
        img : "https://images.unsplash.com/photo-1558126319-c9feecbf57ee?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8SXdhdGNofGVufDB8fDB8fHww",
        price: 51000,
        desc : "yeh sasta hai lelo"
    },
    {
        name : "Ipad Pro",
        img: "https://images.unsplash.com/photo-1546868871-0f936769675e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fElwYWR8ZW58MHx8MHx8fDA%3D",
        price: 237900,
        desc : "life mai kuch cheese dikhane ke liye hoti hai"
    },
    {
        name : "airpods",
        img: "https://images.unsplash.com/photo-1588940086836-36c7d89611a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YXBwbGUlMjBhaXJwb2RzfGVufDB8fDB8fHww",
        price : 25000,
        desc : "badiya hai kamao kamao"
    }

]


// mongoose or mongoDb when we work with that then these methods like insertMany, save, methods return promise and 
// and to get defend from the chaining we use async-await becausee these DB methods take time
async function seedDB(){
    await Product.insertMany(products);
    console.log("data seeded successfully")
}

module.exports = seedDB
// now we have to transfer the file to app.js which provide the direction