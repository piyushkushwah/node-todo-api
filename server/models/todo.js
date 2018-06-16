const mongoose = require('mongoose');
var TodoApp = mongoose.model('TodoApp',{
    text:{
        type:String,
        required:true,
        trim:true,
        minlength:1
        
    },
    completed:{
        type:Boolean,
        default:false
    },
    completedAt:{
        type:Number,
        default:null
    }

});


module.exports={TodoApp}