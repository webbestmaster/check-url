/* global process, setTimeout, process */
const {MAIL, PASS, PERIOD, URLS} = process.env; // eslint-disable-line no-process-env
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const {requestUrl} = require('./check-url');

if (!MAIL || !PASS || !PERIOD || !URLS) {
    throw new Error('MAIL, PASS, PERIOD, URLS - should be in process!!!');
}

const transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: MAIL,
        pass: PASS
    }
}));

class ProcessMaster {
    constructor() {
        const model = this;

        model._period = Number(PERIOD); // eslint-disable-line no-underscore-dangle
        model._urls = URLS.split(/,\s*/g).filter(url => url); // eslint-disable-line no-underscore-dangle

        model.run();
    }

    fetch() {
        const model = this;
        const urls = model._urls; // eslint-disable-line no-underscore-dangle

        let chain = Promise.resolve();
        const statuses = [];

        urls
            .forEach(link => {
                chain = chain
                    .then(() => requestUrl(link)
                        .then(result => {
                            // statuses.push('OK --->' + link);
                            console.log('OK ---> ', link);
                        })
                        .catch(result => {
                            statuses.push('ERROR --->' + link);
                            console.error('ERROR ---> ', link);
                        })
                    );
            });

        return chain.then(() => {
            if (statuses.length === 0) {
                return;
            }

            const mailOptions = {
                from: MAIL,
                to: MAIL, // eslint-disable-line id-length
                subject: 'AAAAAAAAAAight!',
                // text: 'посмотреть состояние заказа можно'
                html: '<div>' + statuses.map(status => '<p>' + status + '</p>') + '</div>'
            };

            transporter.sendMail(mailOptions, (err, info) => err ?
                console.error(err) :
                console.log('Email sent to:', MAIL));
        });
    }

    run() {
        const model = this;

        model.fetch().then(() => setTimeout(() => model.run(), model._period)); // eslint-disable-line no-underscore-dangle
    }
}

module.exports.ProcessMaster = ProcessMaster;
