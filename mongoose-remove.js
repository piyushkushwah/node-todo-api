const {ObjectID} = require('mongodb');
const {mongoose} =require('./server/db/mongoose');
const {todoapp} = require('./server/models/todo');
const {User}  = require('./server/models/user');

// todoapp.remove({}).then((result)=>{
//     console.log(result);
// });

// todoapp.findByIdAndRemove('5b2e171aeccc2717ae37ad39').then((todo)=>{

// });

todoapp.findOneAndRemove('5b2e1a2fd4c6a518d8fd44da').then((result)=>{
    console.log(result);
});