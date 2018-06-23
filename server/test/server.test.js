const {ObjectID} = require("mongodb");
var request = require("supertest");
const expect = require('expect');
const {app} = require('./../server');
const {todoapp} = require('./../models/todo');

const todos = [{
    _id: new ObjectID,
    text:'Test todo text'
},{
    _id : new ObjectID,
    text:'second test todo'
}];

beforeEach((done)=>{
    todoapp.remove({}).then(()=>{
       return todoapp.insertMany(todos);
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
            todoapp.find().then((todos)=>{
                expect(todos.length).toBe(3);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e)=>{
                done(e);
            });
        });
    });

});

describe("GET /todos/:id",()=>{
    it("it should return todo doc",(done)=>{
      
        request(app)
        .get(`/todos/${todos[0]._id.toHexString()}`)
        .expect(200)
        .expect((res)=>{
            expect(res.body.result.text).toBe(todos[0].text);
        })
          .end(done);
    });

    it('should return 404 if todo not found',(done)=>{
        //make sure you get a 404 back
        var hexId = new ObjectID().toHexString();

        request(app)
        .get(`/todos/${hexId}`)
        .expect(404)
        .end(done); 
    });
    it('should return 404 for non-object ids',(done)=>{
        // /todos/123
        request(app)
        .get(`/todos/123`)
        .expect(404)
        .end(done);
    });
});