var mongoose = require('mongoose');

mongoose.Promise =global.Promise;
 MONGOLAB_URI="mongodb://piyush846:piyush@846@ds018508.mlab.com:18508/todo_api"
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost:27017/TodoApp');


module.exports={mongoose};