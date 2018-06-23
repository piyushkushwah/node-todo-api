// const MongoClient = require('mongodb').MongoClient;
// const user = {name:"piyush",age:20};
// var {name} = user;
// console.log(name);
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoapp',(err,client)=>{
    if(err){
        console.log('unable to connect mongodb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('Users');

    db.collection('Todos').find().toArray().then((docs)=>{
        console.log('Todos');
        console.log(JSON.stringify(docs,undefined,2));
    },(err)=>{
        console.log('Unable to fetch todos',err);
    });
    
    // db.collection('todoapp').insertOne({
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
    client.close();
});