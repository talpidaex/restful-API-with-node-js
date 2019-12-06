const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
const Article = require("./models/articles");

var app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({
  extended: true
}));

app.route("/listele")
  .get(function(req, res) {
    //Get All
    Article.find({}, function(err, results) {
      if (!err) {
        res.send(results);
      }
    });
  })
  .post(function(req, res) {

    //Post new Object
    const newObject = new Article({
      title: req.body.title,
      content: req.body.content
    });

    newObject.save(function(err) {
      console.log(err);
    });
  })
  .delete(function(req, res) {
    //Delete All
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("Tüm nesneler silindi!");
      } else {
        console.log(err);
      }
    });
  })
//////////////////////////  ----Spesicif-----   ///////////////////////////

app.route("/listele/:articleTitle").get(
    function(req, res) {
      Article.findOne({
        title: req.params.articleTitle
      }, function(err, result) {
        if (!err) {
          res.send(result);
        } else {
          console.log(err);
        }
      });
    })
  .put(function(req, res) {
    //Put request DB'deki tüm rowları siler hepsini tekrardan yazmamız gerekmektedir (title,content) gibi..
    Article.update({
      //Condition
      title: req.params.articleTitle
    }, {
      title: req.body.title,
      content: req.body.content
    }, {
      overwrite: true
    }, function(err, results) {
      if (!err) {
        res.send("Başarıyla Güncellendi!");
      }
    });
  })
  .patch(function(req, res) {
    Article.update({
      //Condition
      title: req.params.articleTitle
    }, {
      $set: req.body
    }, function(err) {
      if (!err) {
        res.send("Patch api başarılı!");
      } else {
        res.send(err);
      }
    });
  })
  .delete(function(req, res) {
    Article.deleteOne(
      //Condition
      {
        title: req.params.articleTitle
      },
      function(err) {
        if (!err) {
          res.send("Başarıyla Silindi!!");
        } else {
          res.send(err);
        }
      }
    )
  })


app.listen(3000, function() {
  console.log("Server listen : 3000");
});