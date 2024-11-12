const {validationResult} = require('express-validator');
const {NOT_AUTHORIZED, BAD_REQUEST} = require('../http-status-code');

const areHeadersValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(NOT_AUTHORIZED).json({errors: formatErrors(errors.array())});
  }
  next();
};

const formatErrors = (errors) => {
  return errors.map(({value, param}) => {
    if (value) {
      return {message: `Provided value '${param}' has no correct format for field`, description: 'invalid params'};
    }
    return {message: `Field '${param}' cannot be blank`, description: 'invalid params'};
  });
};

const isBodyValid = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(BAD_REQUEST).json({errors: formatErrors(errors.array())});
  }
  next();
};

module.exports = {areHeadersValid, isBodyValid};
