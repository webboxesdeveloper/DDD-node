const express = require('express');
// eslint-disable-next-line new-cap
const router = express.Router();
const {CREATED, OK} = require('./http-status-code');
const {isBodyValid} = require('./middleware/rest-validator');
const {check} = require('express-validator');
const container = require('../../container');
const CreateProductCommand = require('../../application/create_product/create-product-command');
const UpdateProductCommand = require('../../application/update_product/update-product-command');

router.post('/', [
  check('name').notEmpty(),
  check('price').isNumeric(),
], isBodyValid, async (req, res, next) => {
  try {
    const {name, price} = req.body;

    const createProductCommand = new CreateProductCommand({name, price});
    const createProduct = container.resolve('createProduct');
    const response = await createProduct.create(createProductCommand);
    return res.status(CREATED).json(response);
  } catch (err) {
    next(err);
  }
});

router.put('/', [
  check('name').notEmpty(),
  check('price').isNumeric(),
], isBodyValid, async (req, res, next) => {
  try {
    const {id, name, price} = req.body;

    const updateProductCommand = new UpdateProductCommand({id, name, price});
    const updateProduct = container.resolve('updateProduct');
    const response = await updateProduct.update(updateProductCommand);
    return res.status(CREATED).json(response);
  } catch (err) {
    next(err);
  }
});

router.get('/', async (req, res, next) => {
  try {
    const getProduct = container.resolve('getProduct');
    const response = await getProduct.get();
    return res.status(CREATED).json(response);
  } catch (err) {
    next(err);
  }
});

// router.get('/', async (req, res, next) => {
//   return res.status(OK).json({products: [{name: 'product1', price: 10,
//     image: 'https://us-tuna-sounds-images.voicemod.net/27ffe186-fe10-4807-8c09-71c4bcfca96e-1671245463892.jpg'},
//   {name: 'product2', price: 20,
//     image: 'https://us-tuna-sounds-images.voicemod.net/27ffe186-fe10-4807-8c09-71c4bcfca96e-1671245463892.jpg'},
//   {name: 'product3', price: 30,
//     image: 'https://us-tuna-sounds-images.voicemod.net/27ffe186-fe10-4807-8c09-71c4bcfca96e-1671245463892.jpg'}]});
// });

module.exports = router;
