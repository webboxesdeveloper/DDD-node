class ProductUpdatedEvent {
  constructor(product) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.updatedAt = new Date();
  }
}

module.exports = ProductUpdatedEvent;
