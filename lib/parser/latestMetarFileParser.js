/* eslint-disable require-jsdoc */
const metarSaver = require('../util/metarFileSaver');
const metarExtractor = require('../extractor/metarExtractor');
const metarFileSaver = require('../util/metarFileSaver');
const snapshotFileSplitter = require('../splitter/snapshotFileSplitter');

async function createMetarList(metars) {
  const promises = metars.reduce((accumulator, metar) => {
    try {
      const icao = metarExtractor(metar);

      accumulator.push(metarFileSaver(icao, metar));
    } catch (e) {
      console.log('Skipping: ' + e);
    }

    return accumulator;
  }, []);

  await Promise.all(promises);

  return promises.length;
}

module.exports = async function parseLatestWeatherFile(latestWeatherFile) {
  console.log(`Parsing weather file ${latestWeatherFile}`);

  const splitMetars = await snapshotFileSplitter(latestWeatherFile);

  return await createMetarList(splitMetars);
};
