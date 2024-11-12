const container = require('../../../../container');
const awilix = require('awilix');
const CreateProductCommand = require('../../../../application/create_product/create-product-command');

describe('Create product use case', () => {
  let idGeneratorMock;
  let createProduct;
  const id = '33d09213-8d2d-4013-9b44-cf450a4f98ac';
  const name = 'product1';
  const price = 7.5;

  beforeEach(() => {
    idGeneratorMock = {
      generate: jest.fn(),
    };

    container.register({
      idGenerator: awilix.asValue(idGeneratorMock),
    });

    createProduct = container.resolve('createProduct');
  });

  afterEach(() => jest.restoreAllMocks());

  test('should create product', async () => {
    idGeneratorMock.generate.mockReturnValue(id);

    const createProductCommand = new CreateProductCommand({name, price});

    const response = await createProduct.create(createProductCommand);

    expect(idGeneratorMock.generate).toHaveBeenCalledTimes(1);
    expect(response).toEqual({id, name, price});
  });
});
