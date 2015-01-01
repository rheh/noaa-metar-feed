var fs = require('fs');

var NOAALatestFileParser = require('./lib/NOAALatestFileParser');
var NOAAFile = require('./lib/NOAAFile');
var FTPHelper = require('./lib/FTPHelper');
var ftpHelper = new FTPHelper('tgftp.nws.noaa.gov');

var parseLatestFile = function (filename) {
    var noaaLatestFileParser = new NOAALatestFileParser(filename, getLatestWeatherFile);
    noaaLatestFileParser.parse();
};

var parseLatestWeatherFile = function (latestWeatherFile) {
    var onComplete = function (metars) {
        console.log(metars);

        process.exit(1);
    };

    console.log("Parsing weather file", latestWeatherFile);

    var noaaFile = new NOAAFile(latestWeatherFile, onComplete);
    noaaFile.parse();
};

var getLatestWeatherFile = function (latestFile) {
    console.log("Latest weather file", latestFile);
    ftpHelper.get(lsRemotePath + latestFile, latestFile, parseLatestWeatherFile);
};

var lsRemotePath = '/SL.us008001/DF.an/DC.sflnd/DS.metar/';
var lsRemoteFileName = lsRemotePath + 'ls-lt';
var lsLocalFileName = 'ls-lt.txt';

try {
    ftpHelper.get(lsRemoteFileName, lsLocalFileName, parseLatestFile);
} catch (e) {
    console.error(e.message);
}
