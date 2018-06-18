const express = require('express');
const bodyParser = require('body-parser');
const {mongoose} = require('./db/mongoose');
var {TodoApp} = require('./models/todo');
const {User} = require('./models/user');

const app = express();



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


app.get('/',(req,res)=>{
    res.send('hello express!:p');
});

app.listen(3000,()=>{
    console.log('SERVER Up on POrT 3000');
}); 

