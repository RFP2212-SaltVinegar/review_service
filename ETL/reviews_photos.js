const transform = require('./transform');

const numbers = new Set(['id', 'review_id']);
const nVals = new Set();
const field = ['id', 'review_id', 'url'];

transform('reviews_photos', numbers, nVals, field);
