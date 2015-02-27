var fs = require('fs');

var NOAALatestFileParser = require('./lib/NOAALatestFileParser');
var NOAAFile = require('./lib/NOAAFile');
var FTPHelper = require('./lib/FTPHelper');
var MetarSaver = require('./lib/MetarSaver');
var ICAOExtractor = require('./lib/ICAOExtractor');

var ftpHelper = new FTPHelper('tgftp.nws.noaa.gov');

var parseLatestFile = function (filename) {
    var noaaLatestFileParser = new NOAALatestFileParser(filename, getLatestWeatherFile);
    noaaLatestFileParser.parse();
};

var parseLatestWeatherFile = function (latestWeatherFile) {

    var onComplete = function (metars) {

        var metarSaver = new MetarSaver();
        var extractor = new ICAOExtractor();

        metars.forEach(function (currentValue, index, array) {
            
            try {

                extractor.setMetar(currentValue);
                var ICAO = extractor.extract();

                metarSaver.setICAO(ICAO);
                metarSaver.setData(currentValue);
                metarSaver.save();

            } catch (e) {
                console.log("Skipping: " + e);
            }

        });

        process.exit(1);
    };

    console.log("Parsing weather file", latestWeatherFile);

    var noaaFile = new NOAAFile(latestWeatherFile, onComplete);
    noaaFile.parse();
};

var getLatestWeatherFile = function (latestFile) {
    console.log("Latest weather file", latestFile);
    ftpHelper.get(lsRemotePath + latestFile, './downloads/' + latestFile, parseLatestWeatherFile);
};

var lsRemotePath = '/SL.us008001/DF.an/DC.sflnd/DS.metar/';
var lsRemoteFileName = lsRemotePath + 'ls-lt';
var lsLocalFileName = './downloads/ls-lt.txt';

try {
    ftpHelper.get(lsRemoteFileName, lsLocalFileName, parseLatestFile);
} catch (e) {
    console.error(e.message);
}
