const db = require("../models");

module.exports = function (app) {
    
    app.get("/", function (req, res) {
        db.Article.find({ saved: false }).then(function (data) {
            console.log(data);
            res.render("index", { articles: data });
        });
    });

    app.get("/saved", function (req, res) {
        db.Article.find({ saved: true }).then(function (data) {
            res.render("saved", { articles: data });
        });
    });

};