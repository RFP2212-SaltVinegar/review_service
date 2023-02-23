const transform = require('./transform');

const numbers = new Set(['id', 'product_id', 'rating', 'helpfulness']);
const nVals = new Set(['response']);
const field = ['id', 'product_id', 'rating', 'date', 'summary', 'body', 'recommended', 'reported', 'reviewer_name', 'reviewer_email', 'response', 'helpfulness'];

transform('reviews', numbers, nVals, field);
