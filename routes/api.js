var express = require('express');
var router = express.Router();
var colors = require('colors');
var tesseract = require('node-tesseract');
var PDFImage = require("pdf-image").PDFImage;
var Promise = require('promise');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Index page requested, not doing anything.'.yellow);
    res.send("welcome to file land.")
});

router.post('/ocr', function (req, res, next) {
    console.log('File uploading'.yellow);
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;

    var filemv = Promise.denodeify(sampleFile.mv);
    var tmpfilename = '/tmp/filename.pdf';
    tesseract.process = Promise.denodeify(tesseract.process)
    filemv(tmpfilename)
        .then(function () {
            return tesseract.process(tmpfilename);
        })
        .then(function(text){
             console.log(text);
                    res.send(text);
        }).catch(function(err)
        {
             console.error(err);
                    res.status(500).send(err);
        });
});


module.exports = router;