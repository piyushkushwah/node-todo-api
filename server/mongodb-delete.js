// const MongoClient = require('mongodb').MongoClient;
// const user = {name:"piyush",age:20};
// var {name} = user;
// console.log(name);
const ObjectId = require('mongodb').ObjectId;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
    if(err){
        console.log('unable to connect mongodb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('TodoApp');
    //delete many
    // db.collection('TodoApp').deleteMany({text:'Eat lunch'}).then((result)=>{
    //     console.log(result);
    // });
    //delete one 
    // db.collection('TodoApp').deleteOne().then((res)=>{console.log(res);},(err)=>{console.log(err);});
    //findOneAndDelete
    // db.collection('TodoApp').findOneAndDelete({text:'Good Work'}).then((result)=>{
    //         console.log(result);
    // });
   db.collection('Users').deleteMany({name:'Piyush Kushwah'}).then((res)=>{
    console.log(res);
   });
});