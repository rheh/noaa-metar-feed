const ICAOExtractor = module.exports = function() {
  this.metar = null;
};

ICAOExtractor.prototype.setMetar = function(data) {
  this.metar = data;
};

ICAOExtractor.prototype.extract = function() {
  const re = /(?:(METAR|SPECI)\s+)?(?:COR\s+)?([A-Z]{4}).*$/m;
  const str = this.metar;
  const matches = re.exec(str);
  let ICAO;

  if (matches) {
    ICAO = matches[2];
  }

  if (!ICAO) {
    throw new Error(`Could not find ICAO in [${str}]`);
  }

  return ICAO;
};
