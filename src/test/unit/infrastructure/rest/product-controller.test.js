const {app, server} = require('../../../../index');
const supertest = require('supertest');
const {CREATED, SERVER_ERROR, BAD_REQUEST} =
    require('../../../../infrastructure/rest/http-status-code');
const request = supertest(app);
const container = require('../../../../container');
const awilix = require('awilix');

describe('product controller', () => {
  afterEach(async () => {
    await server.close();
  });

  describe('POST product', () => {
    const path = '/api/v1/products';
    const productName = 'product1';
    const productId = '33d09213-8d2d-4013-9b44-cf450a4f98ac';

    test('should  return 400 Bad Request when params are missing', async () => {
      const res = await request.post(path);

      const expectedBody = {
        errors: [
          {message: `Field 'name' cannot be blank`, description: 'invalid params'},
          {message: `Field 'price' cannot be blank`, description: 'invalid params'},
        ],
      };

      const {status, headers, body} = res;
      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedBody);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should  return 400 Bad Request when price param is not a number', async () => {
      const res = await request.post(path).send({name: productName, price: 'invalid'});

      const expectedBody = {
        errors: [
          {message: `Provided value 'price' has no correct format for field`, description: 'invalid params'},
        ],
      };

      const {status, headers, body} = res;
      expect(status).toBe(BAD_REQUEST);
      expect(body).toEqual(expectedBody);
      expect(headers['content-type']).toContain('application/json');
    });

    test('should return 500 when an error occurred', async () => {
      const createProductMock = {
        create: jest.fn(),
      };

      container.register({
        createProduct: awilix.asValue(createProductMock),
      });

      createProductMock.create.mockRejectedValue(new Error('error'));

      const res = await request.post(path).send({name: productName, price: 7.5});

      const {status, body, headers} = res;
      expect(status).toBe(SERVER_ERROR);
      expect(body).toEqual({message: 'Internal Server Error', description: ''});
      expect(headers['content-type']).toContain('application/json');
      expect(createProductMock.create).toHaveBeenCalledTimes(1);
    });

    test('should return 201 with the product data just created', async () => {
      const createProductMock = {
        create: jest.fn(),
      };

      container.register({
        createProduct: awilix.asValue(createProductMock),
      });

      const expectedResponse = {id: productId, name: productName, price: 7.5};
      createProductMock.create.mockReturnValue(expectedResponse);

      const res = await request.post(path).send({name: productName, price: 7.5});

      const {status, body, headers} = res;
      expect(status).toBe(CREATED);
      expect(body).toEqual(expectedResponse);
      expect(headers['content-type']).toContain('application/json');
      expect(createProductMock.create).toHaveBeenCalledTimes(1);
      expect(createProductMock.create).toHaveBeenCalledWith({name: productName, price: 7.5});
    });
  });
});

