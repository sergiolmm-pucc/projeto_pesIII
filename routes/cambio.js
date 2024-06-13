var express = require('express');
var path = require("path"); 
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  fs.readFile('./public/html/Home.html', function (err, html) {

        if (err) {

            throw err;

        }     

        else {

           res.writeHeader(200, {"Content-Type": "text/html"}); 

            res.write(html); 

            res.end(); 

        }

    }); 
});

module.exports = router;
