const db = require('../db');

module.exports = {
  getReviewsByProduct: (productId, page, count, sort, cb) => {
    cb(null, 'here are your reviews');
    // query database with given input
    //  if err callback with error
    //  if no error callback without error
  },
  getMetaData: (productId, cb) => {
    cb(null, `here is your metadata for ${productId}`);
  },
  addReview: (data, cb) => {
    cb(null);
  },
  setHelpfulReview: (productId, cb) => {
    cb(null);
  },
  reportReview: (productId, cb) => {
    cb(null);
  },
};
