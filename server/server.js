const _ = require('lodash');
var express = require('express');
var bodyParser = require('body-parser');

var {
mongoose
} = require('./db/mongoose');
var {
  Todo
} = require('./models/todo');
var {
  Users
} = require('./models/user');
const {
  ObjectId
} = require('mongodb');
var {authenticate} = require('./middleware/authenticate');

var app = express();
const port = process.env.PORT || 3000;

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

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({
      todos
    });
  }, (e) => {
    res.status(400).send(e);
  });
})

// GET /todos/1234
app.get('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findById(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.status(200).send({
      todo
    });
    // console.log('Todo by id', JSON.stringify(user, undefined, 2));
  }).catch((e) => {
    // console.log(e);
    res.status(400).send();
  });
});
// validate id using is valid

app.delete('/todos/:id', (req, res) => {
  //get the id
  var id = req.params.id;

  //validate the id -> not valid? return 404
  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndDelete(id).then((todo) => {
    if (!todo) {
      return res.status(400).send();
    }

    console.log(todo);
    res.status(200).send({
      todo
    });

  }).catch((e) => {
    console.log(e);
    res.status(400).send(e);
  });

});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findByIdAndUpdate(id, {
    $set: body
  }, {
    new: true
  }).then((todo) => {
    if(!todo) {
      return res.status(404).send();
    }

    res.send(200).send({todo});
  });

});

//POST /users
app.post('/users', (req, res)=> {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new Users(body);
  console.log(body);

  // Users.findByToken
  // user.generateAuthToken

  user.save().then(() => {
    // res.send(user);
    // console.log(user); //user object is saved without token first
    return user.generateAuthToken(); //tokens are generated inside and the user object is saved again with tokens now,
  }).then((token) => { //finally, newly generated token is forwarded to the next then promise
    // console.log(user); //user object with token
    res.header('x-auth', token).send(user); //we attached the new jwtoken in the custom header of our response to the client/user
  }).catch((e) => {
    res.status(400).send(e);
  });
});


app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
  // var token = req.header('x-auth');
  //
  // Users.findByToken(token).then((user) => {
  //   if(!user){
  //     return Promise.reject();
  //   }
  //
  //   res.send(user);
  // }).catch((e) => {
  //   res.status(401).send();
  // });
});


app.listen(port, () => {
  console.log(`Started on port ${port}`);
});

module.exports = {
  app
};

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
