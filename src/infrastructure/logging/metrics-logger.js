const metricsLogger = ({logger}) => {
  return {
    write: (message) => message
        .match(/(\/engineering\/api\/v1\/(metrics|health|self)|\/engineering\/(metrics|health|self)|\/monitor\/ping)/) ?
      '' : logger.info(message),
  };
};

module.exports = metricsLogger;
