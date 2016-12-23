var getOcr = require('./getOcr');

getOcr('/Users/jeff/Downloads/Done_Washer_Dryer and Misc items.pdf')
    .then(text => {
        console.log(text);
        const re = /\d\d\/\d\d\/\d\d\d\d/gi;
        let found = text.match(re);
        console.log(found);
    })
    .catch(err => {
        console.log('ERROR GETTING OCR FROM SERVER', err)
    })
    ;

