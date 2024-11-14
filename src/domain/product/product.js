const AggregateRoot = require('../base/aggregate-root');
const InvalidProductError = require('./invalid-product-error');
const {isEmpty, isNumber} = require('../../common/helpers');
const ProductUpdatedEvent = require('../events/product-updated-event');

class Product extends AggregateRoot {
  constructor({id, name, price, createdAt, updatedAt}) {
    super();

    this.id = id;
    this.name = name;
    this.price = price;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  updateDetails({name, price}) {
    if (name) this.name = name;
    if (price) this.price = price;
    this.updatedAt = new Date();

    this.addEvent(new ProductUpdatedEvent(this));
  }

  set id(id) {
    if (isEmpty(id)) {
      throw new InvalidProductError('Field id cannot be empty');
    }

    this._id = id;
  }

  get id() {
    return this._id;
  }

  set name(name) {
    if (isEmpty(name)) {
      throw new InvalidProductError('Field name cannot be empty');
    }
    this._name = name;
  }

  get name() {
    return this._name;
  }

  set price(price) {
    if (isEmpty(price)) {
      throw new InvalidProductError('Field price cannot be empty');
    }

    if (!isNumber(price)) {
      throw new InvalidProductError('Field price must be a number');
    }

    this._price = price;
  }

  get price() {
    return this._price;
  }

  set createdAt(createdAt) {
    this._createdAt = createdAt ? createdAt : new Date();
  }

  get createdAt() {
    return this._createdAt;
  }

  set updatedAt(updatedAt) {
    this._updatedAt = updatedAt ? updatedAt : this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }
}

module.exports = Product;
