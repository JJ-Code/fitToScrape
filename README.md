# Mongo fitToScrape


### Overview

This is a app that scrapes the New York Time Politics's section. It allows user to saved articles, add and edit notes. In this repository, you can have access to all of the source code for this app.

Here is a demo hosted on Heroku: https://fit-to-scrape1.herokuapp.com/

### Key Dependencies

`axios`: enables `cheerio` to get access https://www.nytimes.com/section/politics

`cheerio`: scrapes the front-end for article names, links, images, and summarys 

`mongo`: database 

`mongoose`: Orm used to create

`fitToscrape` db

`express`: builds server-side routes and functions

`morgan`: logs server-side requests, helping debugging

`express-handlebars`: a front-end builder without requiring multiple html pages


![FitToScrape](/public/assets/img/fittoscrape.png?raw=true)

