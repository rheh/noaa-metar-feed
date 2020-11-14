/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const NOAALatestFileParser = require('./lib/NOAALatestFileParser');
const {connect, close, get} = require('./lib/FTPHelper');
const parseLatestWeatherFile = require('./lib/parser/latestMetarFileParser');

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

async function start() {
  try {
    await connect(host);

    await get(
        lsRemotePath,
        lsRemoteFileName,
        lsLocalFileName,
    );

    const latest = parseLatestFile(lsLocalFileName);

    const latestMetarsFile = await get(
        lsRemotePath,
        latest,
        latest,
    );

    const processed = await parseLatestWeatherFile(latestMetarsFile);

    console.log(`Processed ${processed.length} metars`);

    close();
  } catch (e) {
    console.error(e.message);
  }
}

start();
