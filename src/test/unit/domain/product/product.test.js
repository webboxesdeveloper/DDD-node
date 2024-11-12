const Product = require('../../../../domain/product/product');
const InvalidProductError = require('../../../../domain/product/invalid-product-error');

describe('Product domain entity', () => {
  const name = 'product1';
  const id = 'xxxxx';

  describe('should check invariants', () => {
    it('should throw InvalidProductError if id is not provided', () => {
      const t = () => new Product({});
      expect(t).toThrow(InvalidProductError);
      expect(t).toThrow('Field id cannot be empty');
    });

    test('should throw InvalidProductError if name is not provided', () => {
      const t = () => new Product({id});
      expect(t).toThrow(InvalidProductError);
      expect(t).toThrow('Field name cannot be empty');
    });

    test('should throw InvalidProductError if price is not provided', () => {
      const t = () => new Product({id, name});
      expect(t).toThrow(InvalidProductError);
      expect(t).toThrow('Field price cannot be empty');
    });

    test('should throw InvalidProductError if price is not a number', () => {
      const t = () => new Product({id, name, price: 'invalid'});
      expect(t).toThrow(InvalidProductError);
      expect(t).toThrow('Field price must be a number');
    });

    test('should create product correctly', () => {
      const now = new Date();
      const product = new Product({id, name, price: 7.50, createdAt: now, updatedAt: now});

      expect(product).toEqual(expect.objectContaining({_id: id, _name: name, _createdAt: now, _updatedAt: now}));
    });

    test('should create product correctly with current date for created and updated at', () => {
      const now = new Date();
      jest
          .spyOn(global, 'Date')
          .mockImplementation(() => now);

      const product = new Product({id, name, price: 7.50});

      expect(product).toEqual(expect.objectContaining({_id: id, _name: name, _createdAt: now, _updatedAt: now}));
    });
  });
});
