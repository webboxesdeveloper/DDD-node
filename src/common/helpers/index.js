/**
 * Checks if a value is a number.
 * It rejects NaN and Infinity.
 *
 * @param {*} value The value to be checked.
 * @return {boolean} True if the value can be considered as a number, false in other case.
 */
const isNumber = (value) => {
  return typeof value === 'number' && isFinite(value);
};

/**
 * Checks if a value is a boolean.
 *
 * @param {*} value The value to be checked.
 * @return {boolean} True if the value is a boolean, false in other case.
 */
const isBoolean = (value) => {
  return typeof value === 'boolean';
};

const isString = (value) => {
  return typeof value === 'string';
};

/**
 * Checks if a string, array or object is empty.
 * It considers empty any parameter that is undefined or null.
 * It considers empty a string or array with length 0.
 * It considers empty any object that has no properties.
 *
 * @param {*} data The data to be checked.
 * @return {boolean} True if the parameter was empty, false in other case.
 */
const isEmpty = (data) => {
  if (isNumber(data) || isBoolean(data)) {
    return false;
  }

  if (typeof(data) == 'undefined' || data === null) {
    return true;
  }

  // for arrays and strings
  if (typeof(data.length) != 'undefined') {
    return data.length === 0;
  }

  // for objects
  return Object.keys(data).length === 0;
};

module.exports = {
  isEmpty,
  isNumber,
  isBoolean,
  isString,
};
