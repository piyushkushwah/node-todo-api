var request = require("supertest");
const expect = require('expect');
const {app} = require('./../server');
const {TodoApp} = require('./../models/todo');

const todos = [{
    text:'First test todo'
},{
    text:'second test todo'
}];

beforeEach((done)=>{
    TodoApp.remove({}).then(()=>{
       return TodoApp.insertMany(todos);
    }).then(()=>done());
});

describe('POST /todos',()=>{
    it('should create a new todo',(done)=>{
        var text= 'Test todo text';
       request(app).post('/todos').send({text}).expect(200).expect((res)=>{
            expect(res.body.text).toBe(text);
        }).end((err,res)=>{
            if(err){
                return(done);
            }
            TodoApp.find().then((todos)=>{
                expect(todos.length).toBe(1);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>{
                done(e);
            });
        });
    });
});