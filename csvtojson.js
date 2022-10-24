const csv = require('csvtojson')
const csvFilePath = 'ccdd.csv'
csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
        console.log(jsonObj);

    })