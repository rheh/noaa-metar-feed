/* eslint-disable require-jsdoc */
const MetarSaver = require('../MetarSaver');
const ICAOExtractor = require('../ICAOExtractor');
const snapshotFileSplitter = require('../spliter/snapshotFileSplitter');

async function createMetarList(metars) {
  const metarSaver = new MetarSaver();
  const extractor = new ICAOExtractor();
  const processed = [];

  metars.forEach(function(currentValue, index, array) {
    try {
      extractor.setMetar(currentValue);
      const ICAO = extractor.extract();

      metarSaver.setICAO(ICAO);
      metarSaver.setData(currentValue);
      metarSaver.save();

      processed.push(ICAO);
    } catch (e) {
      console.log('Skipping: ' + e);
    }
  });

  return processed;
}

module.exports = async function parseLatestWeatherFile(latestWeatherFile) {
  console.log(`Parsing weather file ${latestWeatherFile}`);

  const splitMetars = await snapshotFileSplitter(latestWeatherFile);

  return await createMetarList(splitMetars);
};
