/* eslint-disable require-jsdoc */
const fs = require('fs');

function readFile(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
}

function splitDataIntoLines(data) {
  return data.toString().split('\n');
}

function extractFileNames(lines) {
  const regex = /^.*(sn+\.\d+\.txt).*$/;
  const matched = lines.find((line) => {
    const result = line.match(regex);

    return result;
  });

  if (!matched) {
    throw new Error('Unable to find latest metar file');
  }

  return matched.match(regex)[1];
}

module.exports = function parse(filename) {
  return readFile(filename)
      .then(splitDataIntoLines)
      .then(extractFileNames);
};
