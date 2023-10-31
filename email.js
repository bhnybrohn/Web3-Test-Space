const nodeMailer = require('nodemailer');
const q = require('q');
const sgMail = require('@sendgrid/mail');

//
//// (async () => {
//
//// })()
//
//function sendgrid(options) {
//    let deferred = q.defer()
//    sgMail.setApiKey("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");
//
//    const msg = {
//        to: "ajay.silicomm@gmail.com,",
//        from: "Wah Hong <" + "wahhongapp@gmail.com" + ">",
//        subject: "smyxbrone",
//        html: `<h1>This is me testing </h1>`,
//    };
//
//    sgMail.send(msg, function (err, sentResult) {
//        if (err) {
//            console.log(err);
//            deferred.resolve(err);
//        } else {
//            //console.log('sentResult', msg);
//            deferred.resolve(sentResult);
//        }
//    });
//    return deferred.promise;
//}
//
//module.export = sendgrid
//
//const nodemailer = require('nodemailer');
//
//const transporter = nodemailer.createTransport({
//    service: 'gmail',
//    auth: {
//        user: 'smyxbrone@gmail.com',
//        pass: 'ryxujrbhykiukyne'
//    }
//});
//
//const mailOptions = {
//    from: 'smyxbrone@gmail.com',
//    to: 'recipient_email@example.com',
//    subject: 'Test Email',
//    text: 'This is a test email'
//};
//
//transporter.sendMail(mailOptions, function(error, info){
//    if (error) {
//        console.log(error);
//    } else {
//        console.log('Email sent: ' + info.response);
//    }
//});


const axios = require('axios');
let data = JSON.stringify({
    "alias": "ws@roltzlimited.com",
    "version": "1.00",
    "request": [
        {
            "requesttypedescriptions": [
                "REFUND"
            ],
            "sitereference": "roltzeyewearecom116366",
            "parenttransactionreference": "1-2-345678"
        }
    ]
});

let config = {
    method: 'post',
    maxBodyLength: Infinity,
    url: 'https://webservices.securetrading.net/json/',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic cmFqaW9yYXphcUBnbWFpbC5jb206VGVzdGVkMjAyMyQ='
    },
    data : data
};

axios.request(config)
.then((response) => {
    console.log(JSON.stringify(response.data));
})
.catch((error) => {
    console.log(error);
});
