// Inject dependencies here and call to disconnect. I.e. if you have a mongodb inject its handler and call to disconnect
// and do the same for the rest of dependencies. Don't forget to REMOVE ME, I am just a comment nothing else
const gracefulStopper = ({logger}) => {
  return {
    stopGracefully: () => {
      logger.info('Gracefully stopping server...');
      logger.info('Server was gracefully stopped!! Exiting');
      process.exit(0);
    },
  };
};

module.exports = gracefulStopper;
