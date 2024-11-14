const ProductUpdatedResponse = require('./update-product-response');

class UpdateProduct {
  constructor({productRepository, eventBus, logger}) {
    this.productRepository = productRepository;
    this.eventBus = eventBus;
    this.logger = logger;
  }

  async update(updateProductCommand) {
    const {id, name, price} = updateProductCommand;

    const product = await this.productRepository.findById(id);
    if (!product) {
      this.logger.error(`Product with ID ${id} not found`);
      throw new Error(`Product with ID ${id} not found`);
    }
    product.updateDetails({name, price});
    await this.productRepository.save(product);
    this.handleEvents(product.getEvents()).catch((e) => this.logger.error(e));
    product.clearEvents();

    return new ProductUpdatedResponse(product);
  }

  async handleEvents(events) {
    for (const event of events) {
      this.logger.log(`Event: ${event.constructor.name}`, event);

      if (this.eventBus) {
        await this.eventBus.publish(event);
      }

      if (event.constructor.name === 'ProductUpdatedEvent') {
        this.logger.log(`Audit Log: Product updated with ID ${event.productId}`);
      }
    }
  }
}

module.exports = UpdateProduct;
