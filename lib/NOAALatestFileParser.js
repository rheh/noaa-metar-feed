'use strict';

var FS = require('fs');

var NOAALatestFileParser = module.exports = function (filename, callback) {
    this.filename = filename;
    this.callback = callback;
};

NOAALatestFileParser.prototype.parse = function () {

    var array = FS.readFileSync(this.filename).toString().split("\n");
    var result;
    var latestFile;
    var i;
    var regex = /^.*(sn+\.\d+\.txt).*$/;
    var string;

    for (i in array) { 

        string = array[i];
        result = string.match(regex);

        if (result) {
            latestFile = result[1];
            break;
        }
    }

    this.callback(latestFile);
};
