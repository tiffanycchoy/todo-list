var express = require('express');
var bodyParser = require('body-parser');
var database = require('../database-mongo');

var app = express();

app.use(express.static(__dirname + '/../react-client/dist'));
app.use(bodyParser.urlencoded({ extended: false }));

function convertToLocalTime(date, timezoneOffset) {
  return new Date(Date.parse(date) - timezoneOffset * 60000);
}

function convertToUTC(date, timezoneOffset) {
  return new Date(Date.parse(date) + timezoneOffset * 60000);
}

app.post('/items', function(req, res) {
  database.add(req.body, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(201);
    }
  });
});

app.get('/items', function(req, res) {
  var filterBy = req.query.filter;
  var searchTerm = req.query.searchTerm
  database.retrieve(filterBy, searchTerm, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      data.forEach(function(item) {
        item.dateCreated = convertToLocalTime(item.dateCreated, item.timezoneOffset);
        item.dateCompleted = convertToLocalTime(item.dateCompleted, item.timezoneOffset);
      })
      res.status(200).send(data);
    }
  });
});

app.put('/items', function(req, res) {
  var item = req.body;
  item.dateCreated = convertToUTC(item.dateCreated, item.timezoneOffset);
  database.updateCompletionStatus(item, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(200);
    }
  });
});

app.delete('/items', function(req, res) {
  var item = req.body;
  item.dateCreated = convertToUTC(item.dateCreated, item.timezoneOffset);
  database.remove(item, function(err, data) {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(200);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});
