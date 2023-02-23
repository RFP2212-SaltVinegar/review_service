const transform = require('./transform');

const numbers = new Set(['id', 'product_id']);
const nVals = new Set();
const field = ['id', 'product_id', 'name'];

transform('characteristics', numbers, nVals, field);
