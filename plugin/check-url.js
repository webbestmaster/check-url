const request = require('request');

/**
 *
 * @typedef {Object} CheckUrlConfig
 * @property {string} url - url to check.
 * @property {('get')} [method='get'] - while get only
 * @property {FormData} [formData] to post
 */

/**
 *
 * @param {CheckUrlConfig} config to check
 * @return {Promise} - will resolve on 200 only, on error and on not 200 will reject
 */
function check(config) {
    const checkUrlConfig = createCheckUrlConfig(config);
    const {method, url} = checkUrlConfig;

    if (method === 'get') {
        return requestUrl(url);
    }

    return requestByPost(url, {});
}

/**
 *
 * @param {string} url to check
 * @return {Promise} - will resolve on 200 only, on error and on not 200 will reject
 */
function requestUrl(url) {
    return new Promise((resolve, reject) => {
        request.get(url)
            .on('error', reject)
            .on('response', response => {
                const {statusCode} = response;

                if (statusCode !== 200) {
                    reject(response);
                    return;
                }

                resolve(response);
            });
    }
    );
}

/**
 *
 * @param {Object} config - raw config to check
 * @return {CheckUrlConfig} - created config
 */
function createCheckUrlConfig(config) {
    const neededFields = [
        {
            name: 'method',
            defaultValue: 'get'
        },
        {
            name: 'url'
        }
    ];

    return neededFields.reduce((checkUrlConfig, field) => {
        const fieldName = field.name;

        if (config.hasOwnProperty(fieldName)) {
            return Object.assign(checkUrlConfig, {[fieldName]: config[fieldName]});
        }

        if (field.hasOwnProperty('defaultValue')) {
            return Object.assign(checkUrlConfig, {[fieldName]: field.defaultValue});
        }

        return checkUrlConfig;
    }, {});
}

/**
 *
 * @param {string} url to check
 * @param {object} options to use in post request
 * @return {Promise} - will resolve on 200 only, on error and on not 200 will reject
 */
function requestByPost(url, options) {
    return Promise.reject({msg: 'while unsupported method'});
}

module.exports.check = check;
module.exports.requestUrl = requestUrl;
