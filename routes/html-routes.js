// Dependencies
// =============================================================
const path = require("path");
const mongoose = require('mongoose');
// Requiring our models
const db = require("../models");

// Routes
// =============================================================
module.exports = (app) =>  {

    // GET route for getting all of the articless to index

    // index route loads 
    app.get("/", function (req, res) {

        db.Article.find({}, null, { sort: { created: -1 } }, function (err, data) {
            if (data.length === 0) {
                res.render("placeholder-no-articles", { message: "No, articles scraped yet, hit the scraped button to begin!"});
            }
            else {
                res.render("index", { articles: data });
            }
        });

    });//end of get


//saved articles route
    app.get("/saved", function (req, res) {
        db.Article.find({ issaved: true }, null, { sort: { created: -1 } }, function (err, data) {
            if (data.length === 0) {
                res.render("placeholder-saved", { message: "You have not saved any articles yet. Hit the \"Save Article\" to try it out!" });
            }
            else {
                res.render("saved", { saved: data });
            }
        });
    });//end of saved




};//end of export 