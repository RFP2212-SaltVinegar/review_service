const CSVToJSON = require('csvtojson');
const JSONToCSV = require('json2csv').parse;
const fs = require('fs');
const path = require('path');

const transform = (data, numbers, nVals) => {
  data.forEach((row, ind) => {
    Object.keys(row).forEach((key) => {
      if (nVals.has(key)) {
        if (data[ind][key] === 'null') {
          data[ind][key] = null;
        } else {
          data[ind][key] = data[ind][key].trim();
        }
      } else if (numbers.has(key)) {
        data[ind][key] = parseInt(data[ind][key]);
      } else {
        data[ind][key] = data[ind][key].trim();
      }
    });
  });
  return data;
};

module.exports = (csvName, numbers, nVals, field) => {
  CSVToJSON().fromFile(path.join(__dirname, `./csv/${csvName}.csv`)).then((source) => {
    const transformed = transform(source, numbers, nVals);
    const csv = JSONToCSV(transformed, {
      field,
    });
    fs.writeFileSync(path.join(__dirname, `./clean/clean${csvName}.csv`), csv);
  });
};
