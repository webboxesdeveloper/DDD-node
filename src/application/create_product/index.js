const Product = require('../../domain/product/product');
const CreateProductResponse = require('./create-product-response');
const ProductCreatedEvent = require('../../domain/events/product-created-event');

class CreateProduct {
  constructor({idGenerator, productRepository, eventBus, logger}) {
    this.idGenerator = idGenerator;
    this.productRepository = productRepository;
    this.eventBus = eventBus;
    this.logger = logger;
  }

  async create(createProductCommand) {
    const id = this.idGenerator.generate();
    const {name, price} = createProductCommand;

    const product = new Product({id, name, price});
    product.addEvent(new ProductCreatedEvent(product));
    await this.productRepository.save(product);

    this.handleEvents(product.getEvents()).catch((e) => this.logger.error(e));

    product.clearEvents();

    return new CreateProductResponse(product);
  }

  async handleEvents(events) {
    for (const event of events) {
      this.logger.log(`Event: ${event.constructor.name}`, event);

      if (this.eventBus) {
        await this.eventBus.publish(event);
      }

      if (event.constructor.name === 'ProductCreatedEvent') {
        this.logger.log(`Audit Log: Product created with ID ${event.productId}`);
      }
    }
  }
}

module.exports = CreateProduct;
