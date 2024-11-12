const awilix = require('awilix');
const winstonLogger = require('./infrastructure/logging/winston-logger');
const logger = require('./infrastructure/logging/logger');
const gracefulStopper = require('./infrastructure/graceful-stopper');
const idGenerator = require('./domain/services/id-generator');
const CreateProduct = require('./application/create_product');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  loggerService: awilix.asValue(winstonLogger),
  logger: awilix.asFunction(logger),
  gracefulStopper: awilix.asFunction(gracefulStopper),
  idGenerator: awilix.asValue(idGenerator),
  createProduct: awilix.asClass(CreateProduct),
});

module.exports = container;
