// Dependencies
// =============================================================
const path = require("path");
const mongoose = require('mongoose');
// Requiring our models
const Article = require("./models/Article");

// Routes
// =============================================================
module.exports = (app) =>  {

    // GET route for getting all of the burgers to index

    // index route loads 
    app.get("/", function (req, res) {

        Article.find({}, null, { sort: { created: -1 } }, function (err, data) {
            if (data.length === 0) {
                res.render("placeholder-greeting", { message: "There's nothing scraped yet. Please click \"Scrape Article Button\" to start." });
            }
            else {
                res.render("index", { articles: data });
            }
        });

    });//end of get


};//end of export 