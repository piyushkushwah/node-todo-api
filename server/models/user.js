const mongoose = require('mongoose');

var User= mongoose.model('User',{
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
