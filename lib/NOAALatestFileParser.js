const FS = require('fs');

const NOAALatestFileParser = module.exports = function(filename) {
  this.filename = filename;
};

NOAALatestFileParser.prototype.parse = function() {
  const array = FS.readFileSync(this.filename).toString().split('\n');
  let result;
  let latestFile;
  let i;
  const regex = /^.*(sn+\.\d+\.txt).*$/;
  let string;

  for (i in array) {
    string = array[i];
    result = string.match(regex);

    if (result) {
      latestFile = result[1];
      break;
    }
  }

  return latestFile;
};
