var express = require('express');
var router = express.Router();
const path = require('path')
const finan = require('../public/javascripts/finan')


/* GET users listing. */
router.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + "/../views/finan.html"))
});


module.exports = router;