/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const latestFileParser = require('./lib/parser/latestFileParser');
const {connect, close, get} = require('./lib/FTPHelper');
const parseLatestWeatherFile = require('./lib/parser/latestMetarFileParser');

const lsRemotePath = '/SL.us008001/DF.an/DC.sflnd/DS.metar';
const lsRemoteFileName = 'ls-lt';
const lsLocalFileName = './downloads/ls-lt.txt';
const host = 'tgftp.nws.noaa.gov';

async function start() {
  try {
    await connect(host);

    const filename = await get(
        lsRemotePath,
        lsRemoteFileName,
        lsLocalFileName,
    );

    const latest = await latestFileParser(filename);

    const latestMetarsFile = await get(
        lsRemotePath,
        latest,
        latest,
    );

    const processed = await parseLatestWeatherFile(latestMetarsFile);

    console.log(`Processed ${processed} metars`);

    close();
  } catch (e) {
    console.error('Failed to get and process latest METAR file');
    console.error(e.message);
    close();
  }
}

start();
