/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const NOAALatestFileParser = require('./lib/NOAALatestFileParser');
const NOAAFile = require('./lib/NOAAFile');
const FTPHelper = require('./lib/FTPHelper');
const MetarSaver = require('./lib/MetarSaver');
const ICAOExtractor = require('./lib/ICAOExtractor');

const ftpHelper = new FTPHelper();

const lsRemotePath = '/SL.us008001/DF.an/DC.sflnd/DS.metar';
const lsRemoteFileName = 'ls-lt';
const lsLocalFileName = './downloads/ls-lt.txt';
const host = 'tgftp.nws.noaa.gov';


function parseLatestFile(filename) {
  const noaaLatestFileParser = new NOAALatestFileParser(
      filename,
  );

  return noaaLatestFileParser.parse();
}

function parseLatestWeatherFile(latestWeatherFile) {
  const onComplete = function(metars) {
    const metarSaver = new MetarSaver();
    const extractor = new ICAOExtractor();

    metars.forEach(function(currentValue, index, array) {
      try {
        extractor.setMetar(currentValue);
        const ICAO = extractor.extract();

        metarSaver.setICAO(ICAO);
        metarSaver.setData(currentValue);
        metarSaver.save();
      } catch (e) {
        console.log('Skipping: ' + e);
      }
    });

    process.exit(1);
  };

  console.log(`Parsing weather file ${latestWeatherFile}`);

  const noaaFile = new NOAAFile(latestWeatherFile, onComplete);
  noaaFile.parse();
}


async function start() {
  try {
    await ftpHelper.connect(host);
    await ftpHelper.get(
        lsRemotePath,
        lsRemoteFileName,
        lsLocalFileName,
    );

    const latest = parseLatestFile(lsLocalFileName);

    const latestMetarsFile = await ftpHelper.get(
        lsRemotePath,
        latest,
        latest,
    );

    parseLatestWeatherFile(latestMetarsFile);
  } catch (e) {
    console.error(e.message);
  }
}

start();
