const nodemailer = require('nodemailer')

exports.sendMail = async (to, subject, text) => {
    console.log("'''''''''")
    const isMailSent = false
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'maheshmhaske241198@gmail.com',
            pass: 'mwerwwqgigzzlkus'
        }
    });

    var mailOptions = {
        from: 'maheshmhaske241198@gmail.com',
        to: to,
        subject: subject,
        text: text
    };

    await transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
            isMailSent == true
        }
    });


}