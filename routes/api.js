var fs = require('fs');


var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    fs.readFile('./public/html/api.html', function (err, html) {
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
/* teste push */