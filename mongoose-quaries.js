const {ObjectID} = require('mongodb');
const {mongoose} =require('./server/db/mongoose');
const {todoapp} = require('./server/models/todo');
const {User}  = require('./server/models/user');

// var id= '5b28b3f225fa6f3469670a3b';

// if(!ObjectID.isValid(id)){
//     console.log('Id not Valid');
// }

// todoapp.find({
//     _id:id
// }).then((todos)=>{
//     console.log('todoapp',todos);
// });

// todoapp.findOne({
//     _id:id
// }).then((todos)=>{
//     console.log('todoapp',todos);
// });

// todoapp.findById(id).then((todos)=>{
//     if(!todos){
//         return console.log('id not found');
//     }
//     console.log(todos);
// }).catch((e)=>{
//     console.log(e);
// });

var id = "5b238afb968eba285d0613cc";


User.findById({
    _id:id
})
.then((doc)=>{
    if(!doc){
         console.log('User Cannot Found');
    }
    console.log(doc);
});

