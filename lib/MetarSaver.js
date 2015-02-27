'use strict';

var fs = require('fs');
var bind = require('bind-this');

var MetarSaver = module.exports = function () {
    this.ICAO = null;
    this.data = null;
    this.relativePath = null;
};

MetarSaver.prototype.setICAO = function (ICAO) {
    this.ICAO = ICAO;
    this.path = "data/" + this.ICAO + ".txt";
};

MetarSaver.prototype.setData = function (data) {
    this.data = data;
};

MetarSaver.prototype.save = function () {
    fs.writeFileSync(this.path, this.data);
};
