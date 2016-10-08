var express = require('express');
var router = express.Router();
var colors = require('colors');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Index page requested, not doing anything.'.yellow);
    res.send("welcome to security land.")
});


module.exports = router;