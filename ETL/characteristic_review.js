const transform = require('./transform');

const numbers = new Set(['id', 'characteristic_id', 'review_id', 'value']);
const nVals = new Set();
const field = ['id', 'characteristic_id', 'review_id', 'value'];

transform('characteristics_review', numbers, nVals, field);
