const getOcr = require('./getOcr');
const Knwl = require('knwl.js');
let knwlInstance = new Knwl('english');
//knwlInstance.register('dates', require('./default_plugins/dates'));


//getOcr('/Users/jeff/Downloads/Done_Washer_Dryer and Misc items.pdf')
getOcr('/Users/jeff/Downloads/Done_Scanned_20161210-0103.pdf')
    .then(text => {
        //replace all '.' with ',' because the OCR often thinks commas are periods and knwl uses '.' to terminate dates
        text = text.replace(/\./g, ',');
        knwlInstance.init(text);
        console.log(text);
        console.log('dates', knwlInstance.get('dates'));
        let dates = knwlInstance.get('dates');
        dates = dates.filter(date => {
            let thisYear = new Date().getFullYear();
            return date.year > thisYear - 10 && date.year < thisYear + 10;
        });
        console.log('filtered dates', dates);
        //console.log('places', knwlInstance.get('places'));
    })
    .catch(err => {
        console.log('ERROR GETTING OCR FROM SERVER', err);
    });

