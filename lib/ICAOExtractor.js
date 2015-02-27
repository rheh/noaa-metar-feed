'use strict';

var ICAOExtractor = module.exports = function () {
    this.metar = null;
};

ICAOExtractor.prototype.setMetar = function (data) {
    this.metar = data;
};

ICAOExtractor.prototype.extract = function () {

    var re = /(?:(METAR|SPECI)\s+)?(?:COR\s+)?([A-Z]{4}).*$/m; 
    var str = this.metar;
    var matches = re.exec(str);
    var ICAO;
 
    if (matches) {
        ICAO = matches[2];
    }

    if (!ICAO) {
        throw("Cound not find ICAO in [" + str + "]");
    }

    return ICAO;
};
