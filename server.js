//Dependencies:
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
//----------------------------------------
const db = require("./models");

//----------------------------------------
//Express config (telling node creating an express server):
const PORT = process.env.PORT || 8011;
// Initialize Express
const app = express();
//----------------------------------------
// Configure middleware
// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({ extended: true }));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));
app.use(bodyParser.json());

//----------------------------------------
// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/fittoscrape"
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

const database = mongoose.connection;
database.on('error', console.error.bind(console, 'connection error:'));
database.once('open', function () {
    // we're connected! 
    console.log("database connected");
});


// Set Handlebars.
const exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Routes
// =============================================================
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);


//----------------------------------------
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
