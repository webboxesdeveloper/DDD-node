require('dotenv').config();

const {server: {port}} = require('./infrastructure/config');
const express = require('express');
const app = express();
const metricsLogger = require('./infrastructure/logging/metrics-logger');
const logger = require('./infrastructure/logging/winston-logger');
const morgan = require('morgan');
const cors = require('cors');
const container = require('./container');

const productRoutes = require('./infrastructure/rest/product-controller');
const handleError = require('./infrastructure/rest/middleware/error-handler');
const gracefulStopper = container.resolve('gracefulStopper');
const eventBus = require('./infrastructure/event-bus');

app.use(morgan('HTTP :method :url :remote-addr - [:date[clf]] [:status] - :response-time ms',
    {'stream': metricsLogger({logger})}));
app.use(express.json());
app.use(cors());

app.use('/api/v1/products', productRoutes);

app.use('*', function(req, res) {
  res.status(404).send();
});

app.use(handleError);

const server = app.listen(port, () => console.log(`App listening at http://localhost:${port}`));

eventBus.on('ProductCreatedEvent', (event) => {
  console.log(`Product created: ${event.productId}, ${event.name}, ${event.price}`);
});

const signals = ['SIGINT', 'SIGTERM', 'SIGUSR1', 'SIGUSR2'];
process.stdin.resume();
signals.forEach((signal) => process.on(signal, () => gracefulStopper.stopGracefully()));

module.exports = {app, server};

