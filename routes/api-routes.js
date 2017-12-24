// Dependencies
// =============================================================
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");



// =============================================================
module.exports = (app) => {

    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/section/politics").then(function (response) {
            const $ = cheerio.load(response.data);
            let resultsArray = [];


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

                //Adding of statement to grab image of thumbnail if there is no ficure.media  image    
                if (result.img) {
                    result.img = result.img;
                } else {
                    result.img = $(element).find(".wide-thumb").find("img").attr("src");
                };

                //putting all scraped articles into array of objects to be sent to databae 
                //and store once instead of a for each time 
                resultsArray.push(result);
            });
            //putting scraped in DB

            db.Article
                .create(resultsArray)
                .then(function (dbArticle) {
                    // res.send(dbArticle);
                    //refresh the page with scrape articles
                    res.redirect('/');
                })
                .catch(function (err) {
                    res.json(err);
                });


        }); //end of cheerio

    }); //end of scrape 


}; //end of export