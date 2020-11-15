const fs = require('fs');

module.exports = function save(icao, content) {
  const path = `data/${icao}.txt`;

  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};
