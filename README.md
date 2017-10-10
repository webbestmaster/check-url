# check-url
check url every few minutes

use .env file  
MAIL=my@gmail.com // support gmail only  
PASS=some_pass  
PERIOD=3000  
URLS=site1.com, site2.com

your-file.js
```javascript
const {ProcessMaster} = require('check-url');
const processMaster = new ProcessMaster();
processMaster.run();
```
