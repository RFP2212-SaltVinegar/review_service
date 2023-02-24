const models = require('../models');

module.exports = {
  getReviews: (req, res) => {
    // console.log(req.query);
    const {
      product_id, page, count, sort,
    } = req.query;
    models.getReviewsByProduct(product_id, page, count, sort, (err, data) => {
      if (err) {
        res.status(404).send(err);
      } else {
        res.status(200).json(data);
      }
    });
  },
  getMetaData: (req, res) => {
    const productId = req.query.product_id;
    models.getMetaData(productId, (err, data) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.status(200).json(data);
      }
    });
  },
  addReview: (req, res) => {
    models.addReview(req.body, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.sendStatus(201);
      }
    });
  },
  setHelpfulReview: (req, res) => {
    models.setHelpfulReview(req.body.review_id, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.sendStatus(204);
      }
    });
  },
  reportReview: (req, res) => {
    models.reportReview(req.body.review_id, (err) => {
      if (err) {
        res.status(400).send(err);
      } else {
        res.sendStatus(204);
      }
    });
  },
};
