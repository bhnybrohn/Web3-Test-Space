var nodemailer = require('nodemailer');

var html2 = `<html><body>Dear Customer,<br/><br/>You can view your Invoice Summary via this email attachment, please use your vehicle number as your password.<br/>
This is a system-generated e-mail. Please do not reply to this email.
<br/>
        <br/><br/>Thank you for servicing with us.
        <br/>Inchcape Singapore.
        <br/>
        <br />
        
        <table border="1" cellspacing="0" cellpadding="0" style="border-collapse:collapse;border:none">
        <tbody>
        <tr>
        <td width="623" valign="top" style="width:467.5pt;border:solid windowtext 1.0pt;padding:0cm 5.4pt 0cm 5.4pt">
        <p class="MsoNormal"><i><span style="font-size:8.0pt;font-family:&quot;Segoe UI&quot;,sans-serif">The content of this email is confidential and intended for the recipient specified in message only. It is strictly forbidden to share any part
        of this message with any third party, without a written consent of the sender. If you received this message by mistake, please reply to this message and follow with its deletion, so that we can ensure such a mistake does not occur in the future. You may email
        to <a href="mailto:CR@inchcape.com.sg" target="_blank">CR@inchcape.com.sg</a> for any enquiry.<u></u><u></u></span></i></p>
        <p class="MsoNormal"><u></u>&nbsp;<u></u></p>
        </td>
        </tr>
        </tbody>
        </table>
        `;


var mailOptions = {
    from: 'support@moigold.com',
    to: "smyxbrone@gmail.com",
    cc: "calm down",
    subject: 'Thank you for your servicing with us ',
    html: html2
    // attachments: [
    //     {
    //     content: attachment,
    //     filename:  invoice_no+'.pdf',
    //     encoding: 'base64',
    //     }
    // ]
};


const transporter = nodemailer.createTransport({
    pool: true,
    host: 'smtppro.zoho.com', // Office 365 server
    port: 465, // port for secure SMTP
    secure: true, // use TLS
    auth: {
        user: 'support@moigold.com',
        pass: 'MoiSupport@123#'
    },
    // tls: {
    //     // do not fail on invalid certs
    //     rejectUnauthorized: false,
    // },
});

// var transporter = nodemailer.createTransport({
//     host: 'smtppro.zoho.com', // Office 365 server
//     port: 587, // port for secure SMTP
//     auth: {
//         user: 'support@moigold.com',
//         pass: 'MoiSupport@123#'
//     },
//     secureConnection: false,
//     tls: {
//         ciphers: 'SSLv3',
//     }
// });
transporter.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});
// transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//         console.log(error);
//     } else {
//         console.log('Email sent: ' + info.response);
//     }
// });   