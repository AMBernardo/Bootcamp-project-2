
//Ebay
var scrapeIt = require("scrape-it")
 scrapeIt("https://www.ebay.com/sch/i.html?_from=R40&_nkw=laptop&_sacat=0&_ipg=200", {
     price: "span.s-item__price"
    
   }).then(({ data, response }) => {
       console.log(`Status Code: ${response.statusCode}`)
       console.log(data)
       console.log("ebay");
   })

// Wal-Mart
 scrapeIt("https://www.walmart.com/search/?query=laptop", {
     price: ".search-result-productprice"
    
   }).then(({ data, response }) => {
       console.log(`Status Code: ${response.statusCode}`)
       console.log(data)
       console.log("walmart");
   })

  




   scrapeIt("https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Daps&field-keywords=laptop&rh=i%3Aaps%2Ck%3Alaptop", {
       whole:"sx-price-wholde",
       fraction: "sx-price-fractional"

   
  }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data)
      console.log("Amazon");
  })
  module.exports = scrapeIt();