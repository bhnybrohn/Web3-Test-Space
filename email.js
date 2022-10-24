const nodeMailer = require('nodemailer');
const q = require('q');
const sgMail = require('@sendgrid/mail');


// (async () => {

// })()

function sendgrid(options) {
    let deferred = q.defer()
    sgMail.setApiKey("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");

    const msg = {
        to: "ajay.silicomm@gmail.com,",
        from: "Wah Hong <" + "wahhongapp@gmail.com" + ">",
        subject: "smyxbrone",
        html: `<h1>This is me testing </h1>`,
    };

    sgMail.send(msg, function (err, sentResult) {
        if (err) {
            console.log(err);
            deferred.resolve(err);
        } else {
            //console.log('sentResult', msg);
            deferred.resolve(sentResult);
        }
    });
    return deferred.promise;
}

module.export = sendgrid