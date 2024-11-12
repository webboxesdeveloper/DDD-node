const fs = require('fs');

const read = (path) => {
  try {
    return fs.readFileSync(path, 'utf-8');
  } catch ({message}) {
    console.error(message);
    return null;
  }
};

module.exports = read;
