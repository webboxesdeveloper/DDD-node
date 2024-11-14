class ProductRepository {
  constructor() {
    this.products = []; // Temporary in-memory storage
  }

  async save(product) {
    const existingProductIndex = this.products.findIndex((p) => p.id === product.id);

    if (existingProductIndex !== -1) {
      this.products[existingProductIndex] = product;
    } else {
      this.products.push(product);
    }

    return product;
  }

  async findById(id) {
    return this.products.find((product) => product.id === id);
  }

  async getAll() {
    return this.products;
  }
}

module.exports = ProductRepository;
