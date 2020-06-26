'use strict';

var express = require('express');
var mongo = require('mongodb');
var mongoose = require('mongoose');

var cors = require('cors');

var app = express();

// Basic Configuration
var port = process.env.PORT || 3000;

/** this project needs a db !! **/
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((client) => {
      console.log("connected");
      const db = client.db('test')})

  .catch(err => console.log(err));

app.use(cors());

/** this project needs to parse POST bodies **/
// you should mount the body-parser here

app.use('/public', express.static(process.cwd() + '/public'));

//retrieve info from form
app.post('api/shorturl/new', function(req,res){
  response = {URL:req.body.url};
  res.send(JSON.stringify(response));
});

app.get('/', function(req, res){
  res.sendFile(process.cwd() + '/views/index.html');
});


// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API',URI:process.env.DB_URI});
});


app.listen(port, function () {
  console.log('Node.js listening ...');
});

//mongoose connection
//mongoose.connect('mongodb+srv://admin:admin@cluster0-v6fzq.mongodb.net/<dbname>?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

//mongodb+srv://admin:<password>@cluster0-v6fzq.mongodb.net/<dbname>?retryWrites=true&w=majority
