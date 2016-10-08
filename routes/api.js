var express = require('express');
var router = express.Router();
var colors = require('colors');


/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('Index page requested, not doing anything.'.yellow);
    res.send("welcome to file land.")
});

router.post('/ocr', function(req, res, next) {
    console.log('File uploading'.yellow);
    var sampleFile;
 
    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }
 
    sampleFile = req.files.sampleFile;
    sampleFile.mv('/tmp/filename.pdf', function(err) {
        if (err) {
            res.status(500).send(err);
        }
        else {
            res.send('File uploaded!');
        }
    });
});


module.exports = router;