const {ObjectId} = require('mongodb');
const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {Users} = require('./../server/models/user');


var id = '5bd697b292f48d0792642190'; //5bd697b292f48d0792642190  5bd6942674edbf16639aea39

// if (!ObjectId.isValid(id)) {
//   console.log('Id not valid');
// }

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo', todo);
// });

// Todo.findById(id).then((todo) => {
//   if (!todo) {
//     return console.log('Id not found');
//   }
//   console.log('Todo by id', todo);
// }).catch((e) => console.log(e));

Users.findById(id).then((user) => {
  if (!user) {
    return console.log('Id not found');
  }
  console.log('Todo by id', JSON.stringify(user, undefined, 2));
}).catch((e) => console.log(e));

//
