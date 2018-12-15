var cors = require('cors'),
    express = require('express'),
    populationRouter = express.Router(),        
    mysql = require('mysql');
var connection = mysql.createConnection({
 connectionLimit : 1, //important 
'host' : 'localhost',
'port' : '3306',
'user' : 'root',
'password' : 'password',
'database' : 'searchdb'
});
 
populationRouter.all('*', cors());

var getPopulations = function(){
    
    populationRouter.route('/')    
    .get(function(req,res){
        connection.query('SELECT * from searches',  function(err, rows, fields) {
            if (err) {
                console.error(err);
                res.statusCode = 500;
                res.send({
                    result: 'error',
                    err:    err.code
                });
            }
            
            res.send(rows);
        }); 
    });
    
    return populationRouter;
        
};


module.exports = {
  getPopulations: getPopulations
};