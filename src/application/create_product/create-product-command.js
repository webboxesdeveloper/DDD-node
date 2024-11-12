class CreateProductCommand {
  constructor({name, price}) {
    this.name = name;
    this.price = price;
  }
}

module.exports = CreateProductCommand;
