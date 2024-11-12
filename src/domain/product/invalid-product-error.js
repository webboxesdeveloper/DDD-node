const ApplicationError = require('../application-error');

class InvalidProductError extends ApplicationError {
  constructor(message) {
    super(message);
    this.name = 'InvalidProductError';
  }
}

module.exports = InvalidProductError;
