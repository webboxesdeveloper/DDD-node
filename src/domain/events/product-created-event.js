class ProductCreatedEvent {
  constructor(product) {
    this.productId = product.id;
    this.name = product.name;
    this.price = product.price;
    this.createdAt = new Date();
  }
}

module.exports = ProductCreatedEvent;
