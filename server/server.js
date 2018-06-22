const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
var {TodoApp} = require('./models/todo');
const {User} = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos',(req,res)=>{ 
  var todo = new TodoApp({
        text:req.body.text
  });

  todo.save().then((result)=>{
    res.send(result);
},(e)=>{
    res.status(400).send(e);
});
});

app.get('/todos',(req,res)=>{
    TodoApp.find().then((todos)=>{
        res.send({todos});
    },(err)=>{
        res.status(400);
    });
});

app.get('/todos/:id',(req,res)=>{
    var id = req.params.id;
    if(!ObjectID.isValid(id)){
        console.log("empty");
        return res.status(404).send();
       
    }
    TodoApp.findById(id).then((result)=>{
        if(result){
            res.send({result});
            console.log("Success");
        }else if(!result){
            console.log("status 404 ");
            return res.status(404).send();
           
        }
        
    }).catch((e)=>{
        res.status(404).send();
    });

});

app.get('/user',(req,res)=>{
    User.findById("5b23cbb42194ba171bd921ac").then((docs)=>{
        if(!docs){
            console.log('User Not Found');
        }else{
            console.log('Good');
            res.send(docs);
        }
    }).catch((e)=>{
        console.log(e);
    });
});

app.get('/',(req,res)=>{
    res.send('hello express!:p');
});

app.listen(port,()=>{
    console.log(`SERVER Up on POrT ${port}`);
}); 0


module.exports = {app};