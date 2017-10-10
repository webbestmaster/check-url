# check-url
check url every few minutes

your-file.js
```javascript
const {ProcessMaster} = require('check-urls');

const processMaster = new ProcessMaster({
    period: 5000, // every 5s
    urls: ['http://google.com', 'http://github.com'],
    service: 'gmail',
    mail: 'your@gmail.com',
    pass: 'pass-from-gmail'
});

processMaster.run();
```
