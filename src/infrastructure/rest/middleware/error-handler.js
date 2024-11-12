const {SERVER_ERROR, BAD_REQUEST} = require('../http-status-code');
const container = require('../../../container');

const handleError = (err, req, res, next) => {
  const logger = container.resolve('logger');
  logger.error(err);

  if (err instanceof SyntaxError) {
    return res.status(BAD_REQUEST).json({message: 'Bad Request', description: 'malformed request'});
  }

  return res.status(SERVER_ERROR).json({message: 'Internal Server Error', description: ''});
};

module.exports = handleError;
