const awilix = require('awilix');
const winstonLogger = require('./infrastructure/logging/winston-logger');
const logger = require('./infrastructure/logging/logger');
const gracefulStopper = require('./infrastructure/graceful-stopper');
const idGenerator = require('./domain/services/id-generator');
const CreateProduct = require('./application/create_product');
const UpdateProduct = require('./application/update_product');
const GetProduct = require('./application/get_product');
const ProductRepository = require('./infrastructure/repositories/product-repository');
const EventBus = require('./infrastructure/event-bus');

const container = awilix.createContainer({
  injectionMode: awilix.InjectionMode.PROXY,
});

container.register({
  loggerService: awilix.asValue(winstonLogger),
  logger: awilix.asFunction(logger),
  gracefulStopper: awilix.asFunction(gracefulStopper),
  idGenerator: awilix.asValue(idGenerator),
  eventBus: awilix.asValue(EventBus),
  productRepository: awilix.asClass(ProductRepository).singleton(),
  createProduct: awilix.asClass(CreateProduct),
  updateProduct: awilix.asClass(UpdateProduct),
  getProduct: awilix.asClass(GetProduct),
});

module.exports = container;
