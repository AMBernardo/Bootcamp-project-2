require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var favicon = require("serve-favicon");
var app = express();

var db = require("./models");
var populationRouter = require('./routes/d3');
var app = express();
var port = process.env.PORT || 5000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static('./routes'))

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

app.use(favicon(process.cwd() + "/public/img/circleQ.ico"));

app.use('/price', populationRouter.getPopulations());

app.get('/searchinfo', function (req, res) {
    res.render('searchinfo', {
        title: 'price Chart'
    });
});

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(port, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      port,
      port
    );
  });
});

module.exports = app;
