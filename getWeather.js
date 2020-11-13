const NOAALatestFileParser = require('./lib/NOAALatestFileParser');
const NOAAFile = require('./lib/NOAAFile');
const FTPHelper = require('./lib/FTPHelper');
const MetarSaver = require('./lib/MetarSaver');
const ICAOExtractor = require('./lib/ICAOExtractor');

const ftpHelper = new FTPHelper('tgftp.nws.noaa.gov');

const parseLatestFile = function(filename) {
  const noaaLatestFileParser = new NOAALatestFileParser(
      filename,
      getLatestWeatherFile,
  );

  noaaLatestFileParser.parse();
};

const parseLatestWeatherFile = function(latestWeatherFile) {
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

  console.log('Parsing weather file', latestWeatherFile);

  const noaaFile = new NOAAFile(latestWeatherFile, onComplete);
  noaaFile.parse();
};

var getLatestWeatherFile = function(latestFile) {
  console.log('Latest weather file', latestFile);
  ftpHelper.get(lsRemotePath + latestFile, './downloads/' + latestFile, parseLatestWeatherFile);
};

var lsRemotePath = '/SL.us008001/DF.an/DC.sflnd/DS.metar/';
const lsRemoteFileName = lsRemotePath + 'ls-lt';
const lsLocalFileName = './downloads/ls-lt.txt';

try {
  ftpHelper.get(lsRemoteFileName, lsLocalFileName, parseLatestFile);
} catch (e) {
  console.error(e.message);
}
