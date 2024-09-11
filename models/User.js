

const { required } = require('joi');
const mongoose = require('mongoose')
const passportLocalMongoose =require('passport-local-mongoose')

let userSchema =new mongoose.Schema({
     email:{
     type:String,
     trim: true,
     required: true
     },
     role:{
          type:String,
          trim:required
     },
     username:{
          type:String,
          trim:required
     },
     // phoneNumber:{
     //      type:String,
     //      required:true
     // },
     cart:[
          {
          type: mongoose.Schema.Types.ObjectId,
          ref:'Product'
     }
]
})


userSchema.plugin(passportLocalMongoose);

let User = mongoose.model('User',userSchema);
module.exports=User