class UpdateProductCommand {
  constructor({id, name, price}) {
    this.id = id;
    this.name = name;
    this.price = price;
  }
}

module.exports = UpdateProductCommand;
