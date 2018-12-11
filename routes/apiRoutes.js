var db = require("../models");
const scrapeIt = require("scrape-it");

module.exports = function(app) {
  // Get all searches
  app.get("/api/searches", function(req, res) {
    db.Search.findAll({}).then(function(dbSearches) {
      res.json(dbSearches);
    });
  });
 // Create a new searches
 app.post("/api/searches", function(req, res) {
  db.Search.create({
    search: req.body.search
  })
 });

  // takes User input to run scraper to get price data
  app.post("/api/searches", function(req, res) {

    // console.log(req.body.search)
    q = req.body.search
    console.log(q)
    for(var i = 0; i < q.length; i++) {
 
      q = q.replace(" ", "+");
      
      
     }

    //  console.log(q);
    //scrape function
    scrapeIt(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=${q}&_sacat=0&_ipg=200`, {
      price: "span.s-item__price"
      
    }).then(({ data, response }) => {
      var prices = [];
      console.log(`Status Code: ${response.statusCode}`)
        
      var updatedPrice = data.price
      //splits data to separate it by the $
      var onePrice = updatedPrice.split('$')
        
      //function to put the price into the database
      function priceChart (){
        for(var i = 1; i < onePrice.length; i++) {
          //takes away the commas in the data
          noCommas = onePrice[i].replace(',', '');
          //takes away to that comes into the data
          noLetter = noCommas.replace('to', '');
          // console.log(noLetter)
          var finalPrice = noLetter;
          // console.log(finalPrice);
           
          //pushes price to database
          prices.push(parseFloat(finalPrice));
        }

        
      }
      // function call
      priceChart()

      // Create Price
      let sum = prices.reduce((previous, current) => current += previous);
      console.log(sum)
      console.log(prices.length)
      let avg = parseFloat(sum) / prices.length;
      console.log(avg)
      db.Search.create({search: req.body.search, price: avg}).then(function(result){
        res.json(result);
      });
    })
       
  });

  // Delete an example by id
  app.delete("/api/searches/:id", function(req, res) {
    db.Search.destroy({ where: { id: req.params.id } }).then(function(searchesdb) {
      res.json(searchesdb);
    });
  });

};
