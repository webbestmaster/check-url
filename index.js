const {check, requestUrl} = require('./plugin/check-url');
const {CheckMaster} = require('./plugin/process-master');

module.exports.check = check;
module.exports.requestUrl = requestUrl;
module.exports.CheckMaster = CheckMaster;
