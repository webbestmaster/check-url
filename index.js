require('dotenv').config();

// const {check, requestUrl} = require('./plugin/check-url');
const {ProcessMaster} = require('./plugin/process-master');

module.exports.ProcessMaster = ProcessMaster;

new ProcessMaster(); // eslint-disable-line no-new
