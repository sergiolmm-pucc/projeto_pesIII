var express = require('express');
var path = require("path"); 
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res) {
  res.sendFile(path.join(_dirname, '../public/hmtl/Home.html'));
});

module.exports = router;
