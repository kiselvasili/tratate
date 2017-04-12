var util = require('util');

function ValidationError(message) {
    this.message = message;
    Error.captureStackTrace(this);
}

util.inherits(ValidationError, Error);
ValidationError.prototype.name = 'ValidationError';

module.exports = ValidationError;