const mongoose = require('mongoose');

var User= mongoose.model('Users',{
    User:{
        type:String,
        required:true,
        trim:true,
    },
    Email:{
        type:String,
        required:true,
        trim:true
    }
    });
    
   

    module.exports = {User};
