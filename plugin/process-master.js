/* global setTimeout */
const {requestUrl} = require('./check-url');

/**
 * CheckMaster
 * @param {Object} config to check
 * @param {number} config.period check every XXX ms
 * @param {string[]} config.urls list of urls
 * @param {function} config.onError - will execute on error
 */
class CheckMaster {
    constructor(config) {
        const model = this;

        model._period = config.period; // eslint-disable-line no-underscore-dangle
        model._urls = config.urls; // eslint-disable-line no-underscore-dangle
        model._onError = config.onError; // eslint-disable-line no-underscore-dangle
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
                            console.log('OK ---> ' + link);
                        })
                        .catch(result => {
                            statuses.push('ERROR ---> ' + link);
                            console.error('ERROR ---> ' + link);
                        })
                    );
            });

        chain = chain.then(() => console.log('Check url loop.'));

        return chain.then(() => statuses.length ? Promise.reject({statuses}) : Promise.resolve());
    }

    run() {
        const model = this;

        model.fetch()
            .catch(model._onError) // eslint-disable-line no-underscore-dangle
            .then(() => setTimeout(() => model.run(), model._period)); // eslint-disable-line no-underscore-dangle
    }
}

module.exports.CheckMaster = CheckMaster;
