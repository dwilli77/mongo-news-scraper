const axios = require("axios");
const cheerio = require("cheerio");

const db = require("../models");

module.exports = function(app){

  app.get("/scrape", function(req, res) {
    axios.get("https://www.wsj.com/").then(function(response) {
      let $ = cheerio.load(response.data);
      $(".wsj-card").each(function(i, element) {

        let result = {};

        result.title = $(element).find("a.wsj-headline-link").text();
        result.summary = $(element).find("p.wsj-summary").first("span").text();
        result.URL = $(element).find("a").attr("href");

        db.Article.create(result).then(function(data){
          console.log('saved')
        }).catch(function(err){
          console.log(err);
        });
      });
      res.send("complete");
    });
  });

  app.get("/articles/:id", function(req, res) {
    db.Article.findOne({_id: req.params.id}).populate("note").then(function(data){
      console.log(data);
      res.json(data);
    }).catch(function(err){
      console.log(err);
    })
  });

  app.post("/articles/:id", function(req, res) {
    db.Note.create(req.body).then(function(data) {
      console.log(req.params.id);
      return db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {note: data._id}}, { new: true });
    }).then(function(data) {
      res.json(data);
    }).catch(function(err) {
      // console.log(err)
      res.status(500).end();
    });
  });

  app.put("/saved/:id", function(req,res){
    db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: true}})
    .then(function(data){
      res.json(data);
    });
  });

  app.put("/removed/:id", function(req,res){
    db.Article.findOneAndUpdate({_id: req.params.id}, {$set: {saved: false}})
    .then(function(data){
      res.json(data);
    });
  });

  app.delete("/articles", function(req,res){
    db.Article.remove({})
    .then(function(data){
      res.json(data);
    });
  });

}