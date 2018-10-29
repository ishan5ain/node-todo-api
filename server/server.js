var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  // console.log(req.body);
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.send(doc);
  }, (e) => {
    console.log('Error', e);
    res.status(400).send(e);
  });
});




app.listen(3000, () => {
  console.log('Started on port 3000');
});

// ---------------------

//declaring the model schema


// var newTodo = new Todo({
//   text: 'Cook dinner'
// });

// newTodo.save().then((doc) => {
//   console.log('Saved todo', doc);
// }, (e) => {
//   console.log('Unable to save todo');
// });

// var otherTodo = new Todo({
//   text: 'Walk the dog',
//   completed: true,
//   completedAt: 123
// });

// var otherTodo = new Todo({
//   text: 23
// });
//
// otherTodo.save().then((doc) => {
//   console.log(JSON.stringify(doc, undefined, 2));
// }, (e) => {
//   console.log('Unable to save', e);
// });


// new user model/schema
// email - requrie - trim - setType - set min length of 1


//
// var newUser = new Users({
//   email: 'ishansain27@gmail.com'
// });
//
// newUser.save().then((user) => {
//   console.log(JSON.stringify(user, undefined, 2));
// }, (e) => {
//   console.log('Unable to save user', e);
// });


//
