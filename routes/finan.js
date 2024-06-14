var express = require('express');
var router = express.Router();
const path = require('path')


/* GET users listing. */
router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


module.exports = router;