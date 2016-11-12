var express = require('express');
var router = express.Router();
var colors = require('colors');
var tesseract = require('node-tesseract');
var PDFImage = require('pdf-image').PDFImage;
var Promise = require('promise');
var _ = require('underscore');
var uuid = require('uuid')
var glob = Promise.denodeify(require('glob'));
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    console.log('Index page requested, not doing anything.'.yellow);
    res.send('welcome to file land.');
});

router.post('/ocr', function (req, res, next) {
    console.log('File uploading'.yellow);
    var sampleFile;

    if (!req.files) {
        res.send('No files were uploaded.');
        return;
    }

    sampleFile = req.files.sampleFile;

    sampleFile.mv = Promise.denodeify(sampleFile.mv);
    var docUUID = uuid.v4();
    var tmpfilename = '/tmp/' + docUUID + '.pdf';
    tesseract.process = Promise.denodeify(tesseract.process);

    sampleFile.mv(tmpfilename)
        .then(() => {
            var options = {};
            options.convertOptions = {};
            options.convertOptions['-quality'] = "100";
            options.convertOptions['-density'] = "150";
            var pdfImage = new PDFImage(tmpfilename, options);
            return Promise.all([pdfImage, pdfImage.numberOfPages()]);

        })
        .then(data => {
            var pdfImage = data[0];
            var numberOfPages = data[1];

            //convert all pdfPages to images. Set the pdfImage as the context.
            return Promise.all(
                _.map(
                    _.range(numberOfPages), pageNum =>(
                        pdfImage.convertPage(pageNum)
                        .then(data => {
                             console.log('dataaaaaa',data);
                            return data;
                        })
                    ), pdfImage));

        })
        .then(filenames => {
            console.log('DATA', filenames);

            // process all converted files
            return Promise.all(_.map(filenames, filename => {
                return tesseract.process(filename)
                    .then(text => {
                        return text.trim();
                    }).
                    catch(err =>{
                        console.log('ERRRROR', err)
                    });
            }));
        })
        .then(text => {
            console.log('translated text', text);
            res.send(text.join(''));
        })
        .catch(err => {
            //catch errors
            console.error('error in last catch block', err);
            res.status(500).send(err);
        })
        .finally(() => {
            var unlink = Promise.denodeify(fs.unlink);
            glob('/tmp/' + docUUID + '*')
                .then(files => {
                    console.log('DELETEING FILES', files);
                    return Promise.all(_.map(files, file =>{
                        return unlink(file);
                    }));
                })
                .then(files => {
                    console.log('DELETED', files)
                })
                .catch(err => (
                    console.log('ERROR REMOVING FILES', err, files)
                ))
        });
});


module.exports = router;