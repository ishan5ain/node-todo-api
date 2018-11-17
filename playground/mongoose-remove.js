const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');


// Todo.remove({}).then((result) => {
//   console.log(result);
// });




// Todo.findOneAndRemove().then();
//Todo.findByIdAndRemove().then();

Todo.findByIdAndRemove('5befa76a92f48d0792649668').then((todo) => {
  console.log(todo);
});
