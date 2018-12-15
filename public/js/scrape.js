var scrapeIt = require("scrape-it")
function scrape(){
scrapeIt(`https://www.ebay.com/sch/i.html?_from=R40&_nkw=2015+macbook&_sacat=0&_ipg=200`, {
    price: "span.s-item__price"
  }).then(({ data, response }) => {
      console.log(`Status Code: ${response.statusCode}`)
      console.log(data)

      
        });
    } 
module.exports = scrape();