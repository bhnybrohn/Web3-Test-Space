var request = require('request');
const axios = require('axios')
var options = {
    'method': 'POST',
    'url': 'https://app.syntizen.com/api/sws/getCaptcha',
    'headers': {
        'apikey': ' ',
        'authkey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im1vaWdvbGRAdWF0LmNvbXw3NnxISkZVUi1KS0VJSC1LSkhEVy1KV0tEV3xNb2lnb2xkIiwibmJmIjoxNjY0MjMxOTc1LCJleHAiOjE2NjQyMzU1NzUsImlhdCI6MTY2NDIzMTk3NX0.iYdUtFD4SnkWx4UosJFjZEFedDwPH86ifmVtfr3GwHQ',
        'Content-Type': 'application/json'
    },
    data: JSON.stringify({
        "aadhaar_no": "249398045454"
    })

};
axios(options).then(function (response) {
    console.log(response);
}).catch(function (error) {
    console.log(error);
})
// request(options, function (error, response) {
//     if (error) throw new Error(error);
//     console.log(response.body);
// });