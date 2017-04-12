let logger = require('winston');

let ApiError = require('../errorHandler/ApiError');
let ValidationError = require('../errorHandler/ValidationError');

module.exports = (() => {
    return (error, res, code) => {
        let errorCode;

        logger.error(error);
        if (error instanceof ApiError) {
            return res.status(error.status).send(error);
        }

        if (error instanceof ValidationError) {
            if (!code) {
                errorCode = 400;
            }

            return res.status(errorCode).send(error);
        }

        if (error instanceof Error) {
            if (!code) {
                errorCode = 500;
            }

            return res.status(errorCode).send(error);
        }
    };
})();