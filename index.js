require('dotenv').config();

const {check, requestUrl} = require('./plugin/check-url');
const {ProcessMaster} = require('./plugin/process-master');

module.exports.check = check;
module.exports.requestUrl = requestUrl;
module.exports.ProcessMaster = ProcessMaster;
