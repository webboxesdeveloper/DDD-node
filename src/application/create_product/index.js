const Product = require('../../domain/product/product');
const CreateProductResponse = require('./create-product-response');

class CreateProduct {
  constructor({idGenerator}) {
    this.idGenerator = idGenerator;
  }

  async create(createProductCommand) {
    const id = this.idGenerator.generate();
    const {name, price} = createProductCommand;

    const product = new Product({id, name, price});

    return new CreateProductResponse(product);
  }
}

module.exports = CreateProduct;
