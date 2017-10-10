const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const {CheckMaster} = require('./../index');

const checkMaster = new CheckMaster({
    period: 5000, // every 5s
    urls: ['http://google.com', 'http://github.com1', 'http://statlex.github.com'],
    onError: urlErr => {
        const mailOptions = {
            from: 'web.best.master@gmail.com',
            to: 'web.best.master@gmail.com', // eslint-disable-line id-length
            subject: 'Aaaaaaaaaight!',
            html: urlErr.statuses.map(status => '<p>' + status + '</p>').join('')
        };

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: 'web.best.master@gmail.com',
                pass: ''
            }
        }));

        transporter.sendMail(mailOptions, mailErr => mailErr ?
            console.error(mailErr) :
            console.log('Email sent to: web.best.master@gmail.com'));
    }
});

checkMaster.run();
