//Dependencies:
const express = require("express");
const bodyParser = require("body-parser");
const logger = require("morgan");

//----------------------------------------
const db = require("./models");

//----------------------------------------
//Express config (telling node creating an express server):
const PORT = process.env.PORT || 8000;
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


// Routes
// =============================================================
require('./routes/api-routes.js')(app);
require('./routes/html-routes.js')(app);


//----------------------------------------
// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});
