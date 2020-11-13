const FS = require('fs');
const Q = require('q');

const NOAAFile = module.exports = function(filename, callback) {
  this.reset();

  this.filename = filename;
  this.callback = callback;
};

NOAAFile.prototype.reset = function() {
  this.content = null;
  this.METARs = [];
};

NOAAFile.prototype.split = function() {
  const re = /^(?!#+\d+#+\s)((?:SPECI|METAR|TAF).*\s?.*?\s?.*?=\s?)/gm;
  let matches;
  const FIRST = 0;

  while ((matches = re.exec(this.content)) !== null) {
    if (matches.index === re.lastIndex) {
      re.lastIndex++;
    }

    this.METARs.push(matches[FIRST]);
  }
};

NOAAFile.prototype.load = function() {
  const that = this;

  Q.nfcall(FS.readFile, this.filename, 'utf-8')
      .then(function(data) {
        that.content = data;
        that.split();
      })
      .fail(function(error) {
        console.error(error);
        throw error;
      })
      .done(function() {
        that.callback(that.METARs);
      });
};

NOAAFile.prototype.parse = function() {
  this.reset();
  this.load();
  this.split();
};

NOAAFile.prototype.getMETARs = function() {
  return this.METARs;
};

NOAAFile.prototype.foundMETARs = function() {
  return this.METARs.length > 0;
};
