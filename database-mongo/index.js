var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var itemSchema = mongoose.Schema({
  description: String,
  category: String,
  dateCreated: Date,
  dateCompleted: Date,
  completed: Boolean,
  timezoneOffset: Number
});

var Todo = mongoose.model('Todo', itemSchema);

var add = function(todo, callback) {
  var newItem = new Todo(todo);
  newItem.save()
    .then((data) => callback(null, data))
    .catch((err) => callback(err, null));
}

var remove = function(todo, callback) {
  var query = {description: todo.description, dateCreated: new Date(todo.dateCreated)};
  Todo.find(query)
      .remove()
      .then((data) => callback(null, data))
      .catch((err) => callback(err, null));
}

var retrieve = function(filterBy, searchTerm, callback) {
  var completed;
  var query;

  filterBy === 'show_completed' ? completed = true : completed = false;
  filterBy === 'show_all'
    ? query = {description: new RegExp(searchTerm, 'i')}
    : query = {completed: completed, description: new RegExp(searchTerm, 'i')};

  Todo.find(query)
  .then((data) => callback(null, data))
  .catch((err) => callback(err, null));
}

var updateCompletionStatus = function(todo, callback) {
  var query = {description: todo.description, dateCreated: new Date(todo.dateCreated)};
  var update = {$set:{completed: todo.completed, dateCompleted: todo.dateCompleted}};
  Todo.findOneAndUpdate(query, update)
      .then((data) => callback(null, data))
      .catch((err) => callback(err, null));
}

module.exports.add = add;
module.exports.remove = remove;
module.exports.retrieve = retrieve;
module.exports.updateCompletionStatus = updateCompletionStatus;
