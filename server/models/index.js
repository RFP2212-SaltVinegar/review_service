const db = require('../db');

module.exports = {
  sayHello: () => {
    const greet = 'hello I am model';
    return greet;
  },
};
