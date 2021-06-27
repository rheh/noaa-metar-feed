/* eslint-disable require-jsdoc */
const metarExtractor = require('../extractor/metarExtractor');
const metarFileSaver = require('../util/metarFileSaver');
const snapshotFileSplitter = require('../splitter/snapshotFileSplitter');
const parseMETAR = require('metar');

function checkAndParse(metar) {
  if (metar.body.includes('NIL')) {
    return null;
  }

  return parseMETAR(`${metar.icao} ${metar.body}`);
}

async function createMetarList(metars) {
  let failed = 0;

  const promises = metars.reduce((accumulator, observation) => {
    try {
      const metar = metarExtractor(observation);
      const decoded = checkAndParse(metar);

      accumulator.push(metarFileSaver(metar.icao, decoded));
    } catch (e) {
      console.log(`Skipping: ${observation} - ${e.message}`);
      failed++;
    }

    return accumulator;
  }, []);

  await Promise.all(promises);

  return {
    processed: promises.length,
    failed,
  };
}

module.exports = async function parseLatestWeatherFile(latestWeatherFile) {
  console.log(`Parsing weather file ${latestWeatherFile}`);

  const splitMetars = await snapshotFileSplitter(latestWeatherFile);

  return await createMetarList(splitMetars);
};
