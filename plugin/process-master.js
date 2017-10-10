/* global setTimeout */
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const {requestUrl} = require('./check-url');

/**
 * ProcessMaster
 * @param {Object} config to check
 * @param {number} config.period check every XXX ms
 * @param {string[]} config.urls list of urls
 * @param {string} config.mail user mail
 * @param {string} config.pass user pass
 * @param {string} config.service mail service
 */
class ProcessMaster {
    constructor(config) {
        const model = this;

        model._period = config.period; // eslint-disable-line no-underscore-dangle
        model._urls = config.urls; // eslint-disable-line no-underscore-dangle
        model._mail = config.mail; // eslint-disable-line no-underscore-dangle

        model._transporter = nodemailer.createTransport(smtpTransport({ // eslint-disable-line no-underscore-dangle
            service: config.service,
            auth: {
                user: config.mail,
                pass: config.pass
            }
        }));
    }

    fetch() {
        const model = this;
        const urls = model._urls; // eslint-disable-line no-underscore-dangle
        const mail = model._mail; // eslint-disable-line no-underscore-dangle
        const transporter = model._transporter; // eslint-disable-line no-underscore-dangle

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
                from: mail,
                to: mail, // eslint-disable-line id-length
                subject: 'AAAAAAAAAAight!',
                // text: 'посмотреть состояние заказа можно'
                html: '<div>' + statuses.map(status => '<p>' + status + '</p>') + '</div>'
            };

            transporter.sendMail(mailOptions, (err, info) => err ?
                console.error(err) :
                console.log('Email sent to:', mail));
        });
    }

    run() {
        const model = this;

        model.fetch().then(() => setTimeout(() => model.run(), model._period)); // eslint-disable-line no-underscore-dangle
    }
}

module.exports.ProcessMaster = ProcessMaster;
