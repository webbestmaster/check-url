# check-url
check url every few minutes

your-file.js
```javascript
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
  
const {CheckMaster} = require('url-master');  
  
const checkMaster = new CheckMaster({
    period: 5000, // every 5s
    urls: ['http://google.com', 'http://github.com'],
    onError: urlErr => {
        const mailOptions = {
            from: 'you@gmail.com',
            to: 'admin@gmail.com', // eslint-disable-line id-length
            subject: 'Aaaaaaaaaight!',
            html: urlErr.statuses.map(status => '<p>' + status + '</p>').join('')
        };

        const transporter = nodemailer.createTransport(smtpTransport({
            service: 'gmail',
            auth: {
                user: 'you@gmail.com',
                pass: 'you-password'
            }
        }));

        transporter.sendMail(mailOptions, mailErr => mailErr ?
            console.error(mailErr) :
            console.log('Email sent to: admin@gmail.com'));
    }
});

checkMaster.run();

```
