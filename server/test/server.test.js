const { ObjectID } = require("mongodb");
var request = require("supertest");
const expect = require('expect');
const { app } = require('./../server');
const { todoapp } = require('./../models/todo');

const todos = [{
    _id: new ObjectID,
    text: 'Test todo text1',
   
}, {
    _id: new ObjectID,
    text: 'second test todo',
    completed:true,
    completedAt:333
}];

beforeEach((done) => {
    todoapp.remove({}).then(() => {
        return todoapp.insertMany(todos);
    }).then(() => done());
});

describe('POST /todos', () => {
    it('should create a new todo', (done) => {
        var text = 'Test todo text1';
        request(app).post('/todos').send({ text }).expect(200).expect((res) => {
            expect(res.body.text).toBe(text);
        }).end((err, res) => {
            if (err) {
                return (done);
            }
            todoapp.find().then((todos) => {
                expect(todos.length).toBe(3);
                expect(todos[0].text).toBe(text);
                done();
            }).catch((e) => {
                done(e);
            });
        });
    });

});

describe("GET /todos/:id", () => {
    it("it should return todo doc", (done) => {

        request(app)
            .get(`/todos/${todos[0]._id.toHexString()}`)
            .expect(200)
            .expect((res) => {
                console.log(res.body.result);
                expect(res.body.result.text).toBe(todos[0].text);
            })
            .end(done);
    });

    it('should return 404 if todo not found', (done) => {
        //make sure you get a 404 back
        var hexId = new ObjectID().toHexString();

        request(app)
            .get(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids', (done) => {
        // /todos/123
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});
describe('DELETE /todos/:id', () => {
    it('should return 200 Ok! ', (done) => {
        var hexId = todos[0]._id.toHexString();
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(200)
            .expect((res) => {
                console.log(todos[0]._id.toHexString());
                console.log(res.body.result._id);
                expect(res.body.result._id).toBe(todos[0]._id.toHexString());

            })
            .end((err, res) => {
                if (err) {
                    return done(err);
                }

                todoapp.findById(hexId).then((result) => {
                    expect(result).toNotExist();
                    done();
                }).catch((e) => {
                    done(e);
                });
            });
    });

    it('Should return 404', (done) => {
        var hexId = new ObjectID().toHexString();
        console.log(new ObjectID().toHexString());
        request(app)
            .delete(`/todos/${hexId}`)
            .expect(404)
            .end(done);
    });
    it('should return 404 for non-object ids', (done) => {
        // /todos/123
        request(app)
            .get(`/todos/123`)
            .expect(404)
            .end(done);
    });
});

describe('PATCH /todos/:id', () => {
    it('should update the todo', (done) => {
      var hexId = todos[0]._id.toHexString();
      var text = 'Test todo text1212';
  
      request(app)
        .patch(`/todos/${hexId}`)
        .send({
          completed: true,
          text})
        .expect(200)
        .expect((res) => {
            console.log(res.body);
          expect(res.body.result.text).toBe(text);
          expect(res.body.result.completed).toBe(true);
          expect(res.body.result.completedAt).toBeA("number");
        
        })
        .end(done);
    });
  
   
  });
