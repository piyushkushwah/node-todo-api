const mongoose = require('mongoose');
var todoapp = mongoose.model('todoapp',{
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


module.exports={todoapp}