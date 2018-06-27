const _= require("lodash");
const { ObjectID } = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const { mongoose } = require('./db/mongoose');
const { todoapp } = require('./models/todo');
const { User } = require('./models/user');

const app = express();
const port = process.env.PORT || 3000;


app.use(bodyParser.json());

app.post('/todos', (req, res) => {
    var todo = new todoapp({
        text: req.body.text

    });

    todo.save().then((result) => {
        res.send(result);
    }, (e) => {
        res.status(400).send(e);
    });
});

app.get('/todos', (req, res) => {
    todoapp.find().then((todos) => {
        res.send({ todos });
    }, (err) => {
        res.status(400);
    });
});

app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log("empty");
        return res.status(404).send();

    }
    todoapp.findById(id).then((result) => {
        if (result) {
            res.send({ result });
            console.log("Success");
        } else if (!result) {
            console.log("status 404 ");
            return res.status(404).send();

        }

    }).catch((e) => {
        res.status(404).send();
    });

});

app.get('/user', (req, res) => {
    User.findById("5b23cbb42194ba171bd921ac").then((docs) => {
        if (!docs) {
            console.log('User Not Found');
        } else {
            console.log('Good');
            res.send(docs);
        }
    }).catch((e) => {
        console.log(e);
    });
});
app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;
    if (!ObjectID.isValid(id)) {
        console.log("id not found");
        return res.status(404).send();

    }
    todoapp.findByIdAndRemove(id).then((result) => {
        if (!result) {
            res.status(404).send();
            console.log("not found");
        } else {
            res.send({ result });
        }
    }).catch((e) => {
        console.log(e);
        res.status(400).send();
    });
})

app.patch('/todos/:id',(req,res)=>{
    var id = req.params.id;
    var body = _.pick(req.body,['text','completed']);
    if (!ObjectID.isValid(id)) {
        console.log("id not found");
        return res.status(404).send();

    }
    if(_.isBoolean(body.completed)&& body.completed){
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }
    todoapp.findByIdAndUpdate(id,{$set:body},{$new:true}).then((result)=>{
        if(!result){
            return res.status(404).send();
        }   
        res.send({result});
    }).catch((e)=>{
        console.log(e);
        res.status(400).send();
    });

});


app.get('/', (req, res) => {
    res.send('hello express!:p');
});

app.listen(port, () => {
    console.log(`SERVER Up on POrT ${port}`);
});


module.exports = { app };