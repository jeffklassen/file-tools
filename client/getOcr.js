const fs = require('fs');
const Promise = require('promise');
const post = Promise.denodeify(require('request').post);

module.exports = (path) => {
    const formData = {
        ocrFile: fs.createReadStream(path)
    };
    console.log('posting form data');
    return post({ url: 'http://localhost:3000/ocr', formData })
        .then(res => res.body);

};