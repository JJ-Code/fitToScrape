// Dependencies
// =============================================================
const mongoose = require("mongoose");
const axios = require("axios");
const cheerio = require("cheerio");

// Require all models
const db = require("../models");


// =============================================================
module.exports = (app) => {

    //api route to scrape from NYT and to store data into database
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


//saved articles
    app.post("/save/:id", function (req, res) {
        db.Article.findById(req.params.id, function (err, data) {
            if (data.issaved) {
                db.Article.findByIdAndUpdate(req.params.id, { $set: { issaved: false, status: "Save Article" } }, { new: true }, function (err, data) {
                    res.redirect("/");
                });
            }
            else {
                db.Article.findByIdAndUpdate(req.params.id, { $set: { issaved: true, status: "Saved" } }, { new: true }, function (err, data) {
                    res.redirect("/saved");
                });
            }
        });
    });

//Creating the note and tieing it to article 
    app.post("/note/:id", function (req, res) {
        db.Note
            .create(req.body)
            .then(function (dbNote) {
                return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
            })
            .then(function (dbArticle) {
                res.json(dbArticle);
            })
            .catch(function (err) {
                res.json(err);
            });
    });



//Editing the note
    app.get("/note/:id", function (req, res) {
        db.Article
            .findOne({ _id: req.params.id })
            // ..and populate all of the notes associated with it
            .populate("note")
            .then(function (dbArticle) {
                // If we were able to successfully find an Article with the given id, send it back to the client
                res.json(dbArticle);
            })
            .catch(function (err) {
                // If an error occurred, send it to the client
                res.json(err);
            });
    });

    
}; //end of export