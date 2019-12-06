const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/wikiDB', {
  useNewUrlParser: true
});



const Article = mongoose.model('Article', {
  title: String,
  content: String
});


module.exports = Article;