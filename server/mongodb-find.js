// const MongoClient = require('mongodb').MongoClient;
// const user = {name:"piyush",age:20};
// var {name} = user;
// console.log(name);
const ObjectId = require('mongodb').ObjectId;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Users',(err,client)=>{
    if(err){
        console.log('unable to connect mongodb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('Users');

    // db.collection('TodoApp').find({_id:new ObjectId("5b221e952a545644eefb698e")}).toArray().then((count)=>{
    //     console.log(`Todo Count:${count}`);
    //     console.log(JSON.stringify(,undefined,2));
    // },(err)=>{
    //     console.log('Unable to fetch todos',err);
    // });
    
    db.collection('Users').find({name:'Piyush Kushwah'}).toArray().then((docs)=>{
        console.log('Users',docs);
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('unable to fetch todos',err);
    });
    
    // db.collection('TodoApp').insertOne({
    //     text:"Something To do",
    //     completed:false
    // },(err,result)=>{
    //     if(err){
    //         return console.log('Unable to Insert Todo',2);
    //     }
    //     console.log(JSON.stringify(result.ops,undefined,2));
    // });

    // db.collection('Users').insertOne({
       
    //     name:'Piyush Kushwah',
    //     age:20,
    //     Location:"Sirali, Madhya Pradesh, India"
    // },(err,result)=>{
    //     if(err){
    //         console.log('Unable To inser Into The Users Collection',err);
    //     }
    //     console.log(result.ops[0]._id.getTimestamp());
    // });    
   
});