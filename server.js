// require node packages
var express = require('express');
var mongoose = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');

// application setup
var app = express();
var port = 9999;
app.use(morgan('dev')); // log requests to the console
app.use(bodyParser.json()); // parse bodies for requests with the content-type header of application/json

// connect to mongodb and intialize Todo model
mongoose.connect('mongodb://localhost/todo');
var Todo = mongoose.model('Todo', {
  text: String,
  done: Boolean,
  archived: Boolean
});

// GET Return all todos
app.get('/api/todos', function (req, res) {
  Todo.find(function (err, todos) {
    res.send(err || todos);
  });
});

// POST Create a todo
// TODO: determine validation strategy
app.post('/api/todos', function (req, res) {
  Todo.create({
    text: req.body.text,
    done: false,
    archived: false
  }, function (err, created) {
    res.send(err || created);
  });
});

// PUT update a todo
app.put('/api/todos/:id', function (req, res) {
  Todo.update({_id: req.params.id}, req.body, function (err, updated) {
    res.send(err || updated);
  });
});

// DELETE remove a todo
app.delete('/api/todos/:id', function (req, res) {
  Todo.remove({_id: req.params.id}, function (err, deleted) {
    res.send(err || deleted);
  });
});

// start server
app.listen(port);
console.log('Listening on port ' + port);
