const metarExtractor = require('../../lib/extractor/metarExtractor');

test('handles no parameters being passed in', () => {
  expect(() => metarExtractor()).toThrow('Could not find ICAO in [undefined]');
});

test('handles null metar parameter being passed in', () => {
  expect(() => metarExtractor(null)).toThrow('Could not find ICAO in [null]');
});

test('handles empty metar parameter being passed in', () => {
  expect(() => metarExtractor('')).toThrow('Could not find ICAO in []');
});

test('handles missing ICAO from metar parameter being passed in', () => {
  const bad = 'METAR 151400Z VRB02KT 9999 FEW020 26/22 Q1011=';
  expect(() => metarExtractor(bad)).toThrow(`Could not find ICAO in [${bad}]`);
});

test('Find ICAO in valid metar', () => {
  const bad = 'METAR EGCC 151400Z VRB02KT 9999 FEW020 26/22 Q1011=';
  expect(metarExtractor(bad).icao).toBe('EGCC');
});

test('Find ICAO in NIL metar', () => {
  const bad = 'METAR CGGA NIL=';
  expect(metarExtractor(bad).icao).toBe('CGGA');
});

test('Find ICAO in valid speci metar', () => {
  const good = 'SPECI YLEC 151430Z AUTO 21027G37KT 8000 // NCD 22/10 Q1013=';
  expect(metarExtractor(good).icao).toBe('YLEC');
});

test('Find ICAO in valid metar with numerics in ICAO', () => {
  const good = 'METAR K74V 202115Z AUTO 00000KT 10SM CLR 10/M07 A3036 RMK AO2=';
  expect(metarExtractor(good).icao).toBe('K74V');
});


