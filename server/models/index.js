const Promise = require('bluebird');
const db = require('../db');

module.exports = {
  getReviewsByProduct: (productId, page, count, sort, cb) => {
    db.query(`SELECT * FROM reviews WHERE product_id = ${productId};`)
      .then((res) => {
        const result = res.rows.map((review) => db.query(`SELECT id, url FROM photos WHERE review_id = ${review.id}`)
          .then((photos) => ({ ...review, photos: photos.rows })));
        Promise.all(result).then((value) => cb(null, value));
      });
  },
  getMetaData: (productId, cb) => {
    // cb(null);
    const result = {
      product_id: productId,
      ratings: {},
      recommended: { false: 0, true: 0 },
      characteristics: {},
    };
    const characteristics = {};
    db.query(`SELECT id,rating,recommend FROM reviews WHERE product_id = ${productId}`)
      .then((data) => {
        // console.log(data.rows);
        data.rows.forEach((row) => {
          if (result.ratings[row.rating] === undefined) {
            result.ratings[row.rating] = 1;
          } else {
            result.ratings[row.rating] += 1;
          }
          result.recommended[row.recommend] += 1;
        });
        const mapped = data.rows.map((row) => db.query(`SELECT characteristics_id, value FROM characteristics_reviews WHERE review_id = ${row.id}`));
        Promise.all(mapped).then((res) => {
          res.forEach((review) => {
            review.rows.forEach((row) => {
              if (characteristics[row.characteristics_id] === undefined) {
                characteristics[row.characteristics_id] = row.value;
              } else {
                characteristics[row.characteristics_id] += row.value;
              }
            });
          });
          const keys = Object.keys(characteristics);
          const map = keys.map((key) => db.query(`SELECT name FROM characteristics WHERE id = ${key}`)
            .then((name) => {
              const value = characteristics[key] / res.length;
              result.characteristics[name.rows[0].name] = { id: key, value };
            }));
          Promise.all(map).then(() => cb(null, result));
        });
      });
  },
  addReview: async (data, cb) => {
    const {
      product_id, rating, summary, body, recommend, name, email, photos, characteristics,
    } = data;
    const text1 = 'INSERT INTO reviews (product_id, rating, date, summary, body, recommend, name, email) VALUES($1,$2,$3,$4,$5,$6,$7,$8)';
    const values1 = [product_id, rating, '10000', summary, body, recommend, name, email];
    await db.query(text1, values1);
    const text2 = 'SELECT id FROM reviews WHERE product_id = $1 AND summary = $2';
    const values2 = [product_id, summary];
    db.query(text2, values2)
      .then((review) => {
        photos.forEach(async (photo) => {
          const text3 = 'INSERT INTO photos (review_id, url) VALUES($1,$2)';
          const values3 = [review.rows[0].id, photo];
          await db.query(text3, values3);
        });
        Object.keys(characteristics).forEach(async (characteristic) => {
          const text4 = 'INSERT INTO characteristics_reviews (characteristics_id, review_id, value) VALUES ($1,$2,$3)';
          const values4 = [characteristic, review.rows[0].id, characteristics[characteristic]];
          await db.query(text4, values4);
        });
        cb(null);
      });
  },
  setHelpfulReview: (reviewId, cb) => {
    db.query(`SELECT helpfulness FROM reviews WHERE id =${reviewId}`)
      .then((help) => {
        db.query(`UPDATE reviews SET helpfulness = ${help.rows[0].helpfulness + 1} WHERE id =${reviewId}`)
          .then(() => { cb(null); });
      });
  },
  reportReview: (reviewId, cb) => {
    db.query(`SELECT reported FROM reviews WHERE id =${reviewId}`)
      .then((report) => {
        db.query(`UPDATE reviews SET reported = ${!report.rows[0].reported} WHERE id = ${reviewId}`)
          .then(cb(null));
      });
  },
};
