const env = process.env.NODE_ENV;

const run = {
  server: {
    port: 3000,
  },
  app: {
    logLevel: process.env.LOG_LEVEL || 'info',
  },
};

const test = {
  server: {
    port: 3333,
  },
  app: {
    logLevel: 'error',
  },
};

const config = {
  run,
  test,
};

module.exports = config[env];
