var util = require('util');

function ApiError(status, message) {
    this.status = status;
    this.message = message;
    Error.captureStackTrace(this);
}

util.inherits(ApiError, Error);
ApiError.prototype.name = 'ApiError';

module.exports = ApiError;
