/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
const latestFileParser = require('./lib/parser/latestFileParser');
const {connect, close, get} = require('./lib/FTPHelper');
const parseLatestWeatherFile = require('./lib/parser/latestMetarFileParser');
const fs = require('fs');

const lsRemotePath = '/SL.us008001/DF.an/DC.sflnd/DS.metar';
const lsRemoteFileName = 'ls-lt';
const lsLocalFileName = './downloads/ls-lt.txt';
const host = 'tgftp.nws.noaa.gov';

async function start() {
  const dir = './data';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

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

    const {processed, failed} = await parseLatestWeatherFile(latestMetarsFile);

    console.log(`Processed ${processed} metars. ${failed} failed to decode.`);

    close();
  } catch (e) {
    console.error('Failed to get and process latest METAR file');
    console.error(e.message);
    close();
  }
}

start();
