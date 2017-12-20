// Dependencies
// =============================================================
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");


//----------------------------------------
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fittoscrape"
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// =============================================================
module.exports = (app) => {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/section/politics").then(function (response) {
            const $ = cheerio.load(response.data);
            $("div.story-body").each(function (i, element) {
                const result = {};
                result.title = $(this)
                    .find('h2.headline')
                    .text()
                    .trim();
                result.link = $(this)
                    .children("a")
                    .attr("href");
                result.summary = $(this)
                    .find('p.summary')
                    .text()
                    .trim();
                result.img = $(this)
                    .parent()
                    .find("figure.media")
                    .find("img")
                    .attr("src");

                //putting scraped in DB
                db.Article
                    .create(result)
                    .then(function (dbArticle) {
                        res.send("Scrape Complete");
                    })
                    .catch(function (err) {
                        res.json(err);
                    });
            });
        });
    });//end of scrape 


};//end of export 


