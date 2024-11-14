// const GetProductResponse = require('./get-product-response');

class GetProduct {
  constructor({productRepository}) {
    this.productRepository = productRepository;
  }

  async get() {
    const products = await this.productRepository.getAll();

    return (products);
  }
}

module.exports = GetProduct;
