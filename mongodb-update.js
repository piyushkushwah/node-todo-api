// const MongoClient = require('mongodb').MongoClient;
// const user = {name:"piyush",age:20};
// var {name} = user;
// console.log(name);
const ObjectId = require('mongodb').ObjectId;
const {MongoClient} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/todoapp',(err,client)=>{
    if(err){
        console.log('unable to connect mongodb Server');
    }
    console.log('Connected to MongoDb server');
    const db = client.db('todoapp');
    db.collection('todoapp').findOneAndUpdate({
        _id:new ObjectId("5b234986835e46dc4f468e13")
    },{
        $set:{Name:'PC Kushwah' },$inc:{age:+2}
    },{returnOrignal:false}).then((result)=>{
        console.log(result);
    });

   });
