const fs = require('fs');

module.exports = function save(icao, observation, content) {
  const path = `data/${icao}.json`;

  return new Promise((resolve, reject) => {
    const jsonOutput= JSON.stringify({
      ...content,
      observation,
    }, null, 2);

    fs.writeFile(path, jsonOutput, (err, data) => {
      if (err) {
        return reject(err);
      }

      resolve(data);
    });
  });
};
