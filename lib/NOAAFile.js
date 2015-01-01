'use strict';

var FS = require('fs');
var Q = require('q');

var NOAAFile = module.exports = function (filename, callback) {

    this.reset();

    this.filename = filename;
    this.callback = callback;
};

NOAAFile.prototype.reset = function () {
    this.content = null;
    this.METARs = [];
};

NOAAFile.prototype.split = function () {

    var re = /^(?!#+\d+#+\s)((?:SPECI|METAR|TAF).*\s?.*?\s?.*?=\s?)/gm; 
    var matches;
    var FIRST = 0;

    while ((matches = re.exec(this.content)) !== null) {

        if (matches.index === re.lastIndex) {
            re.lastIndex++;
        }

        this.METARs.push(matches[FIRST]);
    }
};

NOAAFile.prototype.load = function () {

    var that = this;

    Q.nfcall(FS.readFile, this.filename, "utf-8")
    .then(function (data) {
        that.content = data;
        that.split();
    })
    .fail(function (error) {
        console.error(error);
        throw error;
    })
    .done(function () {
        that.callback(that.METARs);
    });

};

NOAAFile.prototype.parse = function () {
    this.reset();
    this.load();
    this.split();
};

NOAAFile.prototype.getMETARs = function () {
    return this.METARs;
};

NOAAFile.prototype.foundMETARs = function () {
    return this.METARs.length > 0;
};
