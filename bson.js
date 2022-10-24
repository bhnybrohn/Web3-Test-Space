const fs = require('fs');
const BsonJsonTransform = require('bson-json-transform');
const path = require('path');
let json = fs.readFileSync(path.join(__dirname, './banksummaries.bson'), 'utf8')
fs
    .createReadStream(json)
    .pipe(BsonJsonTransform({ preserveInt64: 'string' }))
    .pipe(fs.createWriteStream('my_data.json'))
    .on('end', function (data) {
        console.log(data);
        console.log('No more data!');
    });