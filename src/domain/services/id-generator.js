const {v4: uuidv4} = require('uuid');

const idGenerator = () => {
  return {
    generate: () => uuidv4(),
  };
};

module.exports = idGenerator();
