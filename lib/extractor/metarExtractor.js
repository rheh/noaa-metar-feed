module.exports = function extract(metar) {
  const re = /(?:(METAR|SPECI)\s+)?(?:COR\s+)?([A-Z]{4}).*$/m;
  const matches = re.exec(metar);
  const icao = matches ? matches[2] : null;

  if (!icao) {
    throw new Error(`Could not find ICAO in [${str}]`);
  }

  return icao;
};
