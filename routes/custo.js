var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  fs.readFile('./public/html/preco_venda.html', function (err, html) {
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
