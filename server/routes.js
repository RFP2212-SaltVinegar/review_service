const express = require('express');
const controllers = require('./controllers');

const router = express.Router();

router.get('/', controllers.getReviews);

router.get('/meta', controllers.getMetaData);

router.post('/', controllers.addReview);

router.put('/:review_id/helpful', controllers.setHelpfulReview);

router.put('/:review_id/report', controllers.reportReview);

module.exports = router;
