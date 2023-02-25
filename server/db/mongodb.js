const mongoose = require("mongoose");

mongoose.connect('mongodb://127.0.0.1:27017/reviews');

const reviewsSchema = new mongoose.Schema({
  id: Number,
  product_id: Number,
  rating: Number,
  summary: String,
  recommend: Boolean,
  body: String,
  name: String,
  email: String,
  photos: {
    id: Number,
    url: String,
  },
  characteristics: {
    id: Number,
    product_id: Number,
    characteristics_reviews: {
      id: Number,
      rating: Number,
    },
  },
});
