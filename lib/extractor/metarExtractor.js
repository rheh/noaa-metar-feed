module.exports = function extract(metar) {
  const re = /(?:(METAR|SPECI)\s+)(?:COR\s+)?([A-Z][A-Z, 0-9]{3}) (\bNIL\b|[0-9]{6}Z).*$/m;
  const matches = re.exec(metar);
  const icao = matches ? matches[2] : null;

  if (!icao) {
    throw new Error(`Could not find ICAO in [${metar}]`);
  }

  return icao;
};
