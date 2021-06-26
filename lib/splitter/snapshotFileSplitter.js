/* eslint-disable require-jsdoc */
const fs = require('fs');

function split(content) {
  const re = /^(SPECI|METAR|TAF).*?=/gsm;
  let matches;

  const metars = [];

  while ((matches = re.exec(content)) !== null) {
    if (matches.index === re.lastIndex) {
      re.lastIndex++;
    }

    metars.push(matches[0]);
  }

  return metars;
}

module.exports = function snapshotFileSplitter(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, 'utf-8', (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(split(data));
    });
  });
};
